/**
 * User: takano_masanori
 * Date: 11/12/12
 * Time: 20:43
 * To change this template use File | Settings | File Templates.
 */

//FIX 通信形式を変更する
//FIX 受信したデータもクリックして選択できるようにする

//FIX 直線を選択可能にする
//FIX フリーハンドを選択可能にする
//FIX 文字列を選択可能にする
//FIX 画像を選択可能にする
//---ここで全図形が移動可能になる

//FIX 図形を削除できるようにする

//FIX 図形の移動の情報も送信／受信して反映ができるようにする

//FIX 文字列を再編集可能にする

//FIX 画像を送れるようにする

//---その他
//FIX 描画関連のチューニングをする
//FIX 書き込み不可能領域を作る → 自分で描画したもの以外は選択・操作ができないようにした
//TODO テストケースをちゃんと書く。ここまでくるまでに絶対デグレしてるので

//---以下はアプリ側にすること
//FIX 文字列入力ダイアログを作成する
//FIX 画像貼りつけ用ダイアログを作成する

//---サブ機能
//TODO 塗りつぶしオプションを付ける
//TODO 三角性をかけるようにする
//TODO 矢印をかけるようにする

//TODO 図形を回転できるようにする
//TODO 図形を拡大できるようにする
//TODO 図形の回転・拡大の情報も送信／受信して反映ができるようにする


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
    var CANVASES = 'wbShareCanvases';

    //キャンバス上の全図形を管理する。sid -> object
    var shapeMap = {};

    //ロジック///////////////////////////////

    /**
     * 選択フェイズのロジック．
     * 選択された図形を移動する，拡大縮小する，回転するなどの処理をする．
     * @param id User ID
     * @param stg EaselJS's stage
     */
    var SelectLogic = function(id, canvasId, stg, sStage, sCanvas) {
        var logic = this;   //関数オブジェクト中にDrawLogicを参照するための変数

        var uid = id;
        var cid = canvasId;
        var stage = stg;
        var selectStage = sStage;
        var selectCanvas = sCanvas;
        var stPoint = {x: 0, y: 0};

        //現在の図形に対する操作を表す．
        //select, expansion, move, trun, null（なにもしていない）の5つの値を取る
        var state = null;

        var operationButotns = {
            frame: null
        };

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
        };

        //選択しているオブジェクト（図形・テキスト・画像）
        var target = null;

        //操作の種類（拡大縮小: expansion, 移動: move, 回転: turn）．ボタンのクリックイベントで設定する
        //var operationType = null;

        //プライベート関数////////////////////////////

        //図形移動用の枠の生成
        var drawShapeMoveFrame = function(){
            var frame = new Shape();
            frame.alpha = 0.5;
            frame.x = target.x;
            frame.y = target.y;

            var graphics = frame.graphics;
            graphics.setStrokeStyle(params.moveFrameLineWidth, 1, 1)//描画スタイル（線の幅）の設定
                .beginFill(params.moveFrameColor);//書き込み1単位 開始
            graphics.rect(target.stX - 16, target.stY - 16, target.width + 32, target.height + 32);

            graphics.endFill();

            frame.onPress = function(e) {
                state = 'move';
            };

            return frame;
        };

        /**
         * 選択されている図形（target）に対して操作(拡大縮小，回転，移動)用のオブジェクトを描画する．
         */
        var drawOperationButtons = function() {
            operationButotns.frame = drawShapeMoveFrame();
            selectStage.addChild(operationButotns.frame);
            selectStage.update();
        };

        /**
         * 選択されている図形に対して操作ボタンに対応した動作を実行する(mousedown時)
         */
        var shapeChangeStartCommands  = {
            select: function(coor){},
            expand: function(coor){},
            move: function(coor){},
            turn: function(coor){}
        };

        /**
         * 選択されている図形に対して操作ボタンに対応した動作を実行する(mousemove時)
         */
        var shapeChangingCommands  = {
            select: function(coor){},
//            expand: function(coor){
//                var scale = (coor.y - stPoint.y) / 10;
//                target.scaleX = scale;
//            },
            move: function(coor){
                operationButotns.frame.x = coor.x - stPoint.x;
                operationButotns.frame.y = coor.y - stPoint.y;
            },
            turn: function(coor){}
        };

        /**
         * 選択されている図形に対して操作ボタンに対応した動作を実行する(mouseup時)
         */
        var shapeChangeFinishCommands = {
            select: function(coor){},
            expand: function(coor){
                var scale = (coor.y - stPoint.y) / 10;
                target.scaleX = scale;
            },
            move: function(coor){
                var frame = operationButotns.frame;
                target.x = frame.x;
                target.y = frame.y;

                logic.sendCommand({
                    uid: uid,
                    tid: cid,
                    wbSh: {
                        sid: target.sid,
                        cmd: 'sel',
                        opt: {
                            mode: state,
                            point: {x: target.x, y: target.y}
                        }
                    }
                });
            },
            turn: function(coor){}
        };

        //パブリック関数//////////////////////////
        /**
         * 図形がクリックされたときに，その図形を「選択」されたことにする処理
         * @param obj EaselJSのShape, Bitmap, Textオブジェクト
         */
        this.select = function(e, obj){

            if(obj == target) {//ここは参照先を比較するので=は2つ
                //クリックされたもの(obj)と現在選択されているもの(target)が同一であれば
                //なにもしない？

            } else {
                //クリックされたもの(obj)と現在選択されているもの(target)が異なれば

                //新たにobjが選択されたとする
                target = obj;

                //自分で描画したもの以外は選択できないようにする
                if(target.uid !== uid) {
                    return;
                }
                drawOperationButtons();

                state = 'select';
            }
        };

        /**
         * Canvas上でmousedownイベント発生時の処理
         * @param coor マウスの座標
         */
        this.start = function(coor) {

            if(!target) {
                //何も選択されていないときにCanvasをクリックした時はtargetがnullなので何もしない
                return
            }

            stPoint = coor;
            var frame = operationButotns.frame;
            if(frame) {
                stPoint.x -= target.x;
                stPoint.y -= target.y;
            }
            if(state) {
                //操作が選択されているとき
                shapeChangeStartCommands[state](coor);
                selectStage.update();
            }

        };

        /**
         * Canvas上でmousemoveイベント発生時の処理
         * @param coor マウスの座標
         */
        this.move = function(coor) {
            if(state) {
                //操作が選択されているとき
                shapeChangingCommands[state](coor);
                selectStage.update();
            }
            //操作用のボタンが選択されていないときは何もしない
        };

        /**
         * Canvas上でmouseupイベント発生時の処理
         * @param coor マウスの座標
         */
        this.finish = function(coor) {
            if(state) {
                //操作が選択されているとき
                shapeChangeFinishCommands[state](coor);
            } else {
                //選択解除処理
                target = null;
                operationButotns.frame = null;
                selectStage.removeAllChildren();
                selectCanvas.css('z-index', 9998);
            }
            selectStage.update();
            stage.update();
            state = null;
        };

        this.release = function(){

            //選択解除処理
            target = null;
            selectStage.removeAllChildren();
            selectCanvas.css('z-index', '9999');
            selectStage.update();
            stage.update();
            state = null;
        };

        /**
         * 本ロジックでの図形操作結果を送信する処理
         * @param command
         * @param option
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

        this.receiveCommand = function(uid, wbSh) {
            var command = wbSh.cmd;
            var options = wbSh.opt;
            var sid = wbSh.sid;

            var rTarget = shapeMap[sid];
            if (options.mode === 'move') {

                rTarget.x = options.point.x;
                rTarget.y = options.point.y;

            } else if (options.mode === 'del'){
                stage.removeChild(rTarget);
                shapeMap[rTarget.sid] = undefined;
                this.release();
            } else if(options.mode === 'txtedit'){
                rTarget.text = options.text;
            }
            stage.update();
        };

        this.deleteShape = function(){

            logic.sendCommand({
                uid: uid,
                tid: cid,
                wbSh: {
                    sid: target.sid,
                    cmd: 'sel',
                    opt: {
                        mode: 'del'
                    }
                }
            });
            stage.removeChild(target);
            shapeMap[target.sid] = undefined;
            this.release();
        };

        this.expandShape = function(scale){
            if(target){
                target.scaleX = scale;
                target.scaleY = scale;
                stage.update();
            }
        };

        /**
         * 選択中の文字列（target）の文字列をtextに差し替える
         * @param text
         */
        this.editText = function(text){

            if(target.font){
                //現在選択されているのが文字列であれば
                target.text = text;

                logic.sendCommand({
                    uid: uid,
                    tid: cid,
                    wbSh: {
                        sid: target.sid,
                        cmd: 'sel',
                        opt: {
                            mode: 'txtedit',
                            text: text
                        }
                    }
                });
                stage.update();
            }
        };
    };

    /**
     * 描画フェイズのロジック．
     * 選択された図形を移動する，拡大縮小する，回転するなどの処理をする．
     * @param id User ID
     * @param stg EaselJS's stage
     */
    var DrawLogic = function(userId, canvasId, stg, tmpStg, tmpCvs) {
        var logic = this;   //関数オブジェクト中にDrawLogicを参照するための変数

        var uid = userId;
        var cid = canvasId;

        var target = null;
        var stage = stg;
        var tmpStage = tmpStg;
        var tmpCanvas = tmpCvs;

        //今まさに描いている図形のID．受信側で描画するときに使用する．
        // userIDと現在時刻を用いて作成する．
        var nowShapesId = '';

        //現在，データを受信して描画している図形
        //複数同時に受け付けられるように配列にしている
        var receivingShapes = [];

        //Canvasに画像を貼るための一時的な領域
        var imgJqObj = $('<img />');

        //TODO デフォルト値を設定できるようにする
        //パラメータ
        var params = {
            color: null,
            text: null,
            lineWidth: 0,
            font: null,
            //img: imgJqObj,
            sendFunc: null
        };

        var eventFuncs = {
            press: null,
            click: null
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
                shape.stX = coor.x;
                shape.stY = coor.y
            },
            free: function(shape, coor) {
                shape.graphics.moveTo(coor.x, coor.y);
                shape.stX = coor.x;
                shape.stY = coor.y;
                shape.minX = coor.x;
                shape.minY = coor.y;
                shape.maxX = coor.x;
                shape.maxY = coor.y;
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
                //TODO ここ何とかしたい
                if(coor.x < shape.minX){
                    shape.minX = coor.x;
                } else if(coor.x > shape.maxX){
                    shape.maxX = coor.x;
                }
                if(coor.y < shape.minY){
                    shape.minY = coor.y;
                } else if(coor.y > shape.maxY){
                    shape.maxY = coor.y;
                }
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
                shape.stX = stPoint.x;
                shape.stY = stPoint.y;
                shape.width = coor.x - stPoint.x;
                shape.height = coor.y - stPoint.y;
            },
            free: function(shape, coor) {
                //TODO: これだと，始点と終点が同じならば，筆を動かしていても点と判断してしまうので，要対応
                if (coor.x === stPoint.x && coor.y === stPoint.y) {
                    //全く動いてないときは線でなくて小さい四角を書く
                    shape.graphics.rect(stPoint.x, stPoint.y, 1, 1);
                }
                shape.graphics.lineTo(coor.x, coor.y);
                if(coor.x < shape.minX){
                    shape.minX = coor.x;
                } else if(coor.x > shape.maxX){
                    shapem.maxX = coor.x;
                }
                if(coor.y < shape.minY){
                    shape.minY = coor.y;
                } else if(coor.y > shape.maxY){
                    shape.maxY = coor.y;
                }
                shape.stX = shape.minX;
                shape.stY = shape.minY;
                shape.width = shape.maxX - shape.minX;
                shape.height = shape.maxY - shape.minY;
            },
            rect: function(shape, coor) {
                var width = coor.x - stPoint.x;
                var height = coor.y - stPoint.y;
                shape.graphics.rect(stPoint.x, stPoint.y, width, height);

                //EaselJSだと以下の座標を取得できないので自前で値を設定する
                shape.stX = stPoint.x;
                shape.stY = stPoint.y;
                shape.width = width;
                shape.height = height;
            },
            circle:  function(shape, coor) {

                var r = Math.sqrt((coor.x - stPoint.x) * (coor.x - stPoint.x) + (coor.y - stPoint.y) * (coor.y - stPoint.y));

                shape.graphics.drawCircle(stPoint.x, stPoint.y, r);

                //EaselJSだと以下の座標を取得できないので自前で値を設定する
                shape.stX = stPoint.x - r;
                shape.stY = stPoint.y - r;
                shape.r = r;
                shape.width = r * 2;
                shape.height = r * 2;
            },
            text:  function(text, coor) {
                text.x = coor.x;
                text.y = coor.y;


                //TODO このままだとフォント名に数字を含むとバグになる
                var font = text.font;
                var fsize = parseInt(font);//font.slice(0, font.lastIndexOf('px ')).slice(font.lastIndexOf(' '), font.length);
                text.stX = 0;
                text.stY = -fsize / 2;
                text.width = fsize;// * font.length / 2;
                text.height = fsize;

            },
            img:  function(bitmap, coor) {
                bitmap.x = coor.x;
                bitmap.y = coor.y;
                bitmap.stX = 0;
                bitmap.stY = 0;
                //TODO 暫定的処理
                bitmap.width = 100;
                bitmap.height = 100;
            }
        };

        //マウス／タッチイベントの前処理・後処理////////////////////////
        var beforeDrawStartProc = function(mode, coor) {

            //図形IDの生成
            nowShapesId = generateShapesId();

            if (baseProcType[mode] === 'text') {

                target = new Text(params.text, params.font, params.color);

            } else if (baseProcType[mode] === 'img') {

                target = new Bitmap(imgJqObj[0]);

            } else if (baseProcType[mode] === 'free' || baseProcType[mode] === 'shape') {

                target = new Shape();
                if (baseProcType[mode] === 'free') {
                    logic.sendCommand({
                        uid: uid,
                        tid: cid,
                        wbSh: {
                            sid: nowShapesId,
                            cmd: 'draw',
                            opt: {
                                mode: mode,
                                color: params.color,
                                lineWidth: params.lineWidth,
                                strokeState: 'start',
                                points: [coor]
                            }
                        }
                    });
                }

                target.graphics.setStrokeStyle(params.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
                    .beginStroke(params.color);//書き込み1単位 開始
            }
            //stage.addChild(target);
            tmpStage.addChild(target);

        };

        var afterDrawStartProc = function(mode, coor) {
            //始点を保存
            stPoint = coor;
            //stage.update();
            tmpStage.update();
        };

        var beforeDrawingProc = function(mode, coor) {
            if (baseProcType[mode] === 'free') {//フリーハンドの場合
                //サーバに描画データを送信する
                logic.sendCommand({
                    uid: uid,
                    tid: cid,
                    wbSh: {
                        sid: nowShapesId,
                        cmd: 'draw',
                        opt: {
                            mode: mode,
                            color: params.color,
                            lineWidth: params.lineWidth,
                            strokeState: 'drawing',
                            points: [coor]
                        }
                    }
                });
            } else if (baseProcType[mode] === 'shape') {
                //図形の描画は今まさに描こうとしている状態を見えるようにしたいのでマウスが動くたびに削除して書きなおす
                var graphics = target.graphics;
                graphics.endStroke();
                //stage.removeChild(target);
                tmpStage.removeChild(target);
                var newTarget = new Shape();
                target = newTarget;
                //stage.addChild(newTarget);
                tmpStage.addChild(newTarget);

                newTarget.graphics.setStrokeStyle(params.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
                    .beginStroke(params.color);//書き込み1単位 開始
            }

            return target;
        }

        var afterDrawingProc = function(mode, coor) {
            //stage.update();
            tmpStage.update();
        }

        var beforeDrawFinProc = function(mode, coor) {
            if (baseProcType[mode] === 'shape') {
                //図形の描画は今まさに描こうとしている状態を見えるようにしたいのでマウスが動くたびに削除して書きなおす
                var graphics = target.graphics;
                graphics.endStroke();
                //stage.removeChild(target);
                tmpStage.removeChild(target);
                var newTarget = new Shape();
                //stage.addChild(newTarget);
                tmpStage.addChild(newTarget);

                newTarget.graphics.setStrokeStyle(params.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
                    .beginStroke(params.color);//書き込み1単位 開始
                //graphics.beginFill(params.color);
            }
        }

        var afterDrawFinProc = function(mode, coor) {
            //左上が最小になるようにする（円の時は意味なし）
            if(target.width < 0) {
                target.stX += target.width;
                target.width *= -1;
            }
            if(target.height < 0) {
                target.stY += target.height;
                target.height *= -1;
            }
            //modeを保存
            target.type = mode;
            target.sid = nowShapesId;
            target.uid = uid;

            //図形を保存
            shapeMap[nowShapesId] = target;

            if (baseProcType[mode] === 'shape' || baseProcType[mode] === 'free') {
                //図形・フリーハンドはここでストロークを終わらせる
                target.graphics.endStroke();
                //stage.addChild(target);
                tmpStage.addChild(target);
                var points = [coor];
                if (baseProcType[mode] === 'shape' ) {
                    points = [stPoint, coor];
                }
                //サーバに描画データを送信する
                logic.sendCommand({
                    uid: uid,
                    tid: cid,
                    wbSh: {
                        sid: nowShapesId,
                        cmd: 'draw',
                        opt: {
                            mode: mode,
                            color: params.color,
                            lineWidth: params.lineWidth,
                            strokeState: 'fin',
                            points: points,
                            stPoint: {x: target.stX, y: target.stY},
                            size: {width: target.width, height: target.height}
                        }
                    }
                });
            }
            else if (baseProcType[mode] === 'text') {
                //サーバに描画データを送信する
                logic.sendCommand({
                    uid: uid,
                    tid: cid,
                    wbSh: {
                        sid: nowShapesId,
                        cmd: 'draw',
                        opt: {
                            text:params.text, // TODO ここの共有のため暫定対応
                            mode: mode,
                            color: params.color,
                            font: params.font,
                            strokeState: 'fin',
                            points: [coor],
                            stPoint: {x: target.stX, y: target.stY},
                            size: {width: target.width, height: target.height}
                        }
                    }
                });
            }
            else if (baseProcType[mode] === 'img') {
                //サーバに描画データを送信する
                logic.sendCommand({
                    uid: uid,
                    tid: cid,
                    wbSh: {
                        sid: nowShapesId,
                        cmd: 'draw',
                        opt: {
                            mode: mode,
                            url: imgJqObj.attr('src'),
                            strokeState: 'fin',
                            points: [coor],
                            stPoint: {x: target.stX, y: target.stY},
                            size: {width: target.width, height: target.height}
                        }
                    }
                });
            }
            //targetにクリックイベンを設定する
            target.onClick = function(e){
                if(eventFuncs.click) {
                    eventFuncs.click(e, this);
                }
            };
            target.onPress = function(e){
                if(eventFuncs.press) {
                    eventFuncs.press(e, this);
                }
            };
            //描画系後処理
            stage.addChild(target);
            stage.update();
            tmpStage.removeAllChildren();
            tmpStage.update();
            target = null;
        };

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

        this.setEventFuncs = function(funcs){
            for (var i in funcs) {
                eventFuncs[i] = funcs[i];
            }
        };

        this.setSendFunc = function(func) {
            params.sendFunc = func;
        };

        this.setImgUrl = function(url) {
            imgJqObj = $('<img />');
            imgJqObj.attr('src', url);
        };

        this.receiveCommand = function(uid, wbSh) {
            var command = wbSh.cmd;
            var options = wbSh.opt;
            var sid = wbSh.sid;

            if (command === 'draw') {

                var receivingShape;
                if (baseProcType[options.mode] === 'shape') {

                    receivingShape = new Shape();

                    stage.addChild(receivingShape);

                    var receivingGraphics = receivingShape.graphics;

                    receivingGraphics.setStrokeStyle(options.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
                        .beginStroke(options.color);//書き込み1単位 開始
                    drawOneStroke[options.mode](receivingGraphics, options);

                    receivingGraphics.endStroke();
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
                        receivingGraphics.setStrokeStyle(options.lineWidth, 1, 1)//描画スタイル（線の幅）の設定
                            .beginStroke(options.color);//書き込み1単位 開始
                    }

                    drawOneStroke[options.mode](receivingGraphics, options);

                    if (options.strokeState === 'fin') {
                        receivingGraphics.endStroke();
                        delete receivingShapes[sid];
                    }
                } else if (baseProcType[options.mode] === 'text') {
                    var receivingShape = new Text(options.text, options.font, options.color);
                    receivingShape.x = options.points[0].x;
                    receivingShape.y = options.points[0].y;

                    stage.addChild(receivingShape);
                } else if (baseProcType[options.mode] === 'img') {
                    var img = $('<img src="' + options.url + '"/>');
                    var receivingShape = new Bitmap(img[0]);
                    receivingShape.x = options.points[0].x;
                    receivingShape.y = options.points[0].y;

                    stage.addChild(receivingShape);
                }

                //選択したときに「ガワ」を表示するための情報
                if(options.strokeState === 'fin') {
                    receivingShape.stX = options.stPoint.x;
                    receivingShape.stY = options.stPoint.y;
                    receivingShape.width = options.size.width;
                    receivingShape.height = options.size.height;
                }

                //targetにクリックイベンを設定する
                receivingShape.onClick = function(e){
                    if(eventFuncs.click) {
                        eventFuncs.click(e, this);
                    }
                };
                receivingShape.onPress = function(e){
                    if(eventFuncs.press) {
                        eventFuncs.press(e, this);
                    }
                };

                stage.update();

                //図形を保存
                shapeMap[sid] = receivingShape;
                receivingShape.sid = sid;
                receivingShape.uid = uid;
            }
        };
        return this;
    };

    $.fn.extend({
        /**
         * wbShareをCanvas要素に対して適用する
         */
        wbShare: function(userId, canvasId, isReadOnly) {
            if(!isReadOnly){
                isReadOnly = false;
            }

            this.each(function() {
                that = $(this);
                //コントローラ/////////////

                //wbShareの１インスタンスを通しての状態変数/////////////////////
                var uid = userId;
                var cid = canvasId;
                var canvasDiv = $(this);
                var divHeight = canvasDiv.css('height');
                var divWidth = canvasDiv.css('width');

                var canvas = $('<canvas class="mainCanvas" height="' + divHeight + '" width="' + divWidth + '"></canvas>');
                var selectCanvas = $('<canvas class="selectCanvas" height="' + divHeight + '" width="' + divWidth + '"></canvas>');

                //描画キャッシュ用
                var tmpCanvas = $('<canvas class="tmpCanvas" height="' + divHeight + '" width="' + divWidth + '"></canvas>');

                canvasDiv.append(canvas).append(selectCanvas).append(tmpCanvas);

                var stage = new Stage(canvas[0]);
                var selectStage = new Stage(selectCanvas[0]);
                var tmpStage =  new Stage(tmpCanvas[0]);

                //ロジックの宣言///

                //描画モード用のロジック
                var drawLogic = new DrawLogic(uid, cid, stage, tmpStage, tmpCanvas);

                //デフォルト値を設定できるようにする
                drawLogic.setParameters({
                    mode: 'free',
                    color: '#000000',
                    text: 'hoge',
                    lineWidth: 10,
                    font: '22px Arial'
                });

                //選択モード用のロジック
                //選択モード用のテンポラリキャンバスの作成（ここに図形操作用の図形を描画する）
                var selectLogic = new SelectLogic(uid, cid, stage, selectStage, selectCanvas);
                selectLogic.setParameters({
                    expansionButtonsColor: '#ff0000',
                    expansionButtonsSize: 5,
                    moveFrameColor: '#00FF00',
                    moveFrameLineWidth: 15,
                    turnButtonsColor: '#0000FF',
                    turnButtonsSize: 5
                });

                //図形をClickした時などのイベント処理用関数を設定
                drawLogic.setEventFuncs({press:
                    function(e, obj){

                        //選択フェイズの時のみ選択関数を呼ぶ
                        if(that.data(LOGICS).logic == selectLogic){
                            selectLogic.select(e, obj);
                            selectCanvas.css('z-index', '10002');
                        }
                    }
                });

                var logic = drawLogic;	//	defaultは描画モード

                canvasDiv.data(CANVASES, {canvas: canvas, selectCanvas: selectCanvas, tmpCanvas: tmpCanvas});
                canvasDiv.data(LOGICS, {logic: logic, drawLogic: drawLogic, selectLogic: selectLogic});

                //Util ipad - PCのイベント差吸収系///////////

                //クリックされた座標を取得する関数．高速化のためtouchイベントの有無は最初の一回のみ
                //判断し，その際にgetCanvasCoor自身を，touchイベントの有無判断の無い形に書き換える．
                var getCanvasCoor = function(e) {
                    //jQuery's event object unsupports touche events, so we use the object of "window.event"
                    if (event.touches) {//タッチ系のイベントが存在する場合
                        var func = function(e) {
                            var touches = event.touches[0];
                            if (touches) {
                                //border-widthが太く設定されていると，それによってCanvasの描画する部分がずれてしまうので，その分を足す．
                                var offset = canvas.offset();
                                offset.left += parseInt(canvas.css('borderLeftWidth'));
                                offset.top += parseInt(canvas.css('borderTopWidth'));
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
                    else { //タッチ系のデバイス以外の場合
                        var func = function(e) {
                            //border-widthが太く設定されていると，それによってCanvasの描画する部分がずれてしまうので，その分を足す．
                            var offset = canvas.offset();
                            offset.left += parseInt(canvas.css('borderLeftWidth'));
                            offset.top += parseInt(canvas.css('borderTopWidth'));
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

                if(!isReadOnly){
                    //mainCanvasに対するイベント
                    var startEvent = function(e) {
                        e.preventDefault();

                        //tmpCanvas.css('z-index', '10002');

                        //使用するlogicを更新する
                        var logics = canvasDiv.data(LOGICS);
                        logic = logics.logic;

                        //コマンド実行
                        logic.start(getCanvasCoor(e));

                    };
                    tmpCanvas.on('touchstart', canvas, startEvent);
                    tmpCanvas.on('mousedown', canvas, startEvent);

                    //書いている際のイベント
                    var moveEvent = function(e) {
                        e.preventDefault();
                        //コマンド実行
                        logic.move(getCanvasCoor(e));

                    };
                    tmpCanvas.on('touchmove', canvas, moveEvent);
                    tmpCanvas.on('mousemove', canvas, moveEvent);

                    //書き終わった際のイベント
                    var finEvent = function(e) {
                        e.preventDefault();

                        //コマンド実行
                        logic.finish(getCanvasCoor(e));

                    };
                    tmpCanvas.on('touchend', canvas, finEvent);
                    tmpCanvas.on('mouseup', canvas, finEvent);

                    //selectCanvasに対するイベント
                    var startSelEvent = function(e) {
                        e.preventDefault();

                        //使用するlogicを更新する
                        var logics = canvasDiv.data(LOGICS);
                        logic = logics.logic;

                        //コマンド実行
                        logic.start(getCanvasCoor(e));
                    };
                    selectCanvas.on('touchstart', startSelEvent);
                    selectCanvas.on('mousedown', startEvent);

                    //書いている際のイベント
                    var moveSelEvent = function(e) {
                        e.preventDefault();
                        //コマンド実行
                        logic.move(getCanvasCoor(e));

                    };
                    selectCanvas.on('touchmove', moveSelEvent);
                    selectCanvas.on('mousemove', moveSelEvent);

                    //書き終わった際のイベント
                    var finSelEvent = function(e) {
                        e.preventDefault();

                        //コマンド実行
                        logic.finish(getCanvasCoor(e));

                    };
                    selectCanvas.on('touchend', finSelEvent);
                    selectCanvas.on('mouseup', finSelEvent);
                }
            });
            return this;
        },
        wbShareSetSendFunction: function(func) {
            var canvasDiv = this;
            //ユーザが設定した関数呼び出し．
            //ここにはデータ送信用の関数を設定していただく
            var logics = canvasDiv.data(LOGICS);
            logics.drawLogic.setSendFunc(func);
            logics.selectLogic.setSendFunc(func);
            return canvasDiv;
        },
        wbShareSetMode: function(md) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.drawLogic.setParameters({mode: md});
            return canvasDiv;
        },
        wbShareSetPhase: function(phase) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            var canvases = $(this).data(CANVASES);

            if(phase === 'select') {
                logics.logic = logics.selectLogic;
                canvasDiv.data(LOGICS, logics);
                canvases.selectCanvas.css('z-index', 9998);
                canvases.tmpCanvas.css('z-index', 9998);
                canvases.canvas.css('z-index', 10000);
            } else if(phase === 'draw') {
                //選択処理解除
                logics.selectLogic.release();
                logics.logic = logics.drawLogic;
                canvasDiv.data(LOGICS, logics);
                canvases.selectCanvas.css('z-index', 9999);
                canvases.tmpCanvas.css('z-index', 10001);
                canvases.canvas.css('z-index', 10000);
            }
            return canvasDiv;
        },
        wbShareSetText: function(txt) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.drawLogic.setParameters({text: txt});
            return canvasDiv;
        },
        wbShareSetImg: function(url) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.drawLogic.setImgUrl(url);
            return canvasDiv;
        },
        wbShareSetColor: function(clr) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.drawLogic.setParameters({color: clr});
            return canvasDiv;
        },
        wbShareSetLineWidth: function(width) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.drawLogic.setParameters({lineWidth: width});
            return canvasDiv;
        },
        wbShareDelete: function(){
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.selectLogic.deleteShape();
            return canvasDiv;
        },
        wbShareExpand: function(scale) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.selectLogic.expandShape(scale);
            return canvasDiv;
        },
        wbShareSetFont: function(fnt) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.drawLogic.setParameters({font: fnt});
            return canvasDiv;
        },
        wbShareSetParams: function(params) {
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.drawLogic.setParameters(params);

            //TODO パラメータ設定は後で整理する
            if(params.sendFunc){
                logics.selectLogic.setSendFunc(params.sendFunc);
            }
            return canvasDiv;
        },
        wbShareEditText: function(text){
            var canvasDiv = this;
            var logics = canvasDiv.data(LOGICS);
            logics.selectLogic.editText(text);
            return canvasDiv;
        },
        wbShareClear: function(uid) {
            //TODO: 未実装
        },
        /**
         * 図形情報データの受信関数
         * データを受信して図形を描画する
         */
        wbShareDrawShape: function(uid, tid, command) {
            var canvasDiv = this;

            var logics = canvasDiv.data(LOGICS);
            if(command.cmd == 'draw'){
                logics.drawLogic.receiveCommand(uid, command);
            } else if(command.cmd = 'sel'){
                logics.selectLogic.receiveCommand(uid, command);
            }
            return canvasDiv;
        },
        /**
         * imgUrlで指定された画像を全体の背景に設定する
         * @param imgUrl
         */
        wbShareSetBackground: function(imgUrl){
            //TODO
        }
    });
})(jQuery);

