/**。
 * @author Masanori Takano
 */
(function () {
    $('.help').css('display', 'none');
    var that = this;

    //定数定義
    this.LARGE_PEN = 32;
    this.MID_PEN = 16;
    this.SMALL_PEN = 8;

    //デフォルトの状態定義
    this.state = {
        mode: 'draw',
        tool: 'freeHand',
        color: 'black',
        size: 'smallPen'
    };

    //状態定義
    this.userId = '1';
    this.groupId = '2';
    this.memoId = '3';

    this.params = {
        user_id: this.userId,
        group_id: this.groupId,
        memo_id: this.memoId,
        exercise_id: $('#exercise_id').val(),
        mode: $('#mode').val()
    };

    //画面状態定義
    this.updateScreen = function(){
        var state = that.state;
        $('#toolBox input[type=button], #pallet input[type=button]').removeClass('onBtn');
        if (state.mode === 'draw') {
            $('#colorPallet').removeClass('hidden');
            $('#controlPallet').addClass('hidden');
            $('#' + state.tool).addClass('onBtn');
            $('#' + state.color).addClass('onBtn');
            $('#' + state.size).addClass('onBtn');
        } else if (state.mode === 'select') {
            $('#colorPallet').addClass('hidden');
            $('#controlPallet').removeClass('hidden');
            $('#select').addClass('onBtn');
            $('#' + state.size).removeClass('onBtn');
            $('#' + state.tool).removeClass('onBtn');
            $('#' + state.color).removeClass('onBtn');
        }
    };


    $('#inputTextDlg, #uploadImgDlg').modalDlg();

    $('#canvasDiv').wbShare(this.userId, this.memoId).wbShareSetParams({
        mode: 'free',
        color: '#000000',
        text: '',
        lineWidth: this.SMALL_PEN,
        font: '22px Arial',
        img: null,
        sendFunc: function(command) {
            console.log(JSON.stringify(command));
        }
    });
    $('#inputTextDlg, #uploadImgDlg').modalDlg();
    $('#modalDlg').removeClass('hidden');
    updateScreen();


    //イベント定義
    $('#helpBtn').click(function(e){
        $('.help').toggle(600);
    });
    $('#select').click(function(e) {
        that.state.mode = 'select';
        that.updateScreen();
        $('#canvasDiv').wbShareSetPhase('select');
    });
    $('#delete').click(function(e) {
        that.updateScreen();
        $('#canvasDiv').wbShareDelete();
    });
    $('#line').click(function(e) {
        that.state.mode = 'draw';
        that.state.tool = 'line';
        that.updateScreen();
        $('#canvasDiv').wbShareSetMode('line')
            .wbShareSetPhase('draw');
    });
    $('#freeHand').click(function(e) {
        that.state.mode = 'draw';
        that.state.tool = 'freeHand';
        that.updateScreen();
        $('#canvasDiv').wbShareSetMode('free').wbShareSetPhase('draw');
    });
    $('#rect').click(function(e) {
        that.state.mode = 'draw';
        that.state.tool = 'rect';
        that.updateScreen();
        $('#canvasDiv').wbShareSetMode('rect').wbShareSetPhase('draw');
    });
    $('#circle').click(function(e) {
        that.state.mode = 'draw';
        that.state.tool = 'circle';
        that.updateScreen();
        $('#canvasDiv').wbShareSetMode('circle').wbShareSetPhase('draw');
    });
    $('#text').click(function(e) {
        that.state.mode = 'draw';
        that.state.tool = 'text';
        that.updateScreen();
        $('#canvasDiv').wbShareSetMode('text').wbShareSetPhase('draw');
        $('#inputTextDlg').openModalDlg();
    });
    $('#img').click(function(e) {
        that.state.mode = 'draw';
        that.state.tool = 'img';
        that.updateScreen();
        $('#canvasDiv').wbShareSetMode('img').wbShareSetPhase('draw');
        $('#uploadImgDlg').openModalDlg();
    });
    $('#fill').click(function(e) {
        that.state.mode = 'draw';
        that.updateScreen();
        $('#canvasDiv').wbShareSetMode('fill').wbShareSetPhase('draw');
    });
    $('#largePen').click(function(e) {
        that.state.size = 'largePen';
        that.updateScreen();
        $('#canvasDiv').wbShareSetLineWidth(that.LARGE_PEN).wbShareSetPhase('draw');
    });
    $('#midPen').click(function(e) {
        that.state.size = 'midPen';
        that.updateScreen();
        $('#canvasDiv').wbShareSetLineWidth(that.MID_PEN).wbShareSetPhase('draw');
    });
    $('#smallPen').click(function(e) {
        that.state.size = 'smallPen';
        that.updateScreen();
        $('#canvasDiv').wbShareSetLineWidth(that.SMALL_PEN).wbShareSetPhase('draw');
    });
    $('#black').click(function(e) {
        that.state.color = 'black';
        that.updateScreen();
        $('#canvasDiv').wbShareSetColor('#000000').wbShareSetPhase('draw');
    });
    $('#red').click(function(e) {
        that.state.color = 'red';
        that.updateScreen();
        $('#canvasDiv').wbShareSetColor('#ff0000').wbShareSetPhase('draw');
    });
    $('#yellow').click(function(e) {
        that.state.color = 'yellow';
        that.updateScreen();
        $('#canvasDiv').wbShareSetColor('#ffff00').wbShareSetPhase('draw');
    });
    $('#green').click(function(e) {
        that.state.color = 'green';
        that.updateScreen();
        $('#canvasDiv').wbShareSetColor('#00ff00').wbShareSetPhase('draw');
    });
    $('#cyan').click(function(e) {
        that.state.color = 'cyan';
        that.updateScreen();
        $('#canvasDiv').wbShareSetColor('#00ffff').wbShareSetPhase('draw');
    });
    $('#blue').click(function(e) {
        that.state.color = 'blue';
        that.updateScreen();
        $('#canvasDiv').wbShareSetColor('#0000ff').wbShareSetPhase('draw');
    });
    $('#pink').click(function(e) {
        that.state.color = 'pink';
        that.updateScreen();
        $('#canvasDiv').wbShareSetColor('#ff00ff').wbShareSetPhase('draw');
    });

    $('#inputTextBtn').on('click', function(e) {
        $('#canvasDiv').wbShareSetText($('#inputText').val());
        $('#inputTextDlg').closeModalDlg();
    });
    $('#imgBtn').on('click', function(e) {
        $('#canvasDiv').wbShareSetImg($('#imgSample').attr('src'));
        $('#uploadImgDlg').closeModalDlg();
    });

    $('#freeHandData').click(function(e){
       var data = [
           {"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"start","points":[{"x":71,"y":49}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":73,"y":46}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":71,"y":42}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":68,"y":39}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":65,"y":36}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":62,"y":34}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":54,"y":33}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":52,"y":33}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":50,"y":33}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":46,"y":33}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":43,"y":34}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":41,"y":36}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":38,"y":39}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":37,"y":41}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":37,"y":44}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":36,"y":46}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":36,"y":49}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":36,"y":53}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":36,"y":57}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":37,"y":62}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":42,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":46,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":51,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":55,"y":75}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":61,"y":80}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":65,"y":82}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":68,"y":85}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":70,"y":87}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":72,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":73,"y":93}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":73,"y":97}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":73,"y":100}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":73,"y":103}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":70,"y":106}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":65,"y":108}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":60,"y":110}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":52,"y":111}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":47,"y":111}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":40,"y":111}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":36,"y":111}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":31,"y":109}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":28,"y":105}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":26,"y":102}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":24,"y":98}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":24,"y":97}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":24,"y":96}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241428636","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"fin","points":[{"x":24,"y":96}],"stPoint":{"x":24,"y":33},"size":{"width":49,"height":78}}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"start","points":[{"x":141,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":141,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":141,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":141,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":139,"y":68}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":136,"y":66}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":132,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":126,"y":63}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":120,"y":62}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":115,"y":62}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":110,"y":62}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":105,"y":63}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":101,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":100,"y":66}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":97,"y":68}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":96,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":95,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":95,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":94,"y":75}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":93,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":91,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":91,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":91,"y":93}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":91,"y":95}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":94,"y":98}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":96,"y":99}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":100,"y":100}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":104,"y":101}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":108,"y":101}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":113,"y":101}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":118,"y":100}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":122,"y":99}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":125,"y":97}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":128,"y":95}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":129,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":130,"y":92}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":131,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":131,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":132,"y":86}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":132,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":132,"y":83}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":133,"y":81}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":134,"y":80}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":134,"y":81}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":134,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":134,"y":86}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":134,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":134,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":135,"y":91}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":136,"y":92}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":136,"y":93}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":138,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":139,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":141,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":142,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":143,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":144,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":145,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":147,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":148,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":149,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241431049","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"fin","points":[{"x":149,"y":94}],"stPoint":{"x":91,"y":62},"size":{"width":58,"height":39}}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"start","points":[{"x":173,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":173,"y":93}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":173,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":173,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":174,"y":81}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":174,"y":78}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":175,"y":76}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":175,"y":74}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":175,"y":73}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":175,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":176,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":177,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":178,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":178,"y":66}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":178,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":179,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":180,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":181,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":183,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":184,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":186,"y":66}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":188,"y":68}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":192,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":195,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":197,"y":74}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":198,"y":76}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":199,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":199,"y":78}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":199,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":199,"y":80}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":199,"y":81}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":200,"y":82}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":200,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":200,"y":86}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":200,"y":87}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":201,"y":89}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":201,"y":91}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":201,"y":92}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":201,"y":93}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":201,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":202,"y":93}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":202,"y":92}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":202,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":203,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":203,"y":80}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":204,"y":75}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":205,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":205,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":205,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":205,"y":68}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":206,"y":68}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":207,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":208,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":209,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":211,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":213,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":215,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":216,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":218,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":218,"y":68}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":218,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":219,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":219,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":220,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":220,"y":73}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":221,"y":75}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":221,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":221,"y":78}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":222,"y":80}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":222,"y":81}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":223,"y":82}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":223,"y":83}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":224,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":224,"y":85}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":225,"y":85}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":226,"y":85}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":227,"y":86}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":227,"y":87}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":227,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":227,"y":89}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":227,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":227,"y":91}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":228,"y":91}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":228,"y":92}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241434279","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"fin","points":[{"x":228,"y":92}],"stPoint":{"x":173,"y":65},"size":{"width":55,"height":29}}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"start","points":[{"x":246,"y":60}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":246,"y":61}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":246,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":246,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":246,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":246,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":247,"y":91}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":247,"y":97}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":248,"y":105}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":249,"y":110}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":250,"y":115}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":251,"y":119}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":252,"y":123}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":253,"y":126}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":254,"y":129}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":255,"y":132}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":255,"y":134}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":255,"y":135}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":256,"y":135}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241440363","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"fin","points":[{"x":256,"y":135}],"stPoint":{"x":246,"y":60},"size":{"width":10,"height":75}}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"start","points":[{"x":243,"y":57}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":244,"y":57}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":248,"y":57}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":252,"y":57}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":255,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":258,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":261,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":264,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":266,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":268,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":271,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":276,"y":57}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":279,"y":58}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":281,"y":59}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":283,"y":59}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":284,"y":60}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":285,"y":61}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":63}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":66}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":74}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":76}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":82}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":286,"y":83}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":284,"y":85}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":282,"y":87}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":279,"y":89}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":276,"y":91}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":273,"y":92}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":271,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":269,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":268,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":267,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":265,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":262,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":259,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":256,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":254,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":253,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"drawing","points":[{"x":252,"y":94}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241442153","cmd":"draw","opt":{"mode":"free","color":"#000000","lineWidth":8,"strokeState":"fin","points":[{"x":252,"y":94}],"stPoint":{"x":243,"y":56},"size":{"width":43,"height":38}}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"start","points":[{"x":310,"y":32}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":310,"y":35}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":310,"y":44}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":310,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":310,"y":62}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":311,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":312,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":312,"y":82}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":312,"y":85}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":313,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":314,"y":92}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":314,"y":96}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":314,"y":99}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":315,"y":103}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":315,"y":105}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"drawing","points":[{"x":315,"y":106}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241448256","cmd":"draw","opt":{"mode":"free","color":"#0000ff","lineWidth":8,"strokeState":"fin","points":[{"x":315,"y":106}],"stPoint":{"x":310,"y":32},"size":{"width":5,"height":74}}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"start","points":[{"x":329,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":330,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":331,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":332,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":333,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":334,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":334,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":335,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":336,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":337,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":339,"y":77}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":342,"y":76}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":345,"y":75}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":347,"y":74}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":350,"y":73}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":351,"y":72}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":353,"y":71}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":354,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":355,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":355,"y":66}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":64}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":63}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":62}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":61}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":60}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":59}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":57}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":55}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":356,"y":55}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":356,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":355,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":354,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":352,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":351,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":350,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":348,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":346,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":343,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":341,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":340,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":339,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":338,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":337,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":336,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":335,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":334,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":333,"y":54}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":332,"y":55}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":330,"y":56}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":330,"y":57}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":328,"y":58}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":328,"y":59}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":327,"y":60}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":327,"y":61}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":327,"y":62}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":64}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":65}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":67}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":68}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":69}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":70}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":71}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":73}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":75}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":326,"y":76}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":328,"y":78}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":329,"y":79}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":329,"y":80}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":329,"y":81}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":330,"y":82}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":331,"y":83}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":331,"y":84}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":332,"y":85}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":333,"y":85}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":334,"y":87}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":335,"y":87}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":335,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":336,"y":88}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":337,"y":89}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":338,"y":89}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":339,"y":89}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":341,"y":89}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":343,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":344,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":346,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":348,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":350,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":352,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":353,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":354,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":355,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":356,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":357,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":358,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":359,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":360,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"drawing","points":[{"x":361,"y":90}]}}}
           ,{"uid":"1","tid":"3","wbSh":{"sid":"1_1341241451405","cmd":"draw","opt":{"mode":"free","color":"#ff00ff","lineWidth":8,"strokeState":"fin","points":[{"x":361,"y":90}],"stPoint":{"x":326,"y":54},"size":{"width":35,"height":36}}}}
       ];

        var i = 0;
        var freeDraw = function () {
            setTimeout(function () {
                if (i >= data.length) {
                    return;
                }
                $('#canvasDiv').wbShareDrawShape(data[i].uid, data[i].tid, data[i].wbSh);
                i++;

                freeDraw();
            }, 10);
        }
        freeDraw();
    });

    $('body').css('display', 'block');
})();
