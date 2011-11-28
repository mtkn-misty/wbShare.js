(function($) {
    //定数///////////////////
    //前処理・後処理のタイプとドローモードの対応付け．
    //modeにしたがって，前後処理のタイプを分ける
    var baseProcType = {
        line: 'shape',    //図形 描画終了と共に一回だけデータを送る
        rect: 'shape',
        circle: 'shape',
        free: 'free',    //フリーハンド 描画時は常に座標データを送る
        text: 'text',    //文字列 描画終了と共に一回だけデータを送る
        img: 'img'    //画像 描画終了と共に一回だけデータを送る
    };

    //$.fn.dataにロジックを共有するためにロジックオブジェクトを格納しておくためのkey．
    var LOGICS = 'wbShareLogics';

    //ロジック///////////////////////////////

    /**
     * 選択フェイズのロジック．
     * 選択された図形を移動する，拡大縮小する，回転するなどの処理をする．
     * @param id User ID
     * @param stg EaselJS's stage
     */
    var ShapeSelectLogic = function(id, stg) {
        var logic = this;   //関数オブジェクト中にDrawLogicを参照するための変数

        var uid = id;
        var stage = stg;

        //TODO デフォルト値を設定できるようにする
        //パラメータ
        var params = {
            expansionButtonsColor: null,
            expansionButtonsSize: null,
            moveFrameColor: null,
            moveFrameLineWidth: null,
            turnButtonsColor: null,
            turnButtonsSize: null,
            sendFunc: null
        }

        //選択しているオブジェクト（図形・テキスト・画像）
        var target = null;

        //現在操作しているボタン
        var operationButton = null;

        //操作の種類（拡大縮小: expansion, 移動: move, 回転: turn）．ボタンのクリックイベントで設定する
        var operationType = null;

        //図形のサイズを変更するためのボタン（8方向分）
        var sizeExpansionButtons = {
            left: (function(){
                var btn = new Shape();

                return btn;
            }()),
            right: (function(){

            }()),
            top: (function(){

            }()),
            bottom: (function(){

            }()),
            leftTop: (function(){

            }()),
            rightTop: (function(){

            }()),
            leftBottom: (function(){

            }()),
            rightBottom: (function(){

            }())
        };

        //図形移動用の枠
        var shapeMoveFrame = (function(){}());

        //回転用のボタン
        var shapeTurnButton = (function(){}());

        //プライベート関数////////////////////////////

        /**
         * 選択されている図形（target）に対して操作(拡大縮小，回転，移動)用のオブジェクトを描画する．
         * @param trgt
         */
        var drawOperationButtons = function() {

        };

        /**
         * 選択されている図形に対して操作ボタンに対応した動作を実行する(mousedown時)
         */
        var shapeChangeStartCommands  = {
            expand: function(coor){},
            move: function(coor){},
            turn: function(coor){}
        };

        /**
         * 選択されている図形に対して操作ボタンに対応した動作を実行する(mousemove時)
         */
        var shapeChangingCommands  = {
            expand: function(coor){},
            move: function(coor){},
            turn: function(coor){}
        };

        /**
         * 選択されている図形に対して操作ボタンに対応した動作を実行する(mouseup時)
         */
        var shapeChangeFinishCommands = {
            expand: function(coor){},
            move: function(coor){},
            turn: function(coor){}
        };
        
        //パブリック関数//////////////////////////
        /**
         * 図形がクリックされたときに，その図形を「選択」されたことにする処理
         * @param trgt EaselJSのShape, Bitmap, Textオブジェクト
         */
        this.select = function(trgt) {
            target = trgt;

            //TODO 選択されると見た目を変える処理
            
            drawOperationButtons();
            
            operationButton = null;
        };

        /**
         * Canvas上でmousedownイベント発生時の処理
         * @param coor マウスの座標
         */
        this.start = function(coor) {
            if(operationButton) {
                //操作用のボタンが選択されているとき
                shapeChangeStartCommands[operationType](coor);
            }
            //操作用のボタンが選択されていないときは何もしない
        };

        /**
         * Canvas上でmousemoveイベント発生時の処理
         * @param coor マウスの座標
         */
        this.move = function(coor) {
            if(operationButton) {
                //操作用のボタンが選択されているとき
                shapeChangingCommands[operationType](coor);
            }
            //操作用のボタンが選択されていないときは何もしない
        };

        /**
         * Canvas上でmouseupイベント発生時の処理
         * @param coor マウスの座標
         */
        this.finish = function(coor) {
            if(operationButton) {
                //操作用のボタンが選択されているとき
                shapeChangeFinishCommands[operationType](coor);
            }
            //操作用のボタンが選択されていないときは何もしない
        };

        /**
         * 本ロジックでの図形操作結果を送信する処理
         * @param command
         * @param optioins
         */
        this.sendCommand = function(command, option) {
            params.sendFunc(command, option);
        };

        /**
         * パラメータを設定する
         * @param prms
         */
        this.setParameters = function(prms) {
            for (var i in prms) {
                params[i] = prms[i];
            }
        };

        /**
         * 送信関数を設定する
         * @param prms
         */
        this.setSendFunc = function(func) {
            params.sendFunc = func;
        };

        /**
         * 受信したデータを画面に反映する
         * @param uid
         * @param sid
         * @param command
         * @param options
         */
        this.receiveCommand = function(uid, sid, command, options) {
        };
    };

    /**
     * 描画フェイズのロジック．
     * 選択された図形を移動する，拡大縮小する，回転するなどの処理をする．
     * @param id User ID
     * @param stg EaselJS's stage
     */
    var DrawLogic = function(id, stg) {
        var logic = this;   //関数オブジェクト中にDrawLogicを参照するための変数

        var uid = id;
        var target = null; 
        var stage = stg;

        //今まさに描いている図形のID．受信側で描画するときに使用する．
        // userIDと現在時刻を用いて作成する．
        var nowShapesId = '';

        //現在，データを受信して描画している図形
        //複数同時に受け付けられるように配列にしている
        var receivingShapes = [];

        //TODO デフォルト値を設定できるようにする
        //パラメータ
        var params = {
            color: null,
            text: null,
            lineWidth: 0,
            font: null,
            img: null,
            sendFunc: null
        };

        var stPoint = {};	//描画の始点

        /**
         * 図形ID生成関数
         */
        var generateShapesId = function() {
            var id = uid + '_' + (new Date()).getTime();
            return id;
        };

        /**
         * 1ストローク分の描画処理をする
         */
        var drawOneStroke =	{
            //フリーハンドの描画
			free: function(graphics, options) {
				var pts = options.points;
				//TODO: これだと全く筆を動かさなかった「点」に対応出来ていないので，要対応
				if (options.strokeState === 'start') {
					graphics.moveTo(pts[0].x, pts[0].y);
				} else {
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
		};

        /**
         * mousedownイベント時の処理
         */
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

        /**
         * mousemoveイベント時の処理
         */
        var drawingCommands = {
            line: function(shape, coor) {
                shape.graphics.moveTo(stPoint.x, stPoint.y).lineTo(coor.x, coor.y);
            },
            free: function(shape, coor) {
                shape.graphics.lineTo(coor.x, coor.y);
            },
            rect: function(shape, coor) {
                shape.graphics.rect(stPoint.x, stPoint.y, coor.x - stPoint.x, coor.y - stPoint.y);
            },
            circle:  function(shape, coor) {
                var r = Math.sqrt((coor.x - stPoint.x) * (coor.x - stPoint.x) + (coor.y - stPoint.y) * (coor.y - stPoint.y));
                shape.graphics.drawCircle(stPoint.x, stPoint.y, r);
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

        /**
         * mouseupイベント時の処理
         */
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

            //図形IDの生成
            nowShapesId = generateShapesId();

            if (baseProcType[mode] === 'text') {

                target = new Text(params.text, params.font, params.color);

            } else if (baseProcType[mode] === 'img') {

                target = new Bitmap(params.img);

            } else if (baseProcType[mode] === 'free' || baseProcType[mode] === 'shape') {

                target = new Shape();
                if (baseProcType[mode] === 'free') {
                    logic.sendCommand({
                        uid: uid,
                        sid: nowShapesId,
                        command: 'draw',
                        options: {
                            mode: mode,
                            color: params.color,
                            lineWidth: params.lineWidth,
                            strokeState: 'start',
                            points: [coor]
                        }
                    });
                }

                target.graphics.setStrokeStyle(params.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
                    .beginStroke(params.color);//書き込み1単位 開始
            }
            stage.addChild(target);

        };

        var afterDrawStartProc = function(mode, coor) {
            //始点を保存
            stPoint = coor;
        };

        var beforeDrawingProc = function(mode, coor) {
            if (baseProcType[mode] === 'free') {//フリーハンドの場合
                //サーバに描画データを送信する
                logic.sendCommand({
                    uid: uid,
                    sid: nowShapesId,
                    command: 'draw',
                    options: {
                        mode: mode,
                        color: params.color,
                        lineWidth: params.lineWidth,
                        strokeState: 'drawing',
                        points: [coor]
                    }
                });
            } else if (baseProcType[mode] === 'shape') {
                //図形の描画は今まさに描こうとしている状態を見えるようにしたいのでマウスが動くたびに削除して書きなおす
                var graphics = target.graphics;
                graphics.endStroke();
                stage.removeChild(target);
                var newTarget = new Shape();
                target = newTarget;
                stage.addChild(newTarget);

                newTarget.graphics.setStrokeStyle(params.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
                    .beginStroke(params.color);//書き込み1単位 開始
            }

            return target;
        }

        var afterDrawingProc = function(mode, coor) {
            stage.update();
        }

        var beforeDrawFinProc = function(mode, coor) {
            if (baseProcType[mode] === 'shape') {
                //図形の描画は今まさに描こうとしている状態を見えるようにしたいのでマウスが動くたびに削除して書きなおす
                var graphics = target.graphics;
                graphics.endStroke();
                stage.removeChild(target);
                var newTarget = new Shape();
                stage.addChild(newTarget);

                newTarget.graphics.setStrokeStyle(params.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
                    .beginStroke(params.color);//書き込み1単位 開始
                //graphics.beginFill(color);
            }
        }

        var afterDrawFinProc = function(mode, coor) {
            if (baseProcType[mode] === 'shape' || baseProcType[mode] === 'free') {
                //図形・フリーハンドはここでストロークを終わらせる
                target.graphics.endStroke();
                stage.addChild(target);

                //サーバに描画データを送信する
                logic.sendCommand({
                    uid: uid,
                    sid: nowShapesId,
                    command: 'draw',
                    options: {
                        mode: mode,
                        color: params.color,
                        lineWidth: params.lineWidth,
                        strokeState: 'fin',
                        points: [coor]
                    }
                });
            }
            else if (baseProcType[mode] === 'text') {
                //サーバに描画データを送信する
                logic.sendCommand({
                    uid: uid,
                    sid: nowShapesId,
                    command: 'draw',
                    options: {
                        mode: mode,
                        color: params.color,
                        font: params.font,
                        strokeState: 'fin',
                        points: [coor]
                    }
                });
            }
            else if (baseProcType[mode] === 'img') {
                //サーバに描画データを送信する
                logic.sendCommand({
                    uid: uid,
                    sid: nowShapesId,
                    command: 'draw',
                    options: {
                        mode: mode,
                        url: $(params.img).attr('src'),
                        strokeState: 'fin',
                        points: [coor]
                    }
                });
            }
            //描画系後処理
            stage.update();
            target = null;
        }

        this.start = function(coor) {
            var mode = params.mode;
            //前処理
            beforeDrawStartProc(mode, coor);

            //実処理
            drawStartCommands[mode](target, coor);

            //後処理
            afterDrawStartProc(mode, coor);

            return logic;
        };

        this.move = function(coor) {
            if (target) {
                //描画中の図形が存在すれば実行
                var mode = params.mode;

                //前処理
                beforeDrawingProc(mode, coor);

                //実処理
                drawingCommands[mode](target, coor);

                //後処理
                afterDrawingProc(mode, coor);
            }
        };

        this.finish = function(coor) {
            if (target) {
                //描画中の図形が存在すれば実行

                var mode = params.mode;
                //前処理
                beforeDrawFinProc(mode, coor);

                //実処理
                drawFinCommands[mode](target, coor);

                //後処理
                afterDrawFinProc(mode, coor);
            }
        };

        this.sendCommand = function(command, option) {
            params.sendFunc(command, option);
        };

        this.setParameters = function(prms) {
            for (var i in prms) {
                params[i] = prms[i];
            }
        };

        this.setSendFunc = function(func) {
            params.sendFunc = func;
        };

        this.receiveCommand = function(uid, sid, command, options) {

            if (command === 'draw') {
				var receivingShape;
				if (baseProcType[options.mode] === 'shape') {

					receivingShape = new Shape();
					stage.addChild(receivingShape);
                    var receivingGraphics = receivingShape.graphics;

					receivingGraphics.setStrokeStyle(options.lineWidth)//描画スタイル（線の幅）の設定
						.beginStroke(options.color);//書き込み1単位 開始
					drawOneStroke[options.mode](receivingGraphics, options);

                    receivingGraphics.endStroke();
					stage.update();
				} else if (baseProcType[options.mode] === 'free') {

					if (options.strokeState === 'start') {
                        receivingShape = new Shape(); //受信中オブジェクトに保存
                        receivingShapes[sid] = receivingShape;
						stage.addChild(receivingShape);
					} else {
                        receivingShape = receivingShapes[sid];
                    }

					var receivingGraphics = receivingShape.graphics;

					//以下の処理はstartの時以外に実施すると2回目以降なにも表示されなくなってしまう
					if (options.strokeState === 'start') {
						receivingGraphics.setStrokeStyle(options.lineWidth)//描画スタイル（線の幅）の設定
							.beginStroke(options.color);//書き込み1単位 開始
					}

					drawOneStroke[options.mode](receivingGraphics, options);

					stage.update();

					if (options.strokeState === 'fin') {
						receivingGraphics.endStroke();
						delete receivingShapes[sid];
					}
				} else if (baseProcType[options.mode] === 'text') {
					var receivingShape = new Text(options.text, options.font, options.color);
					receivingShape.x = options.points[0].x;
					receivingShape.y = options.points[0].y;
					stage.addChild(receivingShape);
					stage.update();
				} else if (baseProcType[options.mode] === 'img') {
				    var img = $('<img src="' + options.url + '"/>');
					var receivingShape = new Bitmap(img[0]);
					receivingShape.x = options.points[0].x;
					receivingShape.y = options.points[0].y;
					stage.addChild(receivingShape);
					stage.update();
				}

			} else if (command === 'clear') {

			}
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

                var receivedShapes = [];	//他者から今まさに受信しているオブジェクト．他者のuid属性で名前空間を切ってそこに値を入れる

                //ロジックの宣言///

                //描画モード用のロジック
                var drawLogic = new DrawLogic(uid, stage);

                //デフォルト値を設定できるようにする
                drawLogic.setParameters({
                    mode: 'free',
                    color: '#000000',
                    text: 'hoge',
                    lineWidth: 3,
                    font: '22px Arial',
                    img: null
                });

                //選択モード用のロジック
                var selectLogic;	//TODO: あとで作る

                var logic = drawLogic;	//	defaultは描画モード

                canvas.data(LOGICS, {drawLogic: drawLogic, selectLogic: selectLogic});

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
                    logic.start(getCanvasCoor(e));

                };
                canvas.on('touchstart', canvas, startEvent);
                canvas.on('mousedown', canvas, startEvent);

                //書いている際のイベント
                var moveEvent = function(e) {
                    e.preventDefault();
                    //コマンド実行
                    logic.move(getCanvasCoor(e));

                };
                canvas.on('touchmove', canvas, moveEvent);
                canvas.on('mousemove', canvas, moveEvent);

                //書き終わった際のイベント
                var finEvent = function(e) {
                    e.preventDefault();

                    //コマンド実行
                    logic.finish(getCanvasCoor(e));
                };
                canvas.on('touchend', canvas, finEvent);
                canvas.on('mouseup', canvas, finEvent);
            });
            return this;
        },
        wbShareSetSendFunction: function(func) {
            var canvas = this;
            //ユーザが設定した関数呼び出し．
            //ここにはデータ送信用の関数を設定していただく
            var logics = canvas.data(LOGICS);
            logics.drawLogic.setSendFunc(func);
            return canvas;
        },
        wbShareSetMode: function(md) {
            var canvas = this;
            var logics = canvas.data(LOGICS);
            logics.drawLogic.setParameters({mode: md});
            return canvas;
        },
        wbShareSetText: function(txt) {
            var canvas = this;
            var logics = canvas.data(LOGICS);
            logics.drawLogic.setParameters({text: txt});
            return canvas;
        },
		wbShareSetImg: function(url) {
			var canvas = this;
			//TODO: factorがIMG, canvas, videoであることを確認する
            var img = $('#' + workImgId).attr('src', url)[0];
            var logics = canvas.data(LOGICS);
            logics.drawLogic.setParameters({img: img});
			return canvas;
		},
		wbShareSetColor: function(clr) {
			var canvas = this;
            var logics = canvas.data(LOGICS);
            logics.drawLogic.setParameters({color: clr});
			return canvas;
		},
		wbShareSetLineWidth: function(width) {
			var canvas = this;
            var logics = canvas.data(LOGICS);
            logics.drawLogic.setParameters({lineWidth: width});
			return canvas;
		},
		wbShareSetFont: function(fnt) {
			var canvas = this;
            var logics = canvas.data(LOGICS);
            logics.drawLogic.setParameters({font: fnt});
			return canvas;
		},
		wbShareClear: function(uid) {
			var canvas = this;
            var logics = canvas.data(LOGICS);
            logics.drawLogic.clear(uid);    //TODO: 未実装
			return canvas;
		},
        /**
		 * 図形情報データの受信関数
		 * データを受信して図形を描画する
		 */
		wbShareDrawShape: function(uid, sid, command, options) {
			var canvas = this;

            var logics = canvas.data(LOGICS);
            logics.drawLogic.receiveCommand(uid, sid,  command, options);
			return canvas;
		}
    });
})(jQuery);

