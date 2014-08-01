(function() {
  $(document).ready(function() {
    var alignOn, copyParentHW, fillHeight, hoverTimeout, setSizes, videoSizes;
    setSizes = function() {
      window.screenWidth = $(window).width();
      return window.screenHeight = (window.innerHeight ? window.innerHeight : $(window).height());
    };
    setSizes();
    $(window).resize(function() {
      return setSizes();
    });

    /*
    	window.settings = {}
    	window.settings.baseColor = "#1a1a1a"
    	window.settings.baseLightColor = "#333333"
    
    	window.settings.invertColor = "#ffffff"
    	window.settings.invertLightColor = "#eaeaea"
     */
    $('.hide').hide().removeClass('hide');
    $(".navbar-book").fadeOut().fadeIn().fadeOut().fadeIn();

    /*
    	invert = false
    	time = 400
    
    	flashBookButton = ->
    		if invert
    			$(".navbar-book").stop().animate({backgroundColor:'#ffffff'}, time)
    			$(".navbar-book .icon-square").stop().animate({backgroundColor:'#000000'}, time)
    			invert = false
    		else
    			$(".navbar-book").stop().animate({backgroundColor:'#000000'}, time)
    			$(".navbar-book .icon-square").stop().animate({backgroundColor:'#ffffff'}, time)
    			invert = true
    
    		return
    
    	i = 0
    	flashMultiple = ->
    		setTimeout ->
    			flashBookButton()
    			i++
    		
    			if i < 2
    				flashMultiple()
    		
    		, time
    
    	flashMultiple()
     */
    $("[data-slideTarget]").click(function() {
      var target;
      target = $(this).attr("data-slideTarget");
      if (target === "next") {
        if ($(this).next().is(":visible")) {
          $(this).next().slideUp();
        } else {
          $(this).next().slideDown();
        }
      }
    });
    fillHeight = function() {
      return $("[data-fillH]").each(function() {
        var hei, less;
        less = 0;
        if ($(this).attr("data-hLess").length !== 0) {
          less = parseInt($(this).attr("data-hLess"));
        }
        hei = $(this).attr("data-fillH");
        $(this).css("height", (window.screenHeight * hei / 100) - less);
      });
    };
    fillHeight();
    $(window).resize(function() {
      return fillHeight();
    });
    alignOn = function() {
      $("[data-align-on]").each(function() {
        var alignMin, fH, minLength;
        if ($(this).attr("data-align-min").length > 0) {
          alignMin = parseInt($(this).attr("data-align-min"));
        } else {
          alignMin = 0;
        }
        if ($(this).attr("data-min-width").length > 0) {
          minLength = parseInt($(this).attr("data-min-width"));
          if (minLength > window.screenWidth) {
            $(this).css("height", alignMin);
            $("#" + $(this).attr("data-align-on")).css("height", "auto");
            return;
          }
        }
        fH = $("#" + $(this).attr("data-align-on")).outerHeight();
        if (fH > alignMin) {
          $(this).css("height", fH);
        } else {
          $(this).css("height", alignMin);
          $("#" + $(this).attr("data-align-on")).css("height", alignMin);
        }
      });
    };
    alignOn();
    $(window).resize(function() {
      return alignOn();
    });
    videoSizes = function() {
      var $wrapper, futureHeight, futureWidth, over, under, wrapperHeight, wrapperWidth;
      if ($(".wp-video").length !== 0) {
        if ($(".wp-video").parents(".backgroundVideo").length === 0) {
          $(".wp-video").css({
            width: window.screenWidth,
            height: window.screenWidth * 9 / 16
          });
        } else {
          $wrapper = $(".wp-video").parents(".backgroundVideo");
          wrapperWidth = $wrapper.width();
          wrapperHeight = $wrapper.height();
          futureWidth = window.screenWidth;
          futureHeight = window.screenWidth * 9 / 16;
          over = futureWidth / futureHeight;
          under = futureHeight / futureWidth;
          if (wrapperWidth / wrapperHeight >= over) {
            $(".wp-video").css({
              width: wrapperWidth + "px",
              height: Math.ceil(under * wrapperWidth) + "px",
              marginLeft: "0px",
              marginTop: Math.abs((under * wrapperWidth) - wrapperHeight) / -2 + "px"
            });
          } else {
            $(".wp-video").css({
              width: Math.ceil(over * wrapperHeight) + "px",
              height: wrapperHeight + "px",
              marginTop: "0px",
              marginLeft: Math.abs((over * wrapperHeight) - wrapperWidth) / -2 + "px",
              maxWidth: "none"
            });
          }
        }
        $("video").css({
          width: "100%",
          height: "100%"
        });
      }
      if ($(".wp-audio").length !== 0) {
        $(".wp-audio").css({
          width: window.screenWidth,
          height: "50px"
        });
        return $("audio").css({
          width: "100%",
          height: "100%"
        });
      }
    };
    videoSizes();
    $(window).resize(function() {
      return videoSizes();
    });
    if ($(".masonry").length !== 0) {
      $(".masonry").each(function() {
        $(this).imagesLoaded((function(_this) {
          return function() {
            return $(_this).masonry({
              itemSelector: 'article'
            });
          };
        })(this));
        return;
      });
    }
    hoverTimeout = null;
    $(".hoverBox").each(function() {
      var $parent;
      $parent = $(this).parents(".relative");
      $(this).css({
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10
      });
      $parent.on("mouseenter", function() {
        var $hoverBox;
        $hoverBox = $(this).find(".hoverBox");
        $hoverBox.show();
        hoverTimeout = setTimeout((function() {
          if ($hoverBox.is(":visible")) {
            $hoverBox.fadeOut("fast");
          }
        }), 1000);
      });
      $parent.on("mouseleave", function() {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          hoverTimeout = null;
        }
        $(this).find(".hoverBox").hide();
      });
    });
    copyParentHW = function() {
      $(".copyParentWidth").each(function() {
        $(this).css("width", $(this).parent().width());
      });
      $(".copyParentHeight").each(function() {
        $(this).css("height", $(this).parent().height());
      });
    };
    copyParentHW();
    $(window).resize(function() {
      return copyParentHW();
    });
    $("#simple_subscriber input").addClass("invert-type");
    $("#simple_subscriber input[type='text']").addClass("invert-border");
    return $(window).on("mapContentLoaded", function() {
      $(".infoBubble h2, .infoBubble .links, .around, .mapPanel h2").css("border-color", window.settings.baseColor);
      return $(".mapPanel input[type='submit']").css("background-color", window.settings.baseColor);
    });
  });

}).call(this);
