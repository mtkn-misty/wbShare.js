/**
 * Created by JetBrains WebStorm.
 * User: mtkn
 * Date: 11/09/03
 * Time: 22:16
 * To change this template use File | Settings | File Templates.
 */
$(function() {
	$('#canvas').wbShare('hoge').wbShareSetSendFunction(function(command, options) {
		console.log(JSON.stringify(command, options))
//		//TODO: あとで消す
//		$('#drawDataDiv').html(
//			$('#drawDataDiv').html() +
//				JSON.stringify(command, options) + '<br/>'
//		);
	});
	
//描画モードの変更
	$('#select-line-width').change(function(e){
		var width = $(this).val();
		if(width === 'small') {
			$('#canvas').wbShareSetLineWidth(2);
		} else if(width === 'normal') {
			$('#canvas').wbShareSetLineWidth(8);
		} else if(width === 'large') {
			$('#canvas').wbShareSetLineWidth(16);
		} else {
			$('#canvas').wbShareSetLineWidth(40);
		}
	});
	$('input[name=shape]').change(function(e){
		$('#canvas').wbShareSetMode($('input[name=shape]:checked').val());
	});

	$('#selBtn').click(function(e) {
		$('#canvas').wbShareSetPhase('select');
	});
	$('#drwBtn').click(function(e) {
		$('#canvas').wbShareSetPhase('draw');
	});
	$('#lineBtn').click(function(e) {
		$('#canvas').wbShareSetMode('line');
	});
	$('#freeBtn').click(function(e) {
		$('#canvas').wbShareSetMode('free');
	});
	$('#rectBtn').click(function(e) {
		$('#canvas').wbShareSetMode('rect');
	});
	$('#circleBtn').click(function(e) {
		$('#canvas').wbShareSetMode('circle');
	});
	$('#textBtn').click(function(e) {
		$('#canvas').wbShareSetMode('text');
		$('#canvas').wbShareSetText($('#inputTxt').val());
	});

	$('#imgBtn').click(function(e) {
		$('#canvas').wbShareSetMode('img');
		$('#canvas').wbShareSetImg($('#pasteImg').attr('src'));
	});
	$('#lineWidthBtn').click(function(e) {
		$('#canvas').wbShareSetLineWidth($('#lineWidthTxt').val());
	});
	$('#colorBtn').click(function(e) {
		$('#canvas').wbShareSetColor($('#colorTxt').val());
	});

	$('#lineDataBtn').click(function(e) {
		//適当にデータ生成して投入する
		var receivedData = {"uid": "foo", "sid": "foo01", "command":"draw","options":{"mode":"line","color":"#ff0ff0","lineWidth":"10","points":[
			{"x":410,"y":32},
			{"x":455,"y":128},
			{"x":329,"y":47},
			{"x":329,"y":46}
		]}}

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas').wbShareDrawShape(receivedData.uid, receivedData.sid, receivedData.command, receivedData.options)
		}, 1000);
	});

	$('#freeDataBtn').click(function(e) {
		//適当にデータ生成して投入する
		var receivedData = [
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"start","points":[
				{"x":357,"y":53}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":357,"y":54}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":357,"y":55}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":357,"y":56}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":59}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":353,"y":61}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":349,"y":65}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":345,"y":70}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":343,"y":73}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":75}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":339,"y":78}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":332,"y":88}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":328,"y":94}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":325,"y":105}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":327,"y":118}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":329,"y":124}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":330,"y":130}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":332,"y":136}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":333,"y":142}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":336,"y":149}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":337,"y":157}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":339,"y":161}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":341,"y":165}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":343,"y":170}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":345,"y":177}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":347,"y":183}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":349,"y":187}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":350,"y":191}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":352,"y":195}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":354,"y":200}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":210}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":213}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":216}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":354,"y":219}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":353,"y":221}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":351,"y":224}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":349,"y":228}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":346,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":337,"y":240}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":332,"y":245}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":325,"y":249}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":317,"y":253}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":310,"y":257}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":301,"y":260}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":281,"y":267}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":271,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":260,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":245,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":239,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":226,"y":267}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":222,"y":265}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":219,"y":263}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":218,"y":261}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":216,"y":258}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":255}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":213,"y":252}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":248}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":210,"y":244}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":208,"y":239}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":206,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":203,"y":224}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":201,"y":216}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":199,"y":207}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":203}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":199}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":193}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":187}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":181}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":200,"y":176}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":200,"y":170}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":201,"y":165}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":204,"y":161}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":204,"y":158}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":204,"y":156}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":205,"y":155}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":206,"y":154}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":207,"y":154}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":207,"y":155}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":207,"y":156}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":207,"y":157}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":159}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":160}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":211,"y":162}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":164}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":213,"y":166}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":213,"y":169}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":171}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":173}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":175}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":176}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":177}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":178}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":179}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":180}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":182}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":184}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":186}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":188}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":190}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":191}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":192}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":193}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":194}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":216,"y":197}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":216,"y":199}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":217,"y":202}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":219,"y":205}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":223,"y":212}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":225,"y":215}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":228,"y":219}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":229,"y":220}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":234,"y":224}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":240,"y":229}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":247,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":254,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":259,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":264,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":269,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":274,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":279,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":285,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":290,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":295,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":296,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":299,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":303,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":307,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":309,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":311,"y":237}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":311,"y":238}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":312,"y":240}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":243}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":246}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":250}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":253}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":258}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":265}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":272}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":311,"y":279}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":311,"y":286}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":310,"y":290}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":310,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":308,"y":300}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":307,"y":305}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":304,"y":310}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":303,"y":314}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":300,"y":317}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":298,"y":320}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":296,"y":321}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":293,"y":323}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":291,"y":324}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":288,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":285,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":281,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":276,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":269,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":264,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":258,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":252,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":246,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":240,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":234,"y":323}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":229,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":226,"y":320}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":222,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":217,"y":316}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":312}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":309}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":206,"y":307}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":202,"y":303}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":196,"y":297}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":189,"y":292}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":181,"y":287}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":171,"y":281}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":161,"y":274}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":156,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":147,"y":263}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":137,"y":257}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":129,"y":252}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":123,"y":246}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":117,"y":241}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":111,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":107,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":103,"y":229}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":102,"y":229}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":100,"y":228}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":98,"y":227}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":96,"y":228}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":95,"y":228}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":92,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":89,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":86,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":82,"y":240}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":76,"y":246}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":69,"y":254}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":63,"y":262}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":57,"y":271}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":52,"y":280}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":292}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":297}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":298}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":299}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":300}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":47,"y":301}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":48,"y":301}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":49,"y":302}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":50,"y":302}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":50,"y":304}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":51,"y":305}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":51,"y":306}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":52,"y":308}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":55,"y":311}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":57,"y":312}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":60,"y":314}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":67,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":71,"y":319}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":72,"y":320}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":76,"y":321}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":80,"y":321}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":91,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":97,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":110,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":115,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":119,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":124,"y":319}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":125,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":126,"y":313}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":127,"y":310}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":303}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":298}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":290}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":278}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":127,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":125,"y":260}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":121,"y":252}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":117,"y":243}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":113,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":108,"y":219}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":108,"y":214}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":107,"y":209}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":104,"y":208}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":104,"y":205}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":106,"y":200}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":108,"y":196}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":110,"y":191}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":113,"y":180}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":115,"y":173}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":118,"y":167}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":123,"y":160}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":127,"y":154}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":133,"y":143}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":135,"y":137}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":139,"y":130}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":144,"y":124}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":148,"y":120}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":149,"y":120}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":151,"y":118}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":153,"y":117}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":154,"y":117}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":155,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":156,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":157,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":158,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":159,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":165,"y":118}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":175,"y":121}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":185,"y":128}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":194,"y":135}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":149}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":220,"y":156}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":226,"y":163}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":230,"y":170}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":184}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":190}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":194}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":200}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":206}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":232,"y":214}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":228,"y":225}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":225,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":225,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":223,"y":240}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":221,"y":245}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":219,"y":250}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":216,"y":255}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":264}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":211,"y":270}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":275}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":281}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":289}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":300}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":211,"y":306}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":310}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":314}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":317}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":217,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":218,"y":320}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":220,"y":321}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":223,"y":323}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":225,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":229,"y":326}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":232,"y":328}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":239,"y":330}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":243,"y":331}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":247,"y":332}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":251,"y":332}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":257,"y":333}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":265,"y":335}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":269,"y":335}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":284,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":293,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":300,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":307,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":314,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":323,"y":335}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":336,"y":330}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":326}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":347,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":351,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":352,"y":312}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":306}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":358,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":360,"y":288}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":362,"y":281}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":364,"y":273}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":365,"y":268}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":365,"y":263}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":365,"y":258}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":364,"y":249}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":362,"y":245}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":360,"y":242}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":360,"y":239}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":356,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":353,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":350,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":348,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":345,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":230}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":336,"y":230}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":333,"y":230}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":330,"y":230}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":324,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":323,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":322,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":237}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":244}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":248}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":251}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":253}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":255}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":323,"y":260}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":323,"y":262}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":324,"y":264}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":325,"y":266}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":326,"y":267}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":326,"y":268}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":327,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":328,"y":270}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":329,"y":271}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":329,"y":272}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":330,"y":274}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":331,"y":275}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":332,"y":277}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":333,"y":279}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":333,"y":280}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":335,"y":282}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":338,"y":287}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":340,"y":289}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":341,"y":290}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":291}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":343,"y":292}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":345,"y":293}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":346,"y":293}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":348,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":349,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":350,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":350,"y":295}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":351,"y":296}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":352,"y":297}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":353,"y":300}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":356,"y":303}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":361,"y":309}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":366,"y":316}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":370,"y":323}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":375,"y":329}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":380,"y":337}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":341}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":342}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":343}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":344}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":345}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":346}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":380,"y":347}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":378,"y":349}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":378,"y":350}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":377,"y":350}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"fin","points":[
				{"x":377,"y":350}
			]}}
		];

		//雰囲気を出すためにタイムラグをつけて描画する
		var i = 0;
		var freeDraw = function() {
			setTimeout(function() {
				if (i >= receivedData.length) {
					return;
				}
				$('#canvas').wbShareDrawShape(receivedData[i].uid, receivedData[i].sid, receivedData[i].command, receivedData[i].options)
				i++;

				freeDraw();
			}, 10);
		}
		freeDraw();

	});
	$('#rectDataBtn').click(function(e) {
		var receivedData = {"uid": "bar", "sid": "bar01", "command":"draw","options":{"mode":"rect","color":"#f00ff0","lineWidth":"5","points":[
			{"x":221,"y":148},
			{"x":404,"y":439}
		]}}

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas').wbShareDrawShape(receivedData.uid, receivedData.sid, receivedData.command, receivedData.options)
		}, 1000);
	});
	$('#circleDataBtn').click(function(e) {
		var receivedData = {"uid": "bar", "sid": "bar00", "command":"draw","options":{"mode":"circle","color":"#f00777","lineWidth":"9","points":[
			{"x":247,"y":45},
			{"x":361,"y":159}
		]}}

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas').wbShareDrawShape(receivedData.uid, receivedData.sid, receivedData.command, receivedData.options)
		}, 1000);
	});

	$('#textDataBtn').click(function(e) {
		var receivedData = {"uid":"hoge", "sid": "hoge00", "command":"draw","options":{"mode":"text","color":"#000000","font":"22px Arial","text":"hogeほげ","strokeState":"fin","points":[
			{"x":238,"y":128}
		]}};

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas').wbShareDrawShape(receivedData.uid, receivedData.sid, receivedData.command, receivedData.options)
		}, 1000);
	});

	$('#clearBarBtn').click(function(e) {
		var receivedData = {"uid": "bar", "command":"clear","options":{}}

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas').wbShareDrawShape(receivedData.uid, receivedData.sid, receivedData.command, receivedData.options)
		}, 1000);
	});
	$('#fillChk').click(function(e) {
		fillFlg = this.val();
	});

