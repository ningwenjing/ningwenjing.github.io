
var type = 0,
        opacityBackground = 1,
        opacityBackgroundEnd = 1;

    //换图片
    var $btnPic = document.getElementById('btnPic')
    $btnPic.onchange = function () {
      preImg(this.id, 'media')
    }

    function preImg(sourceId, targetId) {
      var url = getFileUrl(sourceId);
      var imgPre = document.getElementById(targetId);
      imgPre.style.backgroundImage = `url(${url})`;
    }

    function getFileUrl(sourceId) {
      var url;
      if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE 
        url = document.getElementById(sourceId).value;
      } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox 
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
      } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome 
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
      }
      return url;
    }

    //换颜色
    var $media = document.getElementById("media");
    var $iptColor = document.getElementById('iptColor');
    var btn1 = $(".td-dialog-footer a").eq(0);

    $iptColor.addEventListener('change', function () {
      var chgColor = $iptColor.value;
      $media.style.backgroundImage = 'none';
      $media.style.backgroundColor = chgColor;
      skinChange(chgColor);

    })
    btn1.click(function () {
      $(".td-cover").css("display", "none");
    })


    // 换透明度

    DragBar = function (btn, bar) {
      this.btn = document.querySelector(".td-slider__button");
      this.bar = document.querySelector(".td-slider__bar");
      this.step = document.querySelector(".td-slider__bar-inner");
      this.init();
    };
    DragBar.prototype = {
      init: function () {
        var f = this,
          g = document,
          b = window,
          m = Math;
        f.btn.onmousedown = function (e) {
          var x = (e || b.event).clientX;
          var l = this.offsetLeft;
          var max = f.bar.offsetWidth - this.offsetWidth;
          g.onmousemove = function (e) {
            var thisX = (e || b.event).clientX;
            var to = m.min(max, m.max(0, l + (thisX - x)));
            f.btn.style.left = to + 'px';
            f.ondrag(m.round(m.max(0, to / max) * 100), to);
            b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
          };
          g.onmouseup = new Function('this.onmousemove=null');
        };
      },
      ondrag: function (pos, x) {
        this.step.style.width = Math.max(0, x) + 'px';
        opacityBackground = (pos / 100 * .7 + .3).toFixed(2);
        opacityBackgroundEnd = (parseFloat(opacityBackground) + 0.2).toFixed(2);
        if (type == 0) {
          document.body.style.setProperty('--browser-background-current', `rgba(255,255,255,${opacityBackground})`);
          document.body.style.setProperty('--background-body',
            `linear-gradient(rgba(255,255,255,${opacityBackground}),rgba(255,255,255,${opacityBackgroundEnd}))`);
        } else {
          document.body.style.setProperty('--browser-background-current', opacityBackground);
          document.body.style.setProperty('--background-body',
            `linear-gradient(rgba(0,0,0,${opacityBackground}),rgba(0,0,0,${opacityBackgroundEnd}))`);
          document.body.style.setProperty("--browser-background-current", `rgba(255,255,255,${opacityBackground})`)
        }
      }
    }
    new DragBar('icoPro', 'barUpgrade');


    $("#bg span").click(function () {
      var colorValue = $(this).data("color");
      var i = $(this).index();
      $(this).addClass("cur").siblings().removeClass("cur");
      
      if (i == 0) {
        type = 0;
        document.body.style.setProperty('--background-body',
        `linear-gradient(rgba(255,255,255,${opacityBackground}),rgba(255,255,255,${opacityBackgroundEnd}))`);
        document.body.style.setProperty("--browser-background-current", `rgba(255,255,255,${opacityBackground})`);
      } else {
        type = 1;
        document.body.style.setProperty('--background-body',
        `linear-gradient(rgba(0,0,0,${opacityBackground}),rgba(0,0,0,${opacityBackgroundEnd}))`);
        document.body.style.setProperty("--browser-background-current", `rgba(0,0,0,${opacityBackground}`);
      }
      console.log(opacityBackground,opacityBackgroundEnd);
    })

    $("#text span").click(function () {
      var colorValue = $(this).data("color");
      var i = $(this).index();
      $(this).addClass("cur").siblings().removeClass("cur");
      document.body.style.setProperty('--color-title', `${colorValue}`);
      if (i == 0) {
        document.body.style.setProperty('--color-sub', 'rgba(255,255,255,.6)')
      } else {
        document.body.style.setProperty('--color-sub', 'rgba(0,0,0,.6)')
      }
    })


    $(".xlx-client-operate a").eq(0).click(function () {
      $(".td-cover").css("display", "flex");
    })
    

    var listLength  = $(".xlx-skin-color li").length;
    for(i = 0 ; i< listLength; i++){
      var bg = colour[i].backgroundColor;
       $(".xlx-skin-color li").eq(i).css('background',bg)

    }

    var imgLength  = $(".xlx-skin-picture li").length;
    for(i = 0 ; i< 15; i++){
      var bg = wallpaper[i].image;
      $(".xlx-skin-picture li").eq(i).css('background-image',bg)
    }
  
    //纯色
    $(".xlx-skin-color li").click(function(){
      var i = $(this).index();
      $(this).addClass("is-chosen").siblings().removeClass("is-chosen");
      var colorValue = colour[i].colorMain;
      $media.style.backgroundImage = 'none';
      $media.style.background = colour[i].backgroundColor;
      
      skinData(colorValue,i,colour);
      //skinChange(colorValue);
    })
    
    $(".xlx-skin-picture li").click(function(){
      var i = $(this).index();
      $(this).addClass("is-chosen").siblings().removeClass("is-chosen");
      colorValue = wallpaper[i].colorIconStart;
      $media.style.backgroundColor = 'none';
      $media.style.backgroundImage = wallpaper[i].image;
      skinData(colorValue,i,wallpaper);
      skinChange(colorValue);
    })
    
    function skinData(colorValue,i,arr){
      var home = document.getElementById('homeFrame').contentWindow.document.getElementById('xlxHome');
      document.body.style.setProperty("--background-search",`${arr[i].backgroundTab}`)
      document.body.style.setProperty('--background-body',
        `linear-gradient(${arr[i].backgroundStar},${arr[i].backgroundEnd})`);
      document.body.style.setProperty('--background-progress-bar',arr[i].backgroundProgressBar);
      document.body.style.setProperty('--background-progress',arr[i].backgroundProgress);
      document.body.style.setProperty("--browser-background",`${arr[i].backgroundTab}`);
      document.body.style.setProperty("--browser-background-current", `${arr[i].backgroundStar}`);
      document.body.style.setProperty("--color-tab-text",`${arr[i].colorTabText}`);
      document.body.style.setProperty("--color-tab-text-current",`${arr[i].colorTabTextCurrent}`)
      document.body.style.setProperty('--color-text', arr[i].colorText);
      document.body.style.setProperty('--color-sub',arr[i].colorTextSub);
      document.body.style.setProperty('--color-primary', arr[i].colorMain);
      document.body.style.setProperty('--icon-color', `linear-gradient(135deg,${arr[i].colorIconStart || colorValue},${arr[i].colorIconEnd || colorValue})`);
      document.body.style.setProperty('--icon-color-hover', `linear-gradient(135deg,${colorChange(arr[i].colorIconStart||colorValue,-.1)},${colorChange(arr[i].colorIconStart||colorValue,-.3)})`);
      document.body.style.setProperty('--color-icon-oparate',`${arr[i].colorIconOperate}`);
      document.body.style.setProperty('--background-item',`linear-gradient(to right,${arr[i].backgroundItemStar},${arr[i].backgroundItemEnd}`);
      document.body.style.setProperty('--background-item-hover',`linear-gradient(to left,${arr[i].backgroundItemStar},${arr[i].backgroundItemEnd}`);

      document.body.style.setProperty('--background-drag',`${hexToRgba(arr[i].colorMain,.2)}`);
      document.body.style.setProperty('--border-drag',`${hexToRgba(arr[i].colorMain,.6)}`);

      document.body.style.setProperty('--background-side-title',`${arr[i].backgroundSideTitle}`)
      document.body.style.setProperty("--background-side-title-hover",`${arr[i].backgroundSideTitleHover}`)
      // 右侧
      home.style.setProperty('--color-text', arr[i].colorText);
      home.style.setProperty("--color-tab-text-current",`${arr[i].colorTabTextCurrent}`)
      home.style.setProperty("--background-chart",arr[i].backgroundChart);
      home.style.setProperty("--color-chart-line",arr[i].colorChartLine);
      home.style.setProperty('--color-sub',arr[i].colorTextSub);
      home.style.setProperty("--background-comment",arr[i].backgroundComment);
      home.style.setProperty("--color-detail-line",arr[i].borderComment);
      
    }
    
    //换色处理
    function skinChange(color){
    
      document.body.style.setProperty('--button-default-fill',color);
      document.body.style.setProperty('--button-default-fill-hover',colorChange(color,.2));
      document.body.style.setProperty('--button-secondary-fill',colorChange(color,.9));

      document.body.style.setProperty('--button-secondary-fill-hover',colorChange(color,.8));
      
      document.body.style.setProperty('--background-item-hover',`linear-gradient(to left,${hexToRgba(color,.2)},${hexToRgba(color,.3)}`);
      
      document.body.style.setProperty('--color-primary-hover',colorChange(color,-.1));
      document.body.style.setProperty('--color-primary-auxiliary',`${colorChange(color,.5)}`)
      document.body.style.setProperty("--slider-button-hover",`${colorChange(color,.6)}`)
      document.body.style.setProperty("--slider-button-active",`${colorChange(color,.3)}`)
      
    }


    $(".td-tabs__item").click(function(){
      i = $(this).index();
      $(this).addClass("is-active").siblings().removeClass("is-active");
      $(".td-tabs__pane").eq(i).css("display","block").siblings().css("display","none")
    })


   //颜色函数
    function colorChangeRGB(color, percent) { //rgb数值
        var f = color.split(","),t=percent<0?0:255,p = percent<0?percent*-1:percent,R = parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
        return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
    }
    function colorChangeHex(color, percent) {   //十六进制数值
        var f = parseInt(color.slice(1),16),t = percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }
    function colorChange(color, percent){ //换色函数
      if (color.length > 7 ) return colorChangeRGB(color,percent);
      else return colorChangeHex(color,percent);
   }

  //十六进制转为rgba透明度格式
  function hexToRgba(hex,x) {
      var rgb = [];
      hex = hex.substr(1);//去除前缀 # 号
      if (hex.length === 3) { // 处理 "#abc" 成 "#aabbcc"
          hex = hex.replace(/(.)/g, '$1$1');
      }
      hex.replace(/../g, function(color){
          rgb.push(parseInt(color, 0x10));//按16进制将字符串转换为数字
      });

      return "rgba(" + rgb.join(",") + ","+ x +")";
  };

  $(".td-dialog__close").click(function(){
    $(".td-cover").css("display","none");
  })
