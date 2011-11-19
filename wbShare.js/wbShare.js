$(function() {
	//定数///////////////////
	//前処理・後処理のタイプとドローモードの対応付け．
	//modeにしたがって，前後処理のタイプを分ける
	var baseProcType = {
		line: 'shape',	//図形 描画終了と共に一回だけデータを送る
		rect: 'shape',
		circle: 'shape',
		free: 'free',	//フリーハンド 描画時は常に座標データを送る
		text: 'text',	//文字列 描画終了と共に一回だけデータを送る
		img: 'img',	//画像 描画終了と共に一回だけデータを送る
		sel: 'sel'	//図形を選択して操作する
	};

	$.fn.extend({
		/**
		 * wbShareをCanvas要素に対して適用する
		 */
		wbShare: function(userId) {
			this.filter('canvas').each(function() {
				//wbShareの１インスタンスを通しての状態変数/////////////////////
				var uid = userId;
				var canvas = $(this);

				var stage = new Stage(canvas[0]);
				var shapes = []; //shapeを作成した順に格納しておく物　uidゴトに分けて図形オブジェクトへの参照を持っておく
				shapes[uid] = [];

				var shape; //今現在描画しているオブジェクト
				var receivedShapes = [];	//他者から今まさに受信しているオブジェクト．他者のuid属性で名前空間を切ってそこに値を入れる


				var stPoint = { //今描いている図形の始点
					x: 0,
					y: 0
				};

				var beforeCoor = {	//mousedown/mouseup, touchstart/touchendの間において直前に取得した座標
					x: 0,
					y: 0
				};

				//ワーク用のIMG要素作成
				//TODO bodyに追加する必要がないので，new Imageで生成して参照をJavaScriptで保持するようにする
				var workImgId = '__wbShareWork__' + (new Date().getTime());
				setTimeout(function() {
					$('body').append(
						$('<img id="' + workImgId + '"/>')
							.css('visibility', 'hidden')
							.css('width', 0)
							.css('height', 0));
				}, 0);

				//状態変数の定義
				var status = {
					stage: stage,
					shapes: shapes,
					receivedShapes: receivedShapes,
					text: '',
					img: undefined,
					workImgId: workImgId,
					color: '#000000',
					mode: 'free',
					lineWidth: 2,
					font: '22px Arial',
					sendFunc: function() {
					}
				};

				canvas.data('wbShareStatus', status);

				//TODO: 塗り潰しは未実装

				//Util ipad - PCのイベント差吸収系/////////////
				//TODO iPadは検証環境がないので検証していない・・注意（高野）

				//キャンバスの場所をキャッシュする（高速化のため．ただしCanvasの場所をあとから変えたいときはこの値を更新する必要がある）

				var offset = canvas.offset();
				//border-widthが太く設定されていると，それによってCanvasの描画する部分がずれてしまうので，その分を足す．
				offset.left += parseInt(canvas.css('borderLeftWidth'));
				offset.top += parseInt(canvas.css('borderTopWidth'));

				//クリックされた座標を取得する関数．高速化のためtouchイベントの有無は最初の一回のみ
				//判断し，その際にgetCanvasCoor自身を，touchイベントの有無判断の無い形に書き換える．
				var getCanvasCoor = function(e) {
					//jQuery's event object unsupports touche events, so we use the object of "window.event"
					if (event.touches) {//タッチ系のイベントが存在する場合
						var func = function(e) {
							var touches = event.touches[0];
							if (touches) {
								var coor = {
									x: touches.pageX - offset.left,
									y: touches.pageY - offset.top
								};
								beforeCoor = coor;	//直前に返した座標を覚えておく．以下のelse文以降のため
								return coor;
							} else {
								//タッチ系のイベントだが，値が取れないとき（touchendなど）は直前に返した値を返す
								return beforeCoor;
							}
						};
						getCanvasCoor = func;
						return func(e);
					}
					else { //iPad以外の場合
						var func = function(e) {
							return {
								x: e.pageX - offset.left,
								y: e.pageY - offset.top
							};
						};
						getCanvasCoor = func;
						return func(e);
					}
				};

				//コントローラ/////////////
				//描画イベント//

				//書き始めるイベント
				var drawStartEvent = function(e) {
					e.preventDefault();

					var status = canvas.data('wbShareStatus');

					//前処理
					var coor = getCanvasCoor(e);
					var graphics = beforeDrawStartProc(e, coor);

					//コマンド実行
					drawStartCommands[status.mode](graphics, coor);

					//後処理
					afterDrawStartProc(e, coor);
				};
				canvas.bind('touchstart', drawStartEvent);
				canvas.bind('mousedown', drawStartEvent);

				//書いている際のイベント
				var drawingEvent = function(e) {
					e.preventDefault();
					if (shape) {
						var status = canvas.data('wbShareStatus');
						//前処理
						var coor = getCanvasCoor(e);
						var graphics = beforeDrawingProc(e, coor);

						//コマンド実行
						drawingCommands[status.mode](graphics, coor);

						//後処理
						afterDrawingProc(e, coor);
					}
				};
				canvas.bind('touchmove', drawingEvent);
				canvas.bind('mousemove', drawingEvent);

				//書き終わった際のイベント
				var drawFinEvent = function(e) {
					e.preventDefault();
					if (shape) {
						var status = canvas.data('wbShareStatus');
						//前処理
						var coor = getCanvasCoor(e);
						var graphics = beforeDrawFinProc(e, coor);

						//コマンド実行
						drawFinCommands[status.mode](graphics, coor);

						//後処理
						afterDrawFinProc(e, coor);
					}
				};
				canvas.bind('touchend', drawFinEvent);
				canvas.bind('mouseup', drawFinEvent);

				//マウス／タッチイベントの前処理・後処理////////////////////////
				var beforeDrawStartProc = function(e, coor) {
					shape = new Shape();
					stage.addChild(shape);
					var status = canvas.data('wbShareStatus');

					if (baseProcType[status.mode] === 'text') {
						return new Text(status.text, status.font, status.color);
					} else if (baseProcType[status.mode] === 'img') {
						return new Bitmap(status.img);
					} else {
						if (baseProcType[status.mode] === 'free') {
							canvas.wbShareSendCommand({
								uid: uid,
								command: 'draw',
								options: {
									mode: status.mode,
									color: status.color,
									lineWidth: status.lineWidth,
									strokeState: 'start',
									points: [coor]
								}
							});
						}

						var graphics = shape.graphics;

						graphics.setStrokeStyle(status.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
							.beginStroke(status.color);//書き込み1単位 開始
						return graphics;
					}
				}

				var afterDrawStartProc = function(e, coor) {
					//始点を保存
					stPoint = coor;
				}

				var beforeDrawingProc = function(e, coor) {
					var status = canvas.data('wbShareStatus');
					if (baseProcType[status.mode] === 'free') {//フリーハンドの場合
						//サーバに描画データを送信する
						canvas.wbShareSendCommand({
							uid: uid,
							command: 'draw',
							options: {
								mode: status.mode,
								color: status.color,
								lineWidth: status.lineWidth,
								strokeState: 'drawing',
								points: [coor]
							}
						});
					} else if (baseProcType[status.mode] === 'shape') {
						//図形の描画は今まさに描こうとしている状態を見えるようにしたいのでマウスが動くたびに削除して書きなおす
						var graphics = shape.graphics;
						graphics.endStroke();
						stage.removeChild(shape);
						shape = new Shape();
						stage.addChild(shape);

						shape.graphics.setStrokeStyle(status.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
							.beginStroke(status.color);//書き込み1単位 開始
						//graphics.beginFill(color);
					}

					return shape.graphics;
				}

				var afterDrawingProc = function(e, coor) {
					stage.update();
				}

				var beforeDrawFinProc = function(e, coor) {
					var status = canvas.data('wbShareStatus');
					if (baseProcType[status.mode] === 'shape') {
						//図形の描画は今まさに描こうとしている状態を見えるようにしたいのでマウスが動くたびに削除して書きなおす
						var graphics = shape.graphics;
						graphics.endStroke();
						stage.removeChild(shape);
						shape = new Shape();
						stage.addChild(shape);

						shape.graphics.setStrokeStyle(status.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
							.beginStroke(status.color);//書き込み1単位 開始
						//graphics.beginFill(color);
					}
					//TODO: 回転とかするときはここでクリックイベントを定義する？
					//		var selfShape = shape;
					//		shape.onClick = function(e){
					//			selfShape.skewX = 45;
					//			selfShape.skewY = 45;
					//        	stage.update();
					//		};
					return shape.graphics;
				}

				var afterDrawFinProc = function(e, coor) {
					//描画系後処理
					stage.update();

					//自分の書いた図形を保存しておく
					shapes[uid].push(shape);

					var status = canvas.data('wbShareStatus');
					status.shapes = shapes;
					canvas.data('wbShareStatus', status);

					if (baseProcType[status.mode] === 'shape' || baseProcType[status.mode] === 'free') {
						//文字列処理以外はここでストロークを終わらせる
						shape.graphics.endStroke();

						//サーバに描画データを送信する
						canvas.wbShareSendCommand({
							uid: uid,
							command: 'draw',
							options: {
								mode: status.mode,
								color: status.color,
								lineWidth: status.lineWidth,
								strokeState: 'fin',
								points: [coor]
							}
						});
					}
					else if (baseProcType[status.mode] === 'text') {
						//サーバに描画データを送信する
						canvas.wbShareSendCommand({
							uid: uid,
							command: 'draw',
							options: {
								mode: status.mode,
								color: status.color,
								font: status.font,
								strokeState: 'fin',
								points: [coor]
							}
						});
					}
					else if (baseProcType[status.mode] === 'img') {
						//サーバに描画データを送信する
						canvas.wbShareSendCommand({
							uid: uid,
							command: 'draw',
							options: {
								mode: status.mode,
								url: $(status.img).attr('src'),
								strokeState: 'fin',
								points: [coor]
							}
						});
					}
					shape = undefined;
				}

				//ロジック///////////////////////////////
				var drawStartCommands = {
					line: function(graphics, coor) {
						graphics.moveTo(coor.x, coor.y);
					},
					free: function(graphics, coor) {
						graphics.moveTo(coor.x, coor.y);
					},
					rect: function(graphics, coor) {
					},
					circle:  function(graphics, coor) {
					},
					text:  function(text, coor) {
						text.x = coor.x;
						text.y = coor.y;
						stage.addChild(text);
						shape = text;
						stage.update();
					},
					img: function(bitmap, coor) {
						bitmap.x = coor.x;
						bitmap.y = coor.y;
						stage.addChild(bitmap);
						shape = bitmap;
						stage.update();
					}
				};

				var drawingCommands = {
					line: function(graphics, coor) {
						graphics.moveTo(stPoint.x, stPoint.y).lineTo(coor.x, coor.y);
					},
					free: function(graphics, coor) {
						graphics.lineTo(coor.x, coor.y);
					},
					rect: function(graphics, coor) {
						graphics.rect(stPoint.x, stPoint.y, coor.x - stPoint.x, coor.y - stPoint.y);
					},
					circle:  function(graphics, coor) {
						var r = Math.sqrt((coor.x - stPoint.x) * (coor.x - stPoint.x) + (coor.y - stPoint.y) * (coor.y - stPoint.y));
						graphics.drawCircle(stPoint.x, stPoint.y, r);
					},
					text:  function(graphics, coor) {
						shape.x = coor.x;
						shape.y = coor.y;
						stage.update();
					},
					img: function(graphics, coor) {
						shape.x = coor.x;
						shape.y = coor.y;
						stage.update();
					}
				};

				var drawFinCommands = {
					line: function(graphics, coor) {
						graphics.moveTo(stPoint.x, stPoint.y).lineTo(coor.x, coor.y);
					},
					free: function(graphics, coor) {
						//TODO: これだと，始点と終点が同じならば，筆を動かしていても点と判断してしまうので，要対応
						if (coor.x === stPoint.x && coor.y === stPoint.y) {
							//全く動いてないときは線でなくて小さい四角を書く
							graphics.rect(coor.x, coor.y, 1, 1);
						}
						graphics.lineTo(coor.x, coor.y);
					},
					rect: function(graphics, coor) {
						graphics.rect(stPoint.x, stPoint.y, coor.x - stPoint.x, coor.y - stPoint.y);
					},
					circle:  function(graphics, coor) {
						var r = Math.sqrt((coor.x - stPoint.x) * (coor.x - stPoint.x) + (coor.y - stPoint.y) * (coor.y - stPoint.y));
						graphics.drawCircle(stPoint.x, stPoint.y, r);
					},
					text:  function(graphics, coor) {
						shape.x = coor.x;
						shape.y = coor.y;
						stage.update();
					},
					img:  function(graphics, coor) {
						shape.x = coor.x;
						shape.y = coor.y;
						stage.update();
					}
				};
			});

			return this;
		},
		/**
		 * Canvasへのテキスト入力のための文字列を設定する．
		 * @param txt 入力するテキスト
		 */
		wbShareSetText: function(txt) {
			var canvas = this;
			var status = canvas.data('wbShareStatus');
			status.text = txt;
			canvas.data('wbShareStatus', status);
			return canvas;
		},
		/**
		 * Canvasへ貼り付ける画像を設定する．
		 * @param url 画像のURL
		 */
		wbShareSetImg: function(url) {
			var canvas = this;
			//TODO: factorがIMG, canvas, videoであることを確認する
			var status = canvas.data('wbShareStatus');
			var workImgId = status.workImgId;

			status.img = $('#' + workImgId).attr('src', url)[0];
			canvas.data('wbShareStatus', status);
			return canvas;
		},
		wbShareSetColor: function(clr) {
			var canvas = this;
			var status = canvas.data('wbShareStatus');
			status.color = clr;
			canvas.data('wbShareStatus', status);
			return canvas;
		},
		wbShareSetMode: function(md) {
			var canvas = this;
			var status = canvas.data('wbShareStatus');
			status.mode = md;
			canvas.data('wbShareStatus', status);
			return canvas;
		},
		wbShareSetLineWidth: function(width) {
			var canvas = this;
			var status = canvas.data('wbShareStatus');
			status.lineWidth = width;
			canvas.data('wbShareStatus', status);
			return canvas;
		},
		wbShareSetFont: function(fnt) {
			var canvas = this;
			var status = canvas.data('wbShareStatus');
			status.font = fnt;
			canvas.data('wbShareStatus', status);
			return canvas;
		},
		wbShareSetSendFunction: function(func) {
			var canvas = this;
			var status = canvas.data('wbShareStatus');
			status.sendFunc = func;
			canvas.data('wbShareStatus', status);
			return canvas;
		},
		wbShareSendCommand: function(command, options) {
			var canvas = this;
			//ユーザが設定した関数呼び出し．
			//ここにはデータ送信用の関数を設定していただく
			var status = canvas.data('wbShareStatus');
			status.sendFunc(command, options);
			return canvas;
		},
		wbShareClear: function(uid) {
			var canvas = this;
			//受信しだデータを処理する関数を利用する
			canvas.wbShareDrawShape(uid, 'clear', {});
			canvas.wbShareSendCommand('clear', {});
			return canvas;
		},
		/**
		 * 図形情報データの受信関数
		 * データを受信して図形を描画する
		 */
		wbShareDrawShape: function(uid, command, options) {
			var canvas = this;

			var status = canvas.data('wbShareStatus');
			var stage = status.stage;
			var shapes = status.shapes;

			if (command === 'draw') {
				var receivedShape;
				if (baseProcType[options.mode] === 'shape') {

					receivedShape = new Shape();
					stage.addChild(receivedShape);

					var receivedGraphics = receivedShape.graphics;

					receivedGraphics.setStrokeStyle(options.lineWidth)//描画スタイル（線の幅）の設定
						.beginStroke(options.color);//書き込み1単位 開始
					canvas.wbShareDrawOneStroke[options.mode](receivedGraphics, options);

					stage.update();
					receivedGraphics.endStroke();
				} else if (baseProcType[options.mode] === 'free') {
					receivedShape = status.receivedShapes[options.uid];

					if (options.strokeState === 'start') {
						receivedShape = new Shape(); //受信中オブジェクトに保存
						status.receivedShapes[options.uid] = receivedShape;
						stage.addChild(receivedShape);
					}

					var receivedGraphics = receivedShape.graphics;

					//以下の処理はstartの時以外に実施すると2回目以降なにも表示されなくなってしまう
					if (options.strokeState === 'start') {
						receivedGraphics.setStrokeStyle(options.lineWidth)//描画スタイル（線の幅）の設定
							.beginStroke(options.color);//書き込み1単位 開始
					}

					canvas.wbShareDrawOneStroke[options.mode](receivedGraphics, options);

					stage.update();

					if (options.strokeState === 'fin') {
						receivedGraphics.endStroke();
						status.receivedShapes[uid] = undefined;
					}
				} else if (baseProcType[options.mode] === 'text') {
					var receivedShape = new Text(options.text, options.font, options.color);
					receivedShape.x = options.points[0].x;
					receivedShape.y = options.points[0].y;
					stage.addChild(receivedShape);
					stage.update();
				}

				//uidゴトに分けて図形オブジェクトへの参照を持っておく

				if (!shapes[uid]) {
					shapes[uid] = [];
				}
				shapes[uid].push(receivedShape);

			} else if (command === 'clear') {
				var clearShapes = shapes;
				if(uid) {
					clearShapes = [];
					clearShapes.push(shapes[uid]);
				}
				$.each(clearShapes, function(i, eachUidShapes) {

					if (eachUidShapes) {
						for (var i in eachUidShapes) {
							stage.removeChild(eachUidShapes[i]);
						}
						shapes[uid] = [];	//画面から削除したので参照もクリアする
						stage.update();
					}
				});

			}
			canvas.data('wbShareStatus', status);
			return canvas;
		},
		wbShareDrawOneStroke: {
			//フリーハンドの描画
			free: function(graphics, options) {
				var pts = options.points;
				//TODO: これだと全く筆を動かさなかった「点」に対応出来ていないので，要対応
				if (options.strokeState === 'start') {
					graphics.moveTo(pts[0].x, pts[0].y);
				}
				else {
					graphics.lineTo(pts[0].x, pts[0].y);
				}
			},
			//直線の描画
			line: function(graphics, options) {
				var pts = options.points;
				graphics.moveTo(pts[0].x, pts[0].y).lineTo(pts[1].x, pts[1].y);
			},
			//四角形の描画
			rect: function(graphics, options) {
				var pts = options.points;
				graphics.rect(pts[0].x, pts[0].y, pts[1].x - pts[0].x, pts[1].y - pts[0].y);
			},
			//円形の描画
			circle: function(graphics, options) {
				var pts = options.points;
				var r = Math.sqrt((pts[0].x - pts[1].x) * (pts[0].x - pts[1].x) + (pts[0].y - pts[1].y) * (pts[0].y - pts[1].y));
				graphics.drawCircle(pts[0].x, pts[0].y, r);
			}
		},
//		wbShareSendClear: function() {
//			//TODO
//			var canvas= this;
//			send({
//				uid: uid,
//				command: 'clear',
//				options: undefined
//			});
//			return canvas;
//		},
		wbShareGetStageObj: function() {
			return this.data('wbShareStatus').stage;
		}
	});
});