//////////////////////////////////////////////////////////////////////////////////////////
	$('#canvas2').wbShare('hoge2');

//描画モードの変更
	$('#lineBtn2').click(function(e) {
		$('#canvas2').wbShareSetMode('line');
	});
	$('#freeBtn2').click(function(e) {
		$('#canvas2').wbShareSetMode('free');
	});
	$('#rectBtn2').click(function(e) {
		$('#canvas2').wbShareSetMode('rect');
	});
	$('#circleBtn2').click(function(e) {
		$('#canvas2').wbShareSetMode('circle');
	});
	$('#textBtn2').click(function(e) {
		$('#canvas2').wbShareSetMode('text');
		$('#canvas2').wbShareSetText($('#inputTxt2').val());
	});

	$('#imgBtn2').click(function(e) {
		$('#canvas2').wbShareSetMode('img');
		$('#canvas2').wbShareSetImg($('#pasteImg2').attr('src'));
	});
	$('#lineWidthBtn2').click(function(e) {
		$('#canvas2').wbShareSetLineWidth($('#lineWidthTxt2').val());
	});
	$('#colorBtn2').click(function(e) {
		$('#canvas2').wbShareSetColor($('#colorTxt2').val());
	});

	$('#lineDataBtn2').click(function(e) {
		//適当にデータ生成して投入する
		var receivedData = {"uid": "foo", "sid": "foo00", "command":"draw","options":{"mode":"line","color":"#ff0ff0","lineWidth":"10","points":[
			{"x":410,"y":32},
			{"x":455,"y":128},
			{"x":329,"y":47},
			{"x":329,"y":46}
		]}}

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas2').wbShareDrawShape(receivedData.uid, receivedData.command, receivedData.options)
		}, 1000);
	});

	$('#freeDataBtn2').click(function(e) {
		//適当にデータ生成して投入する
		var receivedData = [
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"start","points":[
				{"x":357,"y":53}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":357,"y":54}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":357,"y":55}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":357,"y":56}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":59}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":353,"y":61}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":349,"y":65}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":345,"y":70}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":343,"y":73}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":75}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":339,"y":78}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":332,"y":88}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":328,"y":94}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":325,"y":105}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":327,"y":118}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":329,"y":124}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":330,"y":130}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":332,"y":136}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":333,"y":142}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":336,"y":149}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":337,"y":157}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":339,"y":161}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":341,"y":165}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":343,"y":170}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":345,"y":177}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":347,"y":183}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":349,"y":187}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":350,"y":191}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":352,"y":195}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":354,"y":200}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":210}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":213}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":216}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":354,"y":219}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":353,"y":221}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":351,"y":224}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":349,"y":228}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":346,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":337,"y":240}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":332,"y":245}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":325,"y":249}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":317,"y":253}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":310,"y":257}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":301,"y":260}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":281,"y":267}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":271,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":260,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":245,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":239,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":226,"y":267}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":222,"y":265}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":219,"y":263}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":218,"y":261}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":216,"y":258}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":255}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":213,"y":252}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":248}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":210,"y":244}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":208,"y":239}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":206,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":203,"y":224}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":201,"y":216}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":199,"y":207}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":203}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":199}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":193}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":187}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":197,"y":181}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":200,"y":176}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":200,"y":170}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":201,"y":165}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":204,"y":161}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":204,"y":158}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":204,"y":156}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":205,"y":155}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":206,"y":154}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":207,"y":154}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":207,"y":155}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":207,"y":156}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":207,"y":157}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":159}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":160}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":211,"y":162}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":164}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":213,"y":166}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":213,"y":169}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":171}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":173}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":175}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":176}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":177}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":178}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":179}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":180}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":182}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":184}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":186}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":188}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":190}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":191}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":192}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":193}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":194}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":216,"y":197}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":216,"y":199}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":217,"y":202}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":219,"y":205}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":223,"y":212}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":225,"y":215}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":228,"y":219}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":229,"y":220}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":234,"y":224}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":240,"y":229}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":247,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":254,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":259,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":264,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":269,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":274,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":279,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":285,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":290,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":295,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":296,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":299,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":303,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":307,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":309,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":311,"y":237}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":311,"y":238}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":312,"y":240}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":243}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":246}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":250}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":253}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":258}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":265}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":313,"y":272}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":311,"y":279}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":311,"y":286}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":310,"y":290}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":310,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":308,"y":300}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":307,"y":305}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":304,"y":310}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":303,"y":314}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":300,"y":317}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":298,"y":320}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":296,"y":321}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":293,"y":323}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":291,"y":324}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":288,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":285,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":281,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":276,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":269,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":264,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":258,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":252,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":246,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":240,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":234,"y":323}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":229,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":226,"y":320}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":222,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":217,"y":316}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":312}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":309}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":206,"y":307}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":202,"y":303}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":196,"y":297}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":189,"y":292}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":181,"y":287}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":171,"y":281}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":161,"y":274}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":156,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":147,"y":263}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":137,"y":257}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":129,"y":252}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":123,"y":246}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":117,"y":241}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":111,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":107,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":103,"y":229}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":102,"y":229}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":100,"y":228}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":98,"y":227}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":96,"y":228}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":95,"y":228}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":92,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":89,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":86,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":82,"y":240}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":76,"y":246}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":69,"y":254}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":63,"y":262}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":57,"y":271}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":52,"y":280}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":292}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":297}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":298}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":299}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":46,"y":300}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":47,"y":301}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":48,"y":301}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":49,"y":302}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":50,"y":302}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":50,"y":304}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":51,"y":305}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":51,"y":306}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":52,"y":308}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":55,"y":311}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":57,"y":312}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":60,"y":314}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":67,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":71,"y":319}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":72,"y":320}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":76,"y":321}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":80,"y":321}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":91,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":97,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":110,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":115,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":119,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":124,"y":319}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":125,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":126,"y":313}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":127,"y":310}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":303}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":298}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":290}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":128,"y":278}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":127,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":125,"y":260}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":121,"y":252}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":117,"y":243}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":113,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":108,"y":219}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":108,"y":214}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":107,"y":209}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":104,"y":208}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":104,"y":205}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":106,"y":200}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":108,"y":196}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":110,"y":191}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":113,"y":180}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":115,"y":173}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":118,"y":167}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":123,"y":160}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":127,"y":154}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":133,"y":143}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":135,"y":137}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":139,"y":130}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":144,"y":124}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":148,"y":120}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":149,"y":120}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":151,"y":118}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":153,"y":117}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":154,"y":117}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":155,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":156,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":157,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":158,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":159,"y":116}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":165,"y":118}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":175,"y":121}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":185,"y":128}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":194,"y":135}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":149}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":220,"y":156}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":226,"y":163}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":230,"y":170}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":184}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":190}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":194}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":200}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":233,"y":206}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":232,"y":214}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":228,"y":225}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":225,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":225,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":223,"y":240}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":221,"y":245}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":219,"y":250}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":216,"y":255}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":264}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":211,"y":270}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":275}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":281}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":289}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":209,"y":300}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":211,"y":306}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":212,"y":310}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":214,"y":314}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":215,"y":317}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":217,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":218,"y":320}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":220,"y":321}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":223,"y":323}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":225,"y":325}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":229,"y":326}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":232,"y":328}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":239,"y":330}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":243,"y":331}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":247,"y":332}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":251,"y":332}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":257,"y":333}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":265,"y":335}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":269,"y":335}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":284,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":293,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":300,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":307,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":314,"y":336}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":323,"y":335}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":336,"y":330}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":326}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":347,"y":322}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":351,"y":318}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":352,"y":312}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":306}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":358,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":360,"y":288}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":362,"y":281}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":364,"y":273}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":365,"y":268}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":365,"y":263}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":365,"y":258}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":364,"y":249}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":362,"y":245}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":360,"y":242}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":360,"y":239}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":356,"y":236}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":355,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":353,"y":233}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":350,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":348,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":345,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":230}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":336,"y":230}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":333,"y":230}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":330,"y":230}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":324,"y":231}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":323,"y":232}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":322,"y":235}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":237}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":244}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":248}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":251}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":253}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":321,"y":255}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":323,"y":260}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":323,"y":262}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":324,"y":264}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":325,"y":266}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":326,"y":267}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":326,"y":268}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":327,"y":269}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":328,"y":270}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":329,"y":271}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":329,"y":272}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":330,"y":274}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":331,"y":275}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":332,"y":277}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":333,"y":279}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":333,"y":280}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":335,"y":282}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":338,"y":287}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":340,"y":289}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":341,"y":290}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":342,"y":291}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":343,"y":292}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":345,"y":293}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":346,"y":293}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":348,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":349,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":350,"y":294}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":350,"y":295}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":351,"y":296}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":352,"y":297}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":353,"y":300}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":356,"y":303}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":361,"y":309}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":366,"y":316}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":370,"y":323}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":375,"y":329}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":380,"y":337}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":341}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":342}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":343}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":344}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":345}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":381,"y":346}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":380,"y":347}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":378,"y":349}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":378,"y":350}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"drawing","points":[
				{"x":377,"y":350}
			]}},
			{"uid":"foo", "sid": "foo00","command":"draw","options":{"mode":"free","color":"#0FF000","lineWidth":"4","strokeState":"fin","points":[
				{"x":377,"y":350}
			]}}
		];

		//雰囲気を出すためにタイムラグをつけて描画する
		var i = 0;
		var freeDraw = function() {
			setTimeout(function() {
				if (i >= receivedData.length) {
					return;
				}
				$('#canvas2').wbShareDrawShape(receivedData[i].uid, receivedData[i].command, receivedData[i].options)
				i++;

				freeDraw();
			}, 10);
		}
		freeDraw();

	});
	$('#rectDataBtn2').click(function(e) {
		var receivedData = {"uid": "bar", "command":"draw","options":{"mode":"rect","color":"#f00ff0","lineWidth":"5","points":[
			{"x":221,"y":148},
			{"x":404,"y":439}
		]}}

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas2').wbShareDrawShape(receivedData.uid, receivedData.command, receivedData.options)
		}, 1000);
	});
	$('#circleDataBtn2').click(function(e) {
		var receivedData = {"uid": "bar", "command":"draw","options":{"mode":"circle","color":"#f00777","lineWidth":"9","points":[
			{"x":247,"y":45},
			{"x":361,"y":159}
		]}}

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas2').wbShareDrawShape(receivedData.uid, receivedData.command, receivedData.options)
		}, 1000);
	});

	$('#textDataBtn2').click(function(e) {
		var receivedData = {"uid":"hoge","command":"draw","options":{"mode":"text","color":"#000000","font":"22px Arial","text":"hogeほげ","strokeState":"fin","points":[
			{"x":238,"y":128}
		]}};

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas2').wbShareDrawShape(receivedData.uid, receivedData.command, receivedData.options)
		}, 1000);
	});

	$('#clearBarBtn2').click(function(e) {
		var receivedData = {"uid": "bar", "command":"clear","options":{}}

		//他の作業中にも描画可能かどうかを調べるためにちょっと動作を遅らせる
		setTimeout(function() {
			$('#canvas2').wbShareDrawShape(receivedData.uid, receivedData.command, receivedData.options)
		}, 1000);
	});
	$('#fillChk2').click(function(e) {
		fillFlg = this.val();
	});

});