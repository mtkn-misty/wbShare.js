wbShare.js - ノート共有 canvas系jqueryプラグイン
======================

ABSTRACT
----------
Canvasを使用したノート（お絵かき）共有が可能なjQueryプラグインです。
また、描画データをJSON形式で出力・入力可能です。
そのため、CanvasWebSocket通信など組み合わせて、一方の画面で描画しているものを他方の画面に描画することができます。

描画フェイズと選択フェイズの2種類があり、後述する方法で変更します。
描画フェイズでは、線や図形の描画やテキスト・画像の貼り付けができます。
選択フェイズでは、図形を選択して移動・削除することができます。

jQueryとEaselJSに依存しています。

DEMO
----------
[DEMO サイトへ](http://jsdo.it/mtkn-misty/gyDt)

USAGE
----------

### HTML ###
      <!--CSSとJSの読み込み-->
      <link rel="stylesheet" href="./wbShare.js/wbShare.css" type="text/css">
      <script type="text/javascript" src="./wbShare.js/wbShare.js"></script>

      <!--プラグイン適用対象のDIVの配置 これのサイズがそのままCanvasのサイズになる-->
      <div id="canvasDiv" style="width:512px;height:512px;"></div>

### JavaScript - 初期化 ###
      $('#canvasDiv')
          .wbShare(userId, canvasId) //wbShareの構築。userIdとcanvasIdは通信（後述）で使用
          .wbShareSetParams({ //パラメータの設定。ペンの色・太さなどもここで設定可能。詳細は上記のDEMOを参照のこと。
              sendFunc: function(command) {  //ユーザがCanvasに対して何らかの操作を行った際に呼び出されるコールバック関数。commandはその内容を表す。
                                             //ここでWebSockeやAjaxなどによる通信をすることでユーザの操作の情報をサーバに送信できる
                  console.log(JSON.stringify(command));
              }
          });
### JavaScript - フェイズの変更 ###
      //描画
      $('#canvasDiv').wbShareSetPhase('draw');

      //選択
      $('#canvasDiv').wbShareSetPhase('select');


### JavaScript - （描画フェイズ）描画モードの変更 ###

      $('#canvasDiv').wbShareSetMode('line') //直線に変更
* 設定可能なモード / 引数
 * 直線: line
 * フリーハンド: free
 * 円: circle
 * 四角: rect
 * 文字: text
  * 描画する文字列は`$('#canvasDiv').wbShareSetText('てきすと');`で設定します。
 * 画像: img
  * 貼り付ける画像は`$('#canvasDiv').wbShareSetImg('http://www.sample.com/sample.jpg');`で画像のURLを指定します。


### JavaScript - （描画フェイズ）線の属性の変更 ###
      //線の太さ
      $('#canvasDiv').wbShareSetLineWidth(10);
      //線の色
      $('#canvasDiv').wbShareSetColor(#FF0000);

### JavaScript - （選択フェイズ）図形の削除・移動 ###

以下、2操作はCanvas上で図形をクリック / タップすることによって図形が選択されていることが前提です。

移動
* 選択されている図形をドラッグすることで図形を移動することができます

削除

      //選択されている図形を削除
      $('#canvasDiv').wbShareDelete();

AUTHOR
----------
Masanori Takano

Blog: Swarm of Trials (http://d.hatena.ne.jp/swarm_of_trials/)

LICENSE
----------
Dual licensed under the MIT and GPLv2 licenses.
