$(function(){
	//判断是否支持css3
    var isCss3 = function () {
        var style = document.createElement("div").style;
        for (var k in style) {
            if (k.toLowerCase().indexOf("animation") != -1) {
                return true;
            }
        }
        return false;
    }();
    if (!isCss3)
        $("body").addClass("no_css3");


    function lottery(element,index){
    	var $this = element;
    	$this.children().hide().siblings().eq(index).show();
    	$this.children().eq(index).addClass("show");
    	setTimeout(function(){
    		$this.children().eq(index).removeClass("show");
    	},2000);
    }
    
    function carousel(element,time){
    	var $this = element;
    	var index = 0;
    	var length = $this.children().length;
    	console.log(length,$this);
    	
    	setInterval(function(){

    		if(index == length){
    			index = 0;
    		}
    		else{
    			$this.css("left",-index *170 + 'px' );
    			index++;
    		}
    	},time);
    }

    var $lottery = $("#lottery");

    $("#btn_close").click(function(){
        $("#lottery").children().show();
        $(".icebox02").addClass("closed");
        setTimeout(function(){
            $(".icebox02").removeClass("closed");
            lottery($lottery,3);
        },700);
    });
});