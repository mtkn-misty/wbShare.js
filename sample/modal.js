/**
 * モーダルダイアログを表示するためのjQueryプラグイン。
 * Require jQuery 1.7.1
 * @author Masanori Takano
 */
(function () {

	var globalDiv = $('<div id="__modalBack"></div>').on('click', function(e){e.preventDefault();});
    $.fn.extend({
    	/**
    	 * モーダルウインドウを生成する。この時点では開かす、作成のみする。
    	 */
        modalDlg: function () {

            this.each(function () {
        		var div = $(this);
        		div.addClass('modalFrame');

        		//閉じるボタンの設置
        		$('<div class="__closeBtn">×</div>').on('click', function(e){
        			div.closeModalDlg(false);
        		}).appendTo(div);
            });
            return this;
        },
        /**
         * モーダルダイアログを開く
         */
        openModalDlg: function(animeFlg) {
            this.each(function () {
                var div = $(this);
	        	if(div.hasClass('modalFrame')){
	        		//スクロールトップを0にする
	        		var scrollTop = $(window).scrollTop();
	        		
	        		//背景を貼る
	        		$('body').append(globalDiv);
	        		//スクロールー禁止する。
	        		//TODO いけてないのでスマートにしたい。
	        		$(window).on('scroll', function(e){$(this).scrollTop(scrollTop);e.preventDefault();});
	        		
	        		if(animeFlg === undefined || animeFlg === true) {
	        			div.addClass('aniOpen').css('top', scrollTop + 'px').removeClass('aniClose').addClass('show');
	        		} else {
	        			div.css('top', scrollTop + 'px').removeClass('aniClose').addClass('show');

        				//なぜか以下のようにしないとtopの位置が反映されない（webインスペクタでは表示可能）
	        			//TODO 可能ならば治したい
	        			setTimeout(function(){
	        				div.css('top', (scrollTop + 1) + 'px');
	        			}, 0);
	        		}
	        	}
            });
            return this;
        },
        /**
         * モーダルダイアログを閉じる
         */
        closeModalDlg: function(animeFlg){
            this.each(function () {
            	var div = $(this);
	        	if(div.hasClass('modalFrame')){
	        		
	        		if(animeFlg === undefined || animeFlg === true) {
	        			div.addClass('aniClose').removeClass('aniOpen').removeClass('show');
	        		} else {
	        			div.removeClass('aniOpen').removeClass('show');
	        		}
	        		//背景を除去
	        		$("#__modalBack").remove();
	        		$(window).off('scroll');
	        		
	        	}
            });	
            return this;
        }
    });

}).call(this);
