(function() {
  $(document).ready(function() {
    var checks, i, maxDate, minDate, _results;
    $(".booking-field").each(function(e) {
      var wid;
      wid = $(this).find(".booking-label p").width();
      $(this).find(".booking-label").css({
        width: wid + 10
      });
      return $(this).find(".booking-input, .booking-input input").css({
        width: 240 - wid - 35
      });
    });
    checks = ["checkin", "checkout"];
    minDate = null;
    maxDate = null;
    _results = [];
    for (i in checks) {
      _results.push((function() {
        var check, day, indate, maxdate, month, monthNames;
        check = checks[i];
        indate = new Date;
        indate.setHours(0);
        indate.setMinutes(0);
        indate.setSeconds(0);
        indate.setMilliseconds(0);
        if (check === "checkout") {
          indate.setDate(indate.getDate() + 2);
        }
        if (check === "checkin") {
          minDate = indate;
        } else {
          maxDate = indate;
        }
        maxdate = (new Date).getTime() + 314496e5;
        maxdate = new Date(maxdate);
        $("#" + check).datepicker({
          changeMonth: true,
          changeYear: true,
          altField: "#" + check + "Field",
          minDate: indate,
          maxDate: maxdate,
          beforeShowDay: function(date) {
            if (minDate && maxDate) {
              if (date >= minDate && date <= maxDate) {
                return [true, 'date-chosen'];
              }
            }
            return [true, 'date-unchosen'];
          },
          onSelect: function(value, elt) {
            var date, day, humanMonth, month, monthNames, year;
            monthNames = elt.input.datepicker("option", "monthNames");
            date = $(this).datepicker('getDate');
            day = date.getDate();
            month = date.getMonth();
            humanMonth = month + 1;
            year = date.getFullYear();
            if (check === "checkin") {
              $("#checkout").datepicker("option", "minDate", date);
              minDate = date;
            } else {
              maxDate = date;
            }
            if (minDate > maxDate) {
              $("#checkout").datepicker("setDate", minDate);
              maxDate = minDate;
              $(".checkout .month").text(monthNames[month]);
              $(".checkout .number").text(day);
            }
            $("." + check + " .month").text(monthNames[month]);
            $("." + check + " .number").text(day);
            $(this).hide();
            $(".controls").show();
          }
        });
        $("#" + check).hide();
        $("#" + check).datepicker("setDate", indate);
        monthNames = $("#" + check).datepicker("option", "monthNames");
        day = indate.getDate();
        month = indate.getMonth();
        $("." + check + " .month").text(monthNames[month]);
        $("." + check + " .number").text(day);
        if (check === "checkin") {
          $("#checkout").datepicker("option", "minDate", indate);
        }
        return $("." + check).click(function(e) {
          $("#" + check).datepicker("refresh");
          $("#" + check).show();
          return $(".controls").hide();
        });
      })($("#" + checks[i])));
    }
    return _results;
  });

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

  $(document).ready(function() {
    var setMenuMinHeight;
    $("[data-target='#navigation']").bigSlide({
      menu: "#navigation",
      side: "right",
      push: ".push",
      menuWidth: "300px"
    });
    $("[data-target='#book']").bigSlide({
      menu: "#book",
      side: "left",
      push: ".push",
      menuWidth: "300px"
    });
    $(document).on("mouseenter", "#primaryNavBar li", function() {
      $(this).css({
        backgroundColor: window.settings.invertColor
      });
      $(this).find("a").css({
        color: window.settings.baseColor
      });
    });
    $(document).on("mouseleave", "#primaryNavBar li", function() {
      $(this).css({
        backgroundColor: window.settings.baseColor
      });
      $(this).find("a").css({
        color: window.settings.invertColor
      });
    });
    setMenuMinHeight = function() {
      var $navigation, langHeight, menuHeight, socialHeight;
      $navigation = $("#navWrapper");
      langHeight = $navigation.find("#lang-selector").outerHeight();
      menuHeight = $navigation.find("#primaryNavBar").outerHeight();
      socialHeight = $navigation.find("#social").outerHeight() + 80;
      $navigation.css({
        minHeight: langHeight + menuHeight + socialHeight,
        height: "100%"
      });
    };
    setMenuMinHeight();
    return $(window).resize(function() {
      return setMenuMinHeight();
    });
  });

  $(document).ready(function() {
    var clickOnTitle;
    clickOnTitle = function(ctx, open) {
      if (open) {
        ctx.find(".toggle-room .line span:nth-child(2)").removeClass("visibility-hidden");
        ctx.stop().animate({
          backgroundColor: window.settings.baseColor
        }, 300);
        ctx.find("h2").stop().animate({
          color: window.settings.invertColor
        }, 300);
        ctx.find(".cross span").stop().animate({
          backgroundColor: window.settings.invertColor
        }, 300);
        ctx.find(".book-link a").stop().animate({
          color: window.settings.invertColor
        }, 300);
      } else {
        ctx.find(".toggle-room .line span:nth-child(2)").addClass("visibility-hidden");
        ctx.stop().animate({
          backgroundColor: window.settings.invertColor
        }, 300);
        ctx.find("h2").stop().animate({
          color: window.settings.baseColor
        }, 300);
        ctx.find(".cross span").stop().animate({
          backgroundColor: window.settings.baseColor
        }, 300);
        ctx.find(".book-link a").stop().animate({
          color: window.settings.baseColor
        }, 300);
      }
    };
    return $(".room-title").click(function() {
      if ($(this).parents("section").find(".room-slider").is(":hidden")) {
        $(".room-slider:visible").each(function() {
          $(this).slideUp();
          clickOnTitle($(this).parents("section").find(".room-title"), false);
        });
        clickOnTitle($(this), true);
        $(this).parents("section").find(".room-slider .slider img").hide();
        $(this).parents("section").find(".room-slider .slider").backstretch("resume");
        $(this).parents("section").find(".backstretch").css("width", screenWidth);
        $(this).parents("section").find(".room-slider").slideDown("slow", (function(_this) {
          return function() {
            var titleOffset;
            titleOffset = $(_this).parents(".room")[0].offsetTop;
            return $("html, body").animate({
              scrollTop: titleOffset
            }, 600);
          };
        })(this));
      } else {
        $(this).parents("section").find(".room-slider").slideUp();
        clickOnTitle($(this), false);
      }
      return true;
    });
  });

  $(document).ready(function() {
    var fade;
    fade = 750;
    if ($(".slider-data").length !== 0) {
      $(".slider-data").each(function() {
        var sliderImages, target;
        target = $(this).attr("data-target");
        if (typeof target !== "undefined") {
          sliderImages = [];
          $(this).find("img").each(function() {
            return sliderImages.push($(this).attr("src"));
          });
          $("#" + target).backstretch(sliderImages, {
            duration: 3000,
            fade: fade
          });
          return;
        }
      });
    }
    if ($(".slider-info").length !== 0) {
      $(".slider-info li").hide().first().show();
      return $(window).on("backstretch.before", function(e, instance, index) {
        $(".slider-info li:visible").fadeOut(fade);
        $(".slider-info li").eq(index).fadeIn(fade);
      });
    }
  });

}).call(this);
