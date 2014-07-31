$(document).ready ->

	# Declare global vars
	###########################################################################################

	setSizes = ->
		window.screenWidth = $(window).width()
		window.screenHeight = (if window.innerHeight then window.innerHeight else $(window).height())

	setSizes()

	$(window).resize ->
		setSizes()


	# to override with customizer
	###
	window.settings = {}
	window.settings.baseColor = "#1a1a1a"
	window.settings.baseLightColor = "#333333"

	window.settings.invertColor = "#ffffff"
	window.settings.invertLightColor = "#eaeaea"
	###

	# Fix some for bootstrap
	###########################################################################################

	$('.hide').hide().removeClass('hide')



	# flash on book button
	###########################################################################################

	$(".navbar-book").fadeOut().fadeIn().fadeOut().fadeIn();

	###
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
	###



	# sliding
	###########################################################################################

	$("[data-slideTarget]").click ->
		target = $(this).attr "data-slideTarget"

		if target is "next"
			if $(this).next().is(":visible")
				$(this).next().slideUp()
			else
				$(this).next().slideDown()

		return



	# commons for height
	###########################################################################################

	fillHeight = ->
		$("[data-fillH]").each ->
			less = 0
			if ($(this).attr("data-hLess").length isnt 0) 
				less = parseInt($(this).attr("data-hLess"))

			hei = $(this).attr("data-fillH")

			$(this).css("height", (window.screenHeight * hei / 100) - less)
			return

	fillHeight()
	$(window).resize ->
		fillHeight()


	alignOn = ->
		$("[data-align-on]").each ->
			if $(this).attr("data-align-min").length > 0
				alignMin = parseInt($(this).attr("data-align-min"))
			else
				alignMin = 0


			if $(this).attr("data-min-width").length > 0
				minLength = parseInt($(this).attr("data-min-width"))
				if minLength > window.screenWidth
					$(this).css "height", alignMin
					$("#" + $(this).attr("data-align-on")).css "height", "auto"
					return


			fH = $("#" + $(this).attr("data-align-on")).outerHeight()

			if fH > alignMin
				$(this).css "height", fH
			else
			    $(this).css "height", alignMin
			    $("#" + $(this).attr("data-align-on")).css "height", alignMin

			return

		return

	alignOn()
	$(window).resize ->
		alignOn()


	# video and audio sizing
	###########################################################################################

	videoSizes = ->

		if $(".wp-video").length isnt 0
			if $(".wp-video").parents(".backgroundVideo").length is 0
				# full case
				$(".wp-video").css 
					width: window.screenWidth,
					height: window.screenWidth * 9 / 16
			else
				# background case, center video in div
				$wrapper = $(".wp-video").parents(".backgroundVideo")
				wrapperWidth = $wrapper.width()
				wrapperHeight = $wrapper.height()

				futureWidth = window.screenWidth
				futureHeight = window.screenWidth * 9 / 16

				over = futureWidth / futureHeight
				under = futureHeight / futureWidth

				if wrapperWidth / wrapperHeight >= over
				  $(".wp-video").css
				  	# maxWidth: "none",
				    width: wrapperWidth + "px"
				    height: Math.ceil(under * wrapperWidth) + "px"
				    marginLeft: "0px"
				    marginTop: Math.abs((under * wrapperWidth) - wrapperHeight) / -2 + "px"

				else
				  $(".wp-video").css
				    width: Math.ceil(over * wrapperHeight) + "px"
				    height: wrapperHeight + "px"
				    marginTop: "0px"
				    marginLeft: Math.abs((over * wrapperHeight) - wrapperWidth) / -2 + "px",
				    maxWidth: "none"
				    

			$("video").css 
				width: "100%",
				height: "100%"

		if $(".wp-audio").length isnt 0
			$(".wp-audio").css 
				width: window.screenWidth,
				height: "50px"				

			$("audio").css 
				width: "100%",
				height: "100%"


	videoSizes()
	$(window).resize ->
		videoSizes()


	# masonry
	###########################################################################################

	if $(".masonry").length isnt 0
		$(".masonry").each ->
			$(this).imagesLoaded =>
			    $(this).masonry
				    itemSelector: 'article'
				return
			return


	# hover Boxes
	###########################################################################################
	hoverTimeout = null

	$(".hoverBox").each ->
		$parent = $(this).parents(".relative")

		$(this).css
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 10

		$parent.on "mouseenter", ->
			$hoverBox = $(this).find(".hoverBox")
			$hoverBox.show()

			hoverTimeout = setTimeout (->
				if ($hoverBox.is(":visible"))
			    	$hoverBox.fadeOut("fast")
			    return
			), 1000

			return

		$parent.on "mouseleave", ->
			if hoverTimeout
				clearTimeout hoverTimeout
				hoverTimeout = null
			$(this).find(".hoverBox").hide()
			return
		return



	# copy width & height
	###########################################################################################
	copyParentHW = ->
		$(".copyParentWidth").each ->
			$(this).css "width", $(this).parent().width()
			return

		$(".copyParentHeight").each ->
			$(this).css "height", $(this).parent().height()
			return

		return

	copyParentHW()

	$(window).resize ->
		copyParentHW()



	# Modules
	###########################################################################################

	# simple subscriber
	$("#simple_subscriber input").addClass("invert-type")
	$("#simple_subscriber input[type='text']").addClass("invert-border")

	# Hotel Maps
	$(window).on "mapContentLoaded", ->
		$(".infoBubble h2, .infoBubble .links, .around, .mapPanel h2").css "border-color", window.settings.baseColor
		$(".mapPanel input[type='submit']").css "background-color", window.settings.baseColor

