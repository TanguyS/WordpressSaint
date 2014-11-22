(function() {
  var infCarousel, selectToButtons, simpleSlider;

  infCarousel = function(opts) {
    if (opts == null) {
      opts = {};
    }
    this.$wrapper = opts.$wrapper;
    this.elementSelector = opts.elementSelector;
    this.prevSelector = opts.prevSelector;
    this.nextSelector = opts.nextSelector;
    this.duration = opts.duration || 1000;
    this.easing = opts.easing || "linear";
    this.elementRatio = 0;
    this.elementWidth = 0;
    this.elementHeight = 0;
    this.elementCount = 0;
    this.$carouselWrap = null;
    this.readyCallback = opts.readyCallback || function() {};
    this.transitionCallback = opts.transitionCallback || function() {};
    this.beforeResizeCallback = opts.beforeResizeCallback || function() {};
    this.afterResizeCallback = opts.afterResizeCallback || function() {};
    this.init();
    this.setSizes();
    $(window).on("resize orientationchange", (function(_this) {
      return function() {
        _this.setSizes();
      };
    })(this));
    this.listen();
    return this.readyCallback.call();
  };

  infCarousel.prototype.init = function() {
    var $firstElement;
    this.$wrapper.find(this.elementSelector).wrapAll("<div class='carouselWrap' />");
    this.$carouselWrap = this.$wrapper.find(".carouselWrap");
    $(this.$wrapper.selector + " " + this.nextSelector + ", " + this.$wrapper.selector + " " + this.prevSelector).css({
      cursor: "pointer"
    });
    $firstElement = this.$wrapper.find(this.elementSelector).last().clone();
    this.$wrapper.find(this.elementSelector).first().before($firstElement);
    this.elementCount = this.$wrapper.find(this.elementSelector).length;
    this.elementRatio = this.$wrapper.find(this.elementSelector).width() / $(window).width();
  };

  infCarousel.prototype.setSizes = function() {
    var self;
    self = this;
    this.beforeResizeCallback.call(null, this);
    this.elementWidth = $(window).width() * this.elementRatio;
    this.elementHeight = Math.max.apply(null, this.$wrapper.find(this.elementSelector).map(function() {
      return $(this).height();
    }));
    this.$wrapper.css({
      position: "relative",
      width: $(window).width(),
      overflow: "hidden"
    });
    this.$carouselWrap.css({
      position: "absolute",
      top: 0,
      left: -this.elementWidth,
      width: this.elementWidth * this.elementCount,
      height: this.elementHeight
    });
    this.$wrapper.find(this.elementSelector).each(function(e) {
      $(this).css({
        width: self.elementWidth,
        float: "left"
      });
    });
    this.afterResizeCallback.call(null, this);
  };

  infCarousel.prototype.listen = function() {
    $(document).on("click", this.$wrapper.selector + " " + this.nextSelector, (function(_this) {
      return function() {
        _this.next();
      };
    })(this));
    $(document).on("click", this.$wrapper.selector + " " + this.prevSelector, (function(_this) {
      return function() {
        _this.prev();
      };
    })(this));
  };

  infCarousel.prototype.next = function() {
    var self;
    self = this;
    this.$carouselWrap.animate({
      left: -this.elementWidth * 2
    }, this.duration, this.easing, function() {
      var $firstElement;
      self.$wrapper.find(self.elementSelector).first().remove();
      $firstElement = self.$wrapper.find(self.elementSelector).first().clone();
      self.$carouselWrap.css({
        left: -self.elementWidth
      });
      self.$wrapper.find(self.elementSelector).last().after($firstElement);
      return self.transitionCallback.call();
    });
  };

  infCarousel.prototype.prev = function() {
    var self;
    self = this;
    this.$carouselWrap.animate({
      left: 0
    }, this.duration, this.easing, function() {
      var $firstElement;
      self.$wrapper.find(self.elementSelector).last().remove();
      $firstElement = self.$wrapper.find(self.elementSelector).last().clone();
      self.$carouselWrap.css({
        left: -self.elementWidth
      });
      self.$wrapper.find(self.elementSelector).first().before($firstElement);
      return self.transitionCallback.call();
    });
  };

  jQuery(document).ready(function($) {
    var $beginnningField, $endField, $nav, animateButton, beforeStart, calendarStyle, checkDocumentHeight, colorLuminance, currentLang, hoverTimeout, loadBookingFrame, menuW, months, navHeight, recalcMenu, replaceNav, setSizes, stickyNav, stickyTop, today, toggleNav, toggleReservationInHome, viewport, weekDays, weekDaysShort;
    setSizes = function() {
      window.screenWidth = $(window).width();
      window.screenHeight = (window.innerHeight ? window.innerHeight : $(window).height());
      if (window.screenWidth < 560) {
        return window.screenWidth = 560;
      }
    };
    setSizes();
    $(window).on("resize orientationchange", function() {
      return setSizes();
    });
    if (typeof window.settings === "undefined") {
      window.settings = {};
      window.settings.lightColor = "#ffffff";
      window.settings.darkColor = "#000000";
    }
    window.mobilecheck = (function() {
      var check;
      check = false;
      (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
          check = true;
        }
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    })();
    $('.hide').hide().removeClass('hide');
    checkDocumentHeight = function() {
      var lastHeight, newHeight, run, timer;
      lastHeight = document.body.clientHeight;
      newHeight = void 0;
      timer = void 0;
      (run = function() {
        newHeight = document.body.clientHeight;
        if (lastHeight !== newHeight) {
          $(document).trigger("documentHeightChanged");
        }
        lastHeight = newHeight;
        timer = setTimeout(run, 500);
      })();
    };
    checkDocumentHeight();
    if ($(window).width() < 800) {
      viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute('content', 'width=595');
    }
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
    $("#simple_subscriber input").addClass("light");
    $("#simple_subscriber input[type='text']").addClass("light-border");
    $("#simple_subscriber input").css({
      color: window.settings.lightColor,
      borderColor: window.settings.lightColor
    });
    $(window).on("mapContentLoaded", function() {
      $(".infoBubble h2, .infoBubble .links, .around, .mapPanel h2").css("border-color", window.settings.darkColor);
      return $(".mapPanel input[type='submit']").css("background-color", window.settings.lightColor);
    });
    if (!String.linkify) {
      String.prototype.linkify = function() {
        var emailAddressPattern, pseudoUrlPattern, urlPattern;
        urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/g;
        pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/g;
        emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/g;
        return this.replace(urlPattern, "<a href=\"$&\">$&</a>").replace(pseudoUrlPattern, "$1<a href=\"http://$2\">$2</a>").replace(emailAddressPattern, "<a href=\"mailto:$&\">$&</a>");
      };
    }
    if ($("footer .contact").length > 0) {
      $("footer .contact").html($("footer .contact").html().linkify());
    }
    menuW = 0;
    $("#navWrapper").find("a").each(function() {
      return menuW += $(this).outerWidth(true);
    });
    replaceNav = function() {
      var availW, totalW;
      totalW = $(".nav-bar").width();
      availW = totalW - $(".nav-bar .rightPart").width();
      if (menuW < availW) {
        $("#navigation").show();
        $(".hamburger").hide();
      } else {
        $(".hamburger").show();
        $("#navigation").hide();
      }
    };
    replaceNav();
    $(window).on("resize orientationchange", function() {
      replaceNav();
    });
    colorLuminance = function(hex, lum) {
      var c, i, rgb;
      hex = String(hex).replace(/[^0-9a-f]/g, "");
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;
      rgb = "#";
      c = void 0;
      i = void 0;
      i = 0;
      while (i < 3) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
        i++;
      }
      return rgb;
    };
    $('[name="adultsField"]').minimalect({
      placeholder: ""
    });
    $('[name="childrenField"]').minimalect({
      placeholder: ""
    });
    $("#reservation .minict_wrapper").addClass("light-border light");
    $("#reservation .minict_wrapper ul").addClass("dark-background");
    currentLang = $("#calendarData .locale").text();
    months = $("#calendarData .months").text().split(',');
    weekDays = $("#calendarData .weekdays").text().split(',');
    weekDaysShort = $("#calendarData .weekdaysShort").text().split(',');
    $beginnningField = $("#checkinField");
    $endField = $("#checkoutField");
    today = new Date();
    window.datepicker = new Pikaday({
      format: "YYYY-MM-DD",
      minDate: moment().toDate(),
      i18n: {
        previousMonth: 'Previous Month',
        nextMonth: 'Next Month',
        months: months,
        weekdays: weekDays,
        weekdaysShort: weekDaysShort
      },
      onSelect: function(value) {
        $(".calendarField.selected").val(this.getMoment().format("YYYY-MM-DD"));
        $(".calendarField.selected").parent().find(".textDate").text(this.getMoment().locale(currentLang).format("LL"));
        if ($(".calendars").is(":visible")) {
          $(".calendarField").removeClass("selected");
          $(".calendars").fadeOut("slow");
        }
      }
    });
    $(".calendars").append(datepicker.el);
    calendarStyle = "<style type='text/css'>" + ".pika-single { background-color: " + window.settings.lightColor + "; color: " + window.settings.darkColor + "; }" + ".pika-button { background-color: " + window.settings.lightColor + "; border-color: " + window.settings.lightColor + "; }" + ".pika-button:hover { border-color: " + colorLuminance(window.settings.darkColor, 0.5) + "; }" + ".is-disabled .pika-button, .is-disabled.is-today .pika-button { color: " + window.settings.darkColor + "; }" + ".is-selected .pika-button { background-color: " + window.settings.darkColor + "; color: " + window.settings.lightColor + "; border-color: " + window.settings.darkColor + "; }" + "</style>";
    $("head").append(calendarStyle);
    $(document).on("click", ".arrival", function() {
      var maxDate;
      $(".calendarField").removeClass("selected");
      $beginnningField.addClass("selected");
      if ($endField.val() === "") {
        maxDate = new Date("2050-01-01");
      } else {
        maxDate = new Date(Date.parse($endField.val()));
        maxDate.setDate(maxDate.getDate() - 1);
      }
      datepicker.setMinDate(new Date());
      datepicker.setMaxDate(new Date(maxDate));
      datepicker.setDate($beginnningField.val());
      $(".calendars").fadeIn("slow");
    });
    $(document).on("click", ".departure", function() {
      var minDate;
      $(".calendarField").removeClass("selected");
      $endField.addClass("selected");
      if ($beginnningField.val() === "") {
        minDate = new Date();
      } else {
        minDate = new Date(Date.parse($beginnningField.val()) + 1);
      }
      datepicker.setMinDate(minDate);
      datepicker.setMaxDate(new Date("2050-01-01"));
      datepicker.setDate($endField.val());
      $(".calendars").fadeIn("slow");
    });
    $(document).on("click", ".pika-background", function() {
      $(".calendarField").removeClass("selected");
      $(".calendars").fadeOut("slow");
    });
    $nav = $(".nav-bar");
    if ($nav.length > 0) {
      navHeight = $nav.outerHeight();
      $nav.before("<div id='nav-replace' class='part' />");
      $("#nav-replace").css({
        height: 0
      });
      stickyTop = $("#nav-replace")[0].offsetTop;
      stickyNav = function() {
        var windowTop;
        windowTop = $(window).scrollTop();
        if (stickyTop < windowTop) {
          $nav.css({
            position: "fixed",
            top: 0,
            left: 0,
            right: 0
          });
          $("#nav-replace").css({
            height: navHeight
          });
        } else {
          $nav.css("position", "relative");
          $("#nav-replace").css({
            height: 0
          });
        }
      };
      $(document).on("documentHeightChanged", function() {
        stickyTop = $("#nav-replace")[0].offsetTop;
        stickyNav();
      });
      $(window).scroll(function() {
        stickyNav();
      });
    }
    animateButton = function() {
      var $hamButton, pad, padExt;
      $hamButton = $(".hamburger");
      pad = "7px";
      padExt = "8px";
      if (!$("#navigation-down").is(":visible")) {
        $hamButton.find(".icon-bar").css({
          webkitTransition: "transform 1s",
          transition: 'transform 1s'
        });
        $hamButton.find(".icon-bar:first").css({
          msTransform: "translate(0px," + pad + ")",
          mozTransform: "translate(0px," + pad + ")",
          webkitTransform: "translate(0px," + pad + ")",
          transform: "translate(0px," + pad + ")"
        });
        setTimeout(function() {
          $hamButton.find(".icon-bar:first").css({
            msTransform: "translate(0px," + padExt + ") rotate(45deg)",
            mozTransform: "translate(0px," + padExt + ") rotate(45deg)",
            webkitTransform: "translate(0px," + padExt + ") rotate(45deg)",
            transform: "translate(0px," + padExt + ") rotate(45deg)"
          });
        }, 1000);
        $hamButton.find(".icon-bar:last").css({
          msTransform: "translate(0px,-" + pad + ")",
          mozTransform: "translate(0px,-" + pad + ")",
          webkitTransform: "translate(0px,-" + pad + ")",
          transform: "translate(0px,-" + pad + ")"
        });
        setTimeout(function() {
          $hamButton.find(".icon-bar").first().next().css({
            opacity: 0
          });
          $hamButton.find(".icon-bar:last").css({
            msTransform: "translate(0px,-" + padExt + ") rotate(-45deg)",
            mozTransform: "translate(0px,-" + padExt + ") rotate(-45deg)",
            webkitTransform: "translate(0px,-" + padExt + ") rotate(-45deg)",
            transform: "translate(0px,-" + padExt + ") rotate(-45deg)"
          });
        }, 1000);
      } else {
        $hamButton.find(".icon-bar:first").css({
          msTransform: "translate(0px," + padExt + ") rotate(0deg)",
          mozTransform: "translate(0px," + padExt + ") rotate(0deg)",
          webkitTransform: "translate(0px," + padExt + ") rotate(0deg)",
          transform: "translate(0px," + padExt + ") rotate(0deg)"
        });
        $hamButton.find(".icon-bar:last").css({
          msTransform: "translate(0px,-" + padExt + ") rotate(0deg)",
          mozTransform: "translate(0px,-" + padExt + ") rotate(0deg)",
          webkitTransform: "translate(0px,-" + padExt + ") rotate(0deg)",
          transform: "translate(0px,-" + padExt + ") rotate(0deg)"
        });
        setTimeout(function() {
          $hamButton.find(".icon-bar:first").css({
            msTransform: "translate(0px,0px) rotate(0deg)",
            mozTransform: "translate(0px,0px) rotate(0deg)",
            webkitTransform: "translate(0px,0px) rotate(0deg)",
            transform: "translate(0px,0px) rotate(0deg)"
          });
          $hamButton.find(".icon-bar").first().next().css({
            opacity: 1
          });
          return $hamButton.find(".icon-bar:last").css({
            msTransform: "translate(0px,0px) rotate(0deg)",
            mozTransform: "translate(0px,0px) rotate(0deg)",
            webkitTransform: "translate(0px,0px) rotate(0deg)",
            transform: "translate(0px,0px) rotate(0deg)"
          });
        }, 1000);
      }
    };
    toggleNav = function() {
      var $mNav;
      animateButton();
      $mNav = $("#navigation-down");
      if ($mNav.is(":visible")) {
        $mNav.hide();
      } else {
        $mNav.show();
      }
    };
    $(document).on("click", ".hamburger", function() {
      var navOffset;
      if ($("#reservation").is(":visible")) {
        $("#reservation").hide();
      }
      navOffset = $(".nav-bar")[0].offsetTop;
      if (navOffset !== 0) {
        return $("html, body").animate({
          scrollTop: navOffset
        }, 500).promise().done(function() {
          console.log("toggle");
          return toggleNav();
        });
      } else {
        return toggleNav();
      }
    });
    recalcMenu = function() {
      var lH;
      if (window.screenHeight / window.screenWidth > 1) {
        lH = ((window.screenWidth - 50) / $("#navigation-down li").length) - 25;
      } else {
        lH = ((window.screenHeight - 50) / $("#navigation-down li").length) - 25;
      }
      $("#navigation-down li").css({
        lineHeight: parseInt(lH) + "px",
        fontSize: parseInt(lH * 0.9) + "px"
      });
    };
    recalcMenu();
    $(window).on("resize orientationchange", function() {
      recalcMenu();
    });
    $("#navigation-down li").addClass("redirect");
    $("#navigation-down li a").addClass("link");
    $("#navigation-down li").css("background-color", window.settings.lightColor);
    $(document).on("mouseenter", "#navigation-down li", function() {
      $(this).animate({
        backgroundColor: window.settings.darkColor
      }, 300);
      return $(this).find("a").animate({
        color: window.settings.lightColor
      }, 300);
    });
    $(document).on("mouseleave", "#navigation-down li", function() {
      $(this).animate({
        backgroundColor: window.settings.lightColor
      }, 300);
      return $(this).find("a").animate({
        color: window.settings.darkColor
      }, 300);
    });
    beforeStart = true;
    toggleReservationInHome = function() {
      var large, menuH, resaH, sectionH, sectionTop;
      large = $(window).width() > 990;
      if (!large) {
        $("#reservation").hide();
        return;
      }
      sectionTop = $(".home .presentation")[0].offsetTop;
      sectionH = $(".home .presentation").outerHeight();
      resaH = 380;
      menuH = 46;
      $(document).on("documentHeightChanged", function() {
        sectionTop = $(".home .presentation")[0].offsetTop;
        sectionH = $(".home .presentation").outerHeight();
      });
      return $(window).scroll(function() {
        var resaVisible, topS;
        if ($(".mainBookButton").hasClass("userControlled")) {
          return;
        }
        resaVisible = $("#reservation").is(":visible");
        topS = $(window).scrollTop();
        if (topS <= sectionTop + sectionH - menuH - resaH && !resaVisible) {
          if (beforeStart) {
            $("#reservation").show();
          } else {
            $("#reservation").fadeIn();
          }
        } else if (topS > sectionTop + sectionH - menuH - resaH && resaVisible) {
          if (beforeStart) {
            $("#reservation").hide();
          } else {
            $("#reservation").fadeOut();
          }
        }
        beforeStart = false;
      });
    };
    if ($(".home").length > 0) {
      toggleReservationInHome();
      $(window).on("resize orientationchange", function() {
        toggleReservationInHome();
      });
    }
    $(".mainBookButton").on("click", function() {
      $(this).addClass("userControlled");
    });
    loadBookingFrame = function(target) {
      if ($("#bookingFrame").length > 0) {
        $("#bookingFrame").remove();
      }
      $("body").children("section").not(".part").remove();
      $("footer").before('<iframe src=' + target + ' id="bookingFrame" name="bookingFrame" frameborder="0" width="100%" scrolling="no">');
      $("#bookingFrame").iFrameResize({
        checkOrigin: false
      });
      $("footer").css("margin-top", "-10px");
    };
    $(document).on("click", ".book-room", function(e) {
      var target;
      e.preventDefault();
      target = $(this).attr("href");
      loadBookingFrame(target);
      return false;
    });
    $(document).on("click", ".promo-link", function(e) {
      var target;
      e.preventDefault();
      target = $(this).find("a.link").attr("href");
      loadBookingFrame(target);
      return false;
    });
    $(window).on("reservation", function() {
      var target;
      target = $("#booking_form").attr("action") + "?" + $("#booking_form").serialize();
      loadBookingFrame(target);
    });
  });

  jQuery(document).ready(function($) {
    var absoluteCentered, alignOn, centerIn, centerVertically, copyParentHW, equalizeHeights, fade, fillHeight, fillWidth, heightChildrenBased, maxWidth, videoSizes;
    $("[data-slideTarget]").click(function() {
      var target;
      target = $(this).attr("data-slideTarget");
      if (target === "next") {
        if ($(this).next().is(":visible")) {
          $(this).next().slideUp();
        } else {
          $(this).next().slideDown();
        }
      } else {
        if ($(target).is(":visible")) {
          $(target).slideUp();
        } else {
          $(target).slideDown();
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
        $(this).css("min-height", (window.screenHeight * hei / 100) - less);
      });
    };
    fillHeight();
    $(window).on("resize orientationchange", function() {
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
        if (typeof $(this).attr("data-min-width") !== "undefined") {
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
    $(window).on("resize orientationchange", function() {
      return alignOn();
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
    $(window).on("resize orientationchange", function() {
      copyParentHW();
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
    $(window).on("resize orientationchange", function() {
      return videoSizes();
    });
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
          if (sliderImages.length > 0) {
            $("#" + target).backstretch(sliderImages, {
              duration: 3000,
              fade: fade
            });
          }
          return;
        }
      });
    }
    centerVertically = function() {
      $("[data-centerVertically]").each(function() {
        var h, margins, minMargins, rH;
        minMargins = parseInt($(this).attr("data-centerVertically"));
        if ($(this).find(".center").length === 0) {
          $(this).wrapInner("<div class='center clearfix relative' />");
        }
        h = $(this).find(".center").height();
        if (h === 0) {
          $(this).find(".center").children().each(function() {
            h += $(this).height();
          });
          $(this).find(".center").css("height", h);
        }
        rH = $(this).height();
        margins = (rH - h) / 2;
        if (margins >= minMargins) {
          $(this).css({
            paddingTop: margins,
            paddingBottom: margins
          });
        } else {
          $(this).css({
            paddingTop: minMargins,
            paddingBottom: minMargins
          });
        }
      });
    };
    centerVertically();
    $(window).on("resize orientationchange", function() {
      centerVertically();
    });
    absoluteCentered = function() {
      $("[data-absoluteCentered]").each(function() {
        return $(this).css({
          top: "50%",
          left: "50%",
          marginLeft: -1 / 2 * $(this).outerWidth(),
          marginTop: -1 / 2 * $(this).outerHeight()
        });
      });
    };
    absoluteCentered();
    $(window).on("resize orientationchange", function() {
      absoluteCentered();
    });
    heightChildrenBased = function() {
      return $("[data-hcb]").each(function() {
        var maxHeight, selector;
        selector = $(this).data("hcb");
        maxHeight = Math.max.apply(null, $(this).find(selector).map(function() {
          return $(this).height();
        }));
        $(this).css("height", maxHeight);
      });
    };
    heightChildrenBased();
    $(window).on("resize orientationchange", function() {
      heightChildrenBased();
    });
    maxWidth = function() {
      $("[data-maxW]").each(function() {
        var baseW, max;
        baseW = $(this).attr('data-baseW');
        if (typeof baseW === "undefined" || baseW === false) {
          baseW = $(this).width();
          $(this).attr('data-baseW', baseW);
        }
        baseW = parseInt(baseW);
        max = parseInt($(this).attr("data-maxW"));
        if ($(this).width() + max > $(window).width()) {
          $(this).css("width", $(window).width() - max);
        } else {
          if ($(window).width() - max > baseW) {
            $(this).css("width", baseW);
          } else {
            $(this).css("width", $(window).width() - max);
          }
        }
      });
    };
    maxWidth();
    $(window).on("resize orientationchange", function() {
      maxWidth();
    });
    $("[data-toggleFade]").each(function() {
      var toggleTarget;
      toggleTarget = $(this).data("toggleFade");
      $(this).click(function() {
        if ($(toggleTarget).is(":visible")) {
          $(toggleTarget).fadeOut("fast");
        } else {
          $(toggleTarget).fadeIn("fast");
        }
      });
    });
    equalizeHeights = function() {
      $("[data-equalizeHeight]").each(function() {
        var maxHeight, sel;
        sel = $(this).attr("data-equalizeHeight");
        maxHeight = Math.max.apply(null, $(this).find(sel).map(function() {
          return $(this).outerHeight();
        }));
        $(this).find(sel).css({
          height: maxHeight
        });
      });
    };
    equalizeHeights();
    $(window).on("resize orientationchange", function() {
      equalizeHeights();
    });
    centerIn = function() {
      return $("[data-centerH]").each(function() {
        var containerH, mg;
        containerH = parseInt($(this).attr("data-centerH"));
        mg = (containerH - $(this).height()) / 2;
        $(this).css({
          paddingTop: mg,
          paddingBottom: mg
        });
      });
    };
    centerIn();
    $(window).on("resize orientationchange", function() {
      centerIn();
    });
    $(".dropdown").each(function() {
      var h;
      h = $(this).children().first().outerHeight() - 3;
      $(this).css({
        height: h,
        overflow: "hidden",
        display: "block"
      });
    });
    $(document).on("mouseenter", ".dropdown", function() {
      var innerHeight;
      innerHeight = $(this).children().length * $(this).children().first().outerHeight() - 3;
      $(this).stop(true, true).animate({
        height: innerHeight
      }, 300, "easeInOutQuint");
    });
    $(document).on("mouseleave", ".dropdown", function() {
      var firstH;
      firstH = $(this).children().first().outerHeight() - 3;
      $(this).stop(true, true).animate({
        height: firstH
      }, 300, "easeInOutQuint");
    });
    $(document).on("click", ".dropdown", function() {
      var firstH, innerHeight;
      firstH = $(this).children().first().outerHeight() - 3;
      if ($(this).height() === firstH) {
        innerHeight = $(this).children().length * ($(this).children().first().outerHeight() - 3);
        $(this).stop(true, true).animate({
          height: innerHeight
        }, 300, "easeInOutQuint");
      } else {
        $(this).stop(true, true).animate({
          height: firstH
        }, 300, "easeInOutQuint");
      }
    });
    fillWidth = function() {
      $("[data-fillW]").each(function() {
        var w;
        w = $(window).width() * parseInt($(this).attr("data-fillW")) / 100;
        $(this).css({
          width: w
        });
      });
    };
    fillWidth();
    $(window).on("resize orientationchange", function() {
      fillWidth();
    });
  });

  jQuery(document).ready(function($) {
    var adjustGalleryImages, fullSlider, galleryIsDone, removeAddGoUp, replaceRoomBook;
    new infCarousel({
      $wrapper: $(".home .rooms .carouselContainer"),
      elementSelector: ".room",
      prevSelector: ".arrowLeft",
      nextSelector: ".arrowRight",
      duration: 1000,
      easing: "easeInOutQuint",
      readyCallback: function() {
        return $(".home .room .backstretch").each(function() {
          var $self, images;
          $self = $(this);
          images = $.map($(this).find("img"), function(value, index) {
            return $(value).attr("src");
          });
          $(this).html("");
          return $(this).backstretch(images);
        });
      },
      beforeResizeCallback: function(ctx) {
        if ($(window).width() < 990) {
          return ctx.elementRatio = 1;
        } else {
          return ctx.elementRatio = 0.5;
        }
      }
    });
    new infCarousel({
      $wrapper: $(".home .avis .carouselContainer"),
      elementSelector: ".avi",
      prevSelector: ".arrowLeft",
      nextSelector: ".arrowRight",
      duration: 1000,
      easing: "easeInOutQuint"
    });
    galleryIsDone = false;
    adjustGalleryImages = function() {
      var c, toAdd;
      if ($(window).width() > 990) {
        if (galleryIsDone) {
          return;
        }
        toAdd = 3 - $(".galerie article").length % 3;
        if (toAdd === 0) {
          return;
        }
        c = 0;
        while (c < toAdd) {
          $(".galerie").append($(".galerie article").eq(c).clone().addClass("clone").removeClass("goUp"));
          c++;
        }
        $(".galerie article.clone .image").each(function() {
          var $self, images;
          $self = $(this);
          images = new Array();
          $(this).find("img").each(function() {
            return images.push($(this).attr("src"));
          });
          if (images.length > 0) {
            $(this).html("");
            return $(this).backstretch(images);
          }
        });
        galleryIsDone = true;
        $(window).trigger("resize");
        $(".masonry").imagesLoaded(function() {
          return $(".masonry").masonry();
        });
      } else {
        if (!galleryIsDone) {
          return;
        }
        $(".galerie article.clone").remove();
        galleryIsDone = false;
      }
    };
    if ($(".galerie").length > 0) {
      adjustGalleryImages();
      $(window).on("resize orientationchange", function() {
        adjustGalleryImages();
      });
      $(".galerie article").not(".clone").each(function() {
        $(".fullSlider").append("<li style='background-image:url(" + $(this).find("img").attr("src") + ");'></li>");
      });
      fullSlider = new simpleSlider({
        $container: $(".fullSlider"),
        selector: "li",
        rightArrow: $(".data-slider .arrowRight").attr("src"),
        leftArrow: $(".data-slider .arrowLeft").attr("src"),
        controlWidth: 100,
        controlHeight: 100
      });
      $(document).on("click", ".galerie article", function() {
        var index;
        if ($(this).hasClass("clone")) {
          index = $(this).index(".clone");
        } else {
          index = $(this).index();
        }
        fullSlider.goTo(index);
        $("html, body").css("overflow", "hidden");
        $(".fullSlider").show();
        fullSlider.showControls(false);
        fullSlider.start();
        $(window).trigger("resize");
        $(".closeSlider").show();
        return false;
      });
      $(document).on("click", ".closeSlider", function() {
        $(".fullSlider").hide();
        fullSlider.stop();
        fullSlider.hideControls(true);
        $("html, body").css("overflow", "auto");
        $(".closeSlider").hide();
        return false;
      });
    }
    if ($(".rooms").length > 0) {
      $(window).on("resize orientationchange", function() {
        $(".masonry").imagesLoaded(function() {
          return $(".masonry").masonry();
        });
      });
      replaceRoomBook = function() {
        if ($(window).width() > 990) {
          return $(".rooms .room").each(function() {
            var leftH, rightH;
            leftH = $(this).find(".left").height();
            rightH = $(this).find(".right").height();
            if (leftH + 50 < rightH) {
              return $(this).find(".book-room").css({
                marginTop: "-50px"
              });
            } else {
              return $(this).find(".book-room").css({
                marginTop: 0
              });
            }
          });
        } else {
          return $(".book-room").css({
            marginTop: 30
          });
        }
      };
      replaceRoomBook();
      $(window).on("resize orientationchange", function() {
        replaceRoomBook();
      });
    }
    $(".formWrap").find("input[type='text']").addClass("dark dark-border");
    $(".formWrap").find("textarea").addClass("dark");
    if ($(".seminarDesc").length > 0) {
      setTimeout(function() {
        return $(window).trigger("resize");
      }, 200);
      $('.seminarContact').find('[name="type"]').val($('.seminarContact [name="type"] option:first').val());
      $('.seminarContact').find('[name="type"]').minimalect({
        placeholder: $('.seminarContact [name="type"] option:first').text()
      });
      $(".seminarContact .minict_wrapper").addClass("dark-border dark");
      $(".seminarContact .minict_wrapper ul").addClass("light-background");
      new selectToButtons({
        $element: $('[name="duree"]'),
        onReady: function(ctx) {
          return $("#" + ctx.id).find(".itemContent").addClass("dark-border");
        },
        onSelect: function(ctx) {
          $("#" + ctx.id).find(".item.selected").addClass("dark-background light");
          return $("#" + ctx.id).find(".item:not(.selected)").removeClass("dark-background light");
        }
      });
      new selectToButtons({
        $element: $('[name="nombre"]'),
        onReady: function(ctx) {
          return $("#" + ctx.id).find(".itemContent").addClass("dark-border");
        },
        onSelect: function(ctx) {
          $("#" + ctx.id).find(".item.selected").addClass("dark-background light");
          return $("#" + ctx.id).find(".item:not(.selected)").removeClass("dark-background light");
        }
      });
    }
    removeAddGoUp = function() {
      var $service, hasImage, hasntImage, toggleService, w;
      toggleService = function($service, hasImage, hasntImage) {
        var c, i, j;
        for (i in hasImage) {
          c = hasImage[i];
          if ($service.eq(c).hasClass("light-background")) {
            $service.eq(c).removeClass("light-background");
          }
          $service.eq(c).addClass("light");
          $service.eq(c).find(".image").show();
        }
        for (j in hasntImage) {
          c = hasntImage[j];
          if ($service.eq(c).hasClass("light")) {
            $service.eq(c).removeClass("light");
          }
          $service.eq(c).addClass("light-background");
          $service.eq(c).find(".image").hide();
        }
      };
      w = $(window).width();
      $service = $(".highlightedServices .service");
      if (w > 990) {
        $service.eq(0).addClass("goUp");
        $service.eq(3).addClass("goUp");
        hasImage = [0, 2, 5, 6, 8, 11];
        hasntImage = [1, 3, 4, 7, 9, 10];
        toggleService($service, hasImage, hasntImage);
      } else if (w > 768) {
        $service.eq(0).addClass("goUp");
        $service.eq(3).removeClass("goUp");
        hasImage = [0, 3, 4, 7, 8, 11];
        hasntImage = [1, 2, 5, 6, 9, 10];
        toggleService($service, hasImage, hasntImage);
      } else {
        $service.eq(0).removeClass("goUp");
        $service.eq(3).removeClass("goUp");
        hasImage = [0, 2, 4, 6, 8, 10];
        hasntImage = [1, 3, 5, 7, 9, 11];
        toggleService($service, hasImage, hasntImage);
      }
    };
    if ($(".highlightedServices").length > 0) {
      removeAddGoUp();
      $(".masonry").imagesLoaded(function() {
        setTimeout(function() {
          return $(window).trigger("resize");
        }, 0);
        return $(".masonry").masonry('on', 'layoutComplete', function() {
          return $(window).trigger("resize");
        });
      });
      $(window).on("resize orientationchange", function() {
        removeAddGoUp();
      });
    }
    if ($(".contact-bandeau").length > 0) {
      $(".contact-bandeau [type='text']").addClass("light light-border");
    }
  });

  selectToButtons = function(opts) {
    if (opts == null) {
      opts = {};
    }
    this.$element = opts.$element;
    this.id = this.$element.attr("name") + parseInt(Math.random() * 1000 + 1000).toString();
    this.onReady = opts.onReady || null;
    this.onSelect = opts.onSelect || null;
    this.$wrapper = null;
    this.optionCount = 0;
    this.initialize();
    this.listen();
  };

  selectToButtons.prototype.initialize = function() {
    var $item, i, sel;
    this.$element.hide();
    this.$element.after("<div id='" + this.id + "' class='buttonsWrapper clearfix' />");
    this.$wrapper = this.$element.siblings(".buttonsWrapper").first();
    this.optionCount = this.$element.find("option").length;
    if (this.optionCount === 0) {
      console.warn("SelectToButtons: there's no option on the select. Initialization aborted.");
      return;
    }
    i = 0;
    while (i < this.optionCount) {
      this.$wrapper.append("<div class='item' />");
      $item = this.$wrapper.find(".item:last");
      $item.css({
        width: 100 / this.optionCount + "%",
        cursor: "pointer",
        float: "left"
      });
      $item.append("<div class='itemContent'>" + this.$element.find("option")[i].innerText + "</div>");
      i++;
    }
    sel = this.$element[0].selectedIndex;
    this.$wrapper.find(".item").eq(sel).addClass("selected");
    if (this.onSelect) {
      this.onSelect.call(null, this);
    }
    if (this.onReady) {
      this.onReady.call(null, this);
    }
  };

  selectToButtons.prototype.listen = function() {
    var self;
    self = this;
    $(document).on("click", "#" + this.id + " .item", function() {
      var index;
      $("#" + self.id + " .item").removeClass("selected");
      $(this).addClass("selected");
      index = $(this).index();
      self.$element.val(self.$element.find("option").eq(index).val());
      if (self.onSelect) {
        self.onSelect.call(null, self);
      }
    });
  };

  $.fn.selectToButtons = function(option) {
    return new selectToButtons({
      $element: $(this)
    });
  };

  simpleSlider = function(opts) {
    if (opts == null) {
      opts = {};
    }
    this.$container = opts.$container;
    this.selector = opts.selector;
    this.overlay = opts.overlay || null;
    this.interval = opts.interval || 5000;
    this.transition = opts.transition || 1000;
    this.onBefore = opts.onBefore || function() {};
    this.onComplete = opts.onComplete || function() {};
    this.transitionType = opts.transitionType || "fade";
    this.index = 0;
    this.controlMethod = opts.controlMethod || "mouse";
    this.rightArrow = opts.rightArrow;
    this.leftArrow = opts.leftArrow;
    this.controlWidth = opts.controlWidth;
    this.controlHeight = opts.controlHeight;
    this.length = this.$container.find(this.selector).length;
    this.$controls = null;
    this.containerWidth = opts.containerWidth || this.$container.width();
    this.containerHeight = opts.containerHeight || this.$container.height();
    this.isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
    this.timer = null;
    this.initialize();
    this.sizeIt();
    $(window).on("resize orientationchange", (function(_this) {
      return function() {
        _this.sizeIt();
      };
    })(this));
    this.createControls();
  };

  simpleSlider.prototype.initialize = function() {
    var self;
    self = this;
    this.$container.find(this.selector).each(function(e) {
      if (e !== 0) {
        $(this).hide();
      }
    });
    this.$container.find(this.selector).each(function(e) {
      $(this).css({
        position: "absolute",
        zIndex: 10,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        "-webkit-background-size": "100%",
        "-moz-background-size": "100%",
        "-o-background-size": "100%",
        "background-size": "100%",
        "-webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover",
        "background-size": "cover"
      });
      if (!self.isIOS) {
        $(this).css({
          "-webkit-background-attachment": "fixed",
          "-moz-background-attachment": "fixed",
          "-o-background-attachment": "fixed",
          "background-attachment": "fixed"
        });
      }
      if (self.isIOS) {
        setTimeout(function() {
          return $(window).trigger("resize");
        }, 500);
      }
    });
  };

  simpleSlider.prototype.sizeIt = function() {
    var hT, self, wT;
    self = this;
    wT = $(window).width();
    hT = (window.innerHeight ? window.innerHeight : $(window).height());
    if (wT < 595) {
      wT = 595;
    }
    this.containerWidth = wT;
    this.containerHeight = hT;
    this.$container.css({
      overflow: "hidden",
      width: wT,
      height: hT
    });
    if (this.$container.find(this.overlay).length > -1) {
      this.$container.find(this.overlay).css({
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 11
      });
      this.$container.find(this.overlay).css({
        marginLeft: -1 / 2 * this.$container.find(this.overlay).width(),
        marginTop: -1 / 2 * this.$container.find(this.overlay).height()
      });
    }
    this.$container.find(this.selector).each(function() {

      /*
      		if self.isIOS
      			 * simulate cover
      			w = $(this).data("width")
      			h = $(this).data("height")
      
      			over = w / h
      			under = h / w
      
      			if wT / hT >= over
      				$(this).css
      					position: "abolute"
      					width: wT + "px"
      					height: Math.ceil(under * wT) + "px"
      					left: "0px"
      					top: Math.abs((under * wT) - hT) / -2 + "px"
      
      			else
      				$(this).css
      					position: "abolute"
      					width: Math.ceil(over * hT) + "px"
      					height: body_height + "px"
      					top: "0px"
      					left: Math.abs((over * hT) - wT) / -2 + "px"
      
      		else
       */
      $(this).css({
        width: wT,
        height: hT
      });
    });
  };

  simpleSlider.prototype.createControls = function() {
    var self;
    self = this;
    if (this.length < 2) {
      return;
    }
    if (this.controlMethod === "mouse") {
      this.$container.bind("mousemove", function(e) {
        if (e.pageX < self.containerWidth / 2) {
          $(this).css("cursor", "url('" + self.leftArrow + "') " + (self.controlWidth / 2) + " " + (self.controlHeight / 2) + ", auto");
        } else {
          $(this).css("cursor", "url('" + self.rightArrow + "') " + (self.controlWidth / 2) + " " + (self.controlHeight / 2) + ", auto");
        }
      });
      $(document).on("click", this.$container[0].selector, (function(_this) {
        return function(e) {
          if (e.pageX < _this.containerWidth / 2) {
            _this.prev();
          } else {
            _this.next();
          }
          _this.stop();
        };
      })(this));
    } else {
      this.$container.append("<ul class='controls'></div>");
      this.$controls = this.$container.find(".controls");
      this.$controls.css({
        width: "100%",
        height: "100%",
        zIndex: 1000,
        position: "relative"
      });
      this.$controls.append("<div class='control left'><img src='" + this.leftArrow + "' alt='' /></div>");
      this.$controls.append("<div class='control right'><img src='" + this.rightArrow + "' alt='' /></div>");
      this.$controls.find(".control").css({
        position: "absolute",
        width: "50%",
        height: "100%",
        cursor: "pointer"
      });
      this.$controls.find(".left").css({
        left: 0
      });
      this.$controls.find(".right").css({
        right: 0
      });
      this.$controls.find(".control img").css({
        position: "absolute",
        top: "50%",
        marginTop: -1 * this.controlHeight / 2
      });
      this.$controls.find(".left img").css({
        left: 30
      });
      this.$controls.find(".right img").css({
        right: 30
      });
      $(document).on("click", this.$container.selector + " .control", (function(_this) {
        return function(e) {
          _this.stop();
          if ($(_this).hasClass("left")) {
            _this.prev();
          } else {
            _this.next();
          }
        };
      })(this));
    }
  };

  simpleSlider.prototype.hideControls = function(instant) {
    if (instant == null) {
      instant = false;
    }
    if (this.controls) {
      if (instant) {
        this.controls.hide();
      } else {
        this.controls.fadeOut("slow");
      }
    }
  };

  simpleSlider.prototype.showControls = function(instant) {
    if (instant == null) {
      instant = false;
    }
    if (this.controls) {
      if (instant) {
        this.controls.show();
      } else {
        this.controls.fadeIn("slow");
      }
    }
  };

  simpleSlider.prototype.start = function() {
    this.timer = setInterval((function(_this) {
      return function() {
        return _this.next();
      };
    })(this), this.interval);
  };

  simpleSlider.prototype.stop = function() {
    clearInterval(this.timer);
    this.timer = null;
  };

  simpleSlider.prototype.reset = function() {
    clearInterval(this.timer);
    this.$container.find(this.selector).each((function(_this) {
      return function(e) {
        if (e !== 0) {
          $(_this).hide();
        }
      };
    })(this));
    this.index = 0;
  };

  simpleSlider.prototype.next = function() {
    if (this.length < 2) {
      return;
    }
    if (this.onBefore) {
      this.onBefore.call();
    }
    if (this.transitionType === "fade") {
      this.$container.find(this.selector).eq(this.index).stop(true, true).fadeOut(this.transition);
    }
    this.index++;
    if (this.transitionType === "fade") {
      if (this.$container.find(this.selector).eq(this.index).length > 0) {
        this.$container.find(this.selector).eq(this.index).stop(true, true).fadeIn(this.transition, (function(_this) {
          return function() {};
        })(this));
      } else {
        this.index = 0;
        this.$container.find(this.selector).first().stop(true, true).fadeIn(this.transition, (function(_this) {
          return function() {};
        })(this));
        if (this.onComplete) {
          this.onComplete.call();
        }
      }
    }
  };

  simpleSlider.prototype.prev = function() {
    if (this.length < 2) {
      return;
    }
    if (this.onBefore) {
      this.onBefore.call();
    }
    if (this.transitionType === "fade") {
      this.$container.find(this.selector).eq(this.index).stop(true, true).fadeOut(this.transition);
    }
    this.index--;
    if (this.transitionType === "fade") {
      if (this.$container.find(this.selector).eq(this.index).length > 0) {
        this.$container.find(this.selector).eq(this.index).stop(true, true).fadeIn(this.transition, (function(_this) {
          return function() {};
        })(this));
        if (this.onComplete) {
          this.onComplete.call();
        }
      } else {
        this.index = this.length;
        this.$container.find(this.selector).last().stop(true, true).fadeIn(this.transition, (function(_this) {
          return function() {};
        })(this));
        if (this.onComplete) {
          this.onComplete.call();
        }
      }
    }
  };

  simpleSlider.prototype.goTo = function(index) {
    if (this.length < 2) {
      return;
    }
    if (this.onBefore) {
      this.onBefore.call();
    }
    this.$container.find(this.selector).eq(this.index).hide();
    this.index = index;
    this.$container.find(this.selector).eq(this.index).show();
    if (this.onComplete) {
      this.onComplete.call();
    }
  };

}).call(this);
