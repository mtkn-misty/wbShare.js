$(function() {

	//共通的な関数//////////////
	var initializeBase = function(derive, base, baseArg) {
		base.apply(derive, baseArgs);
		for (var prop in base.prototype) {
			var proto = derive.constructor.prototype;
			if (!proto[prop]) {
				proto[prop] = base.prototype[prop];
			}
		}
	}

	//定数///////////////////
	//前処理・後処理のタイプとドローモードの対応付け．
	//modeにしたがって，前後処理のタイプを分ける
	var baseProcType = {
		line: 'shape',	//図形 描画終了と共に一回だけデータを送る
		rect: 'shape',
		circle: 'shape',
		free: 'free',	//フリーハンド 描画時は常に座標データを送る
		text: 'text',	//文字列 描画終了と共に一回だけデータを送る
		img: 'img'	//画像 描画終了と共に一回だけデータを送る
	};

	//ロジック///////////////////////////////

	//抽象クラス
	var Logic = function(stg) {
		var target = {};	//描画・操作対象のオブジェクト
		var targets = [];

		var stPoint = {};	//描画の始点
		var stage = stg;	//EaselJSのstage

		var color = null;
		var text = null;
		var lineWidth = null;
		var font = null;
		var img = null;

		return this;
	};
	Logic.prototype = {
		start: function(mode, shape, coor) {
		},
		move: function(mode, shape, coor) {
		},
		finish: function(mode, shape, coor) {
		}
	};

	var DrawLogic = function(stage) {
		//継承する
		initializeBase(this, Logic, [stage]);

		var drawStartCommands = {
			line: function(shape, coor) {
				shape.graphics.moveTo(coor.x, coor.y);
			},
			free: function(shape, coor) {
				shape.graphics.moveTo(coor.x, coor.y);
			},
			rect: function(shape, coor) {
			},
			circle:  function(shape, coor) {
			},
			text:  function(text, coor) {
				text.x = coor.x;
				text.y = coor.y;
			},
			img: function(bitmap, coor) {
				bitmap.x = coor.x;
				bitmap.y = coor.y;
			}
		};

		var drawingCommands = {
			line: function(shape, coor) {
				shape.graphics.moveTo(coor.x, coor.y);
			},
			free: function(shape, coor) {
				shape.graphics.moveTo(coor.x, coor.y);
			},
			rect: function(shape, coor) {
			},
			circle:  function(shape, coor) {
			},
			text:  function(text, coor) {
				text.x = coor.x;
				text.y = coor.y;
				this.stage.addChild(text);
			},
			img: function(bitmap, coor) {
				bitmap.x = coor.x;
				bitmap.y = coor.y;
				this.stage.addChild(bitmap);
			}
		};

		var drawFinCommands = {
			line: function(shape, coor) {
				shape.graphics.moveTo(stPoint.x, stPoint.y).lineTo(coor.x, coor.y);
			},
			free: function(shape, coor) {
				//TODO: これだと，始点と終点が同じならば，筆を動かしていても点と判断してしまうので，要対応
				if (coor.x === stPoint.x && coor.y === stPoint.y) {
					//全く動いてないときは線でなくて小さい四角を書く
					shape.graphics.rect(coor.x, coor.y, 1, 1);
				}
				shape.graphics.lineTo(coor.x, coor.y);
			},
			rect: function(shape, coor) {
				shape.graphics.rect(stPoint.x, stPoint.y, coor.x - stPoint.x, coor.y - stPoint.y);
			},
			circle:  function(shape, coor) {
				var r = Math.sqrt((coor.x - stPoint.x) * (coor.x - stPoint.x) + (coor.y - stPoint.y) * (coor.y - stPoint.y));
				shape.graphics.drawCircle(stPoint.x, stPoint.y, r);
			},
			text:  function(shape, coor) {
				shape.x = coor.x;
				shape.y = coor.y;
			},
			img:  function(shape, coor) {
				shape.x = coor.x;
				shape.y = coor.y;
			}
		};

		//マウス／タッチイベントの前処理・後処理////////////////////////
		var beforeDrawStartProc = function(mode, coor) {

			if (baseProcType[mode] === 'text') {

				this.target = new Text(this.text, this.font, this.color);

			} else if (baseProcType[mode] === 'img') {

				this.target = new Bitmap(this.img);

			} else if (baseProcType[mode] === 'free' || baseProcType[mode] === 'shape') {

				this.target = new Shape();
				if (baseProcType[mode] === 'free') {
					canvas.wbShareSendCommand({
						uid: uid,
						command: 'draw',
						options: {
							mode: mode,
							color: this.color,
							lineWidth: this.lineWidth,
							strokeState: 'start',
							points: [coor]
						}
					});
				}

				this.target.graphics.setStrokeStyle(status.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
					.beginStroke(status.color);//書き込み1単位 開始
			}
			this.stage.addChild(this.target);
		};

		var afterDrawStartProc = function(mode, coor) {
			//始点を保存
			stPoint = coor;
		};

		var beforeDrawingProc = function(mode, coor) {
			if (baseProcType[mode] === 'free') {//フリーハンドの場合
				//サーバに描画データを送信する
				canvas.wbShareSendCommand({
					uid: uid,
					command: 'draw',
					options: {
						mode: mode,
						color: this.color,
						lineWidth: this.lineWidth,
						strokeState: 'drawing',
						points: [coor]
					}
				});
			} else if (baseProcType[mode] === 'shape') {
				//図形の描画は今まさに描こうとしている状態を見えるようにしたいのでマウスが動くたびに削除して書きなおす
				var graphics = this.target.graphics;
				graphics.endStroke();
				this.stage.removeChild(this.target);
				this.target = new Shape();
				this.stage.addChild(this.target);

				this.target.graphics.setStrokeStyle(this.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
					.beginStroke(this.color);//書き込み1単位 開始
			}

			return this.target;
		}

		var afterDrawingProc = function(mode, coor) {
			this.stage.update();
		}
		
		var beforeDrawFinProc = function(mode, coor) {
			if (baseProcType[mode] === 'shape') {
				//図形の描画は今まさに描こうとしている状態を見えるようにしたいのでマウスが動くたびに削除して書きなおす
				var graphics = this.target.graphics;
				graphics.endStroke();
				this.stage.removeChild(this.target);
				this.target = new Shape();
				stage.addChild(this.target);

				this.target.graphics.setStrokeStyle(status.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
					.beginStroke(status.color);//書き込み1単位 開始
				//graphics.beginFill(color);
			}
		}

		var afterDrawFinProc = function(mode, coor) {

			//自分の書いた図形を保存しておく
			//TODO: これはLogicで管理するか微妙．要検討．
			this.targets[uid].push(this.target);

			if (baseProcType[mode] === 'shape' || baseProcType[mode] === 'free') {
				//図形・フリーハンドはここでストロークを終わらせる
				this.target.graphics.endStroke();

				//サーバに描画データを送信する
				canvas.wbShareSendCommand({
					uid: uid,
					command: 'draw',
					options: {
						mode: mode,
						color: this.color,
						lineWidth: this.lineWidth,
						strokeState: 'fin',
						points: [coor]
					}
				});
			}
			else if (baseProcType[mode] === 'text') {
				//サーバに描画データを送信する
				canvas.wbShareSendCommand({
					uid: uid,
					command: 'draw',
					options: {
						mode: mode,
						color: this.color,
						font: this.font,
						strokeState: 'fin',
						points: [coor]
					}
				});
			}
			else if (baseProcType[mode] === 'img') {
				//サーバに描画データを送信する
				canvas.wbShareSendCommand({
					uid: uid,
					command: 'draw',
					options: {
						mode: mode,
						url: $(this.img).attr('src'),
						strokeState: 'fin',
						points: [coor]
					}
				});
			}
			//描画系後処理
			this.stage.update();
			this.target = null;
		}
		this.start = function(mode, coor) {
			//前処理
			beforeDrawStartProc(mode, coor);

			//実処理
			drawStartCommands[mode](this.target, coor);

			//後処理
			afterDrawStartProc(mode, coor);

			return this;
		};

		this.move = function(mode, shape, coor) {
			//前処理
			beforeDrawingProc(mode, coor);

			//実処理
			drawingCommands[mode](shape, coor);

			//後処理
			afterDrawingProc(mode, coor);
		};

		this.finish = function(mode, shape, coor) {
			//前処理
			beforeDrawFinProc(mode, coor);
			
			//実処理
			drawFinCommands[mode](shape, coor);

			//後処理
			afterDrawFinProc(mode, coor);
		};

		return this;
	};

	$.fn.extend({
		/**
		 * wbShareをCanvas要素に対して適用する
		 */
		wbShare: function(userId) {
			this.filter('canvas').each(function() {
				//コントローラ/////////////

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

				//ロジックの宣言
				var drawLogic = new DrawLogic(stage);
				var selectLogic;	//TODO: あとで作る

				var logic = drawLogic;	//	defaultは描画モード

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
				//描画イベント////////////////////

				//書き始めるイベント
				var startEvent = function(e) {
					e.preventDefault();

					//コマンド実行
					logic.start(mode, coor);

				};
				canvas.on('touchstart', canvas, drawStartEvent);
				canvas.on('mousedown', canvas, drawStartEvent);

				//書いている際のイベント
				var drawingEvent = function(e) {
					e.preventDefault();
					//コマンド実行
					logic.move(mode, coor);

				};
				canvas.on('touchmove', canvas, drawingEvent);
				canvas.on('mousemove', canvas, drawingEvent);

				//書き終わった際のイベント
				var drawFinEvent = function(e) {
					e.preventDefault();

					//コマンド実行
					logic.fin(mode, coor);
				};
				canvas.on('touchend', canvas, drawFinEvent);
				canvas.on('mouseup', canvas, drawFinEvent);
			});
		}
	});
});

