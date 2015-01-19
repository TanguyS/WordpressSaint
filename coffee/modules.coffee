jQuery(document).ready ($) ->
	# sliding
	###########################################################################################

	$("[data-slideTarget]").click ->
		target = $(this).attr "data-slideTarget"

		if target is "next"
			if $(this).next().is(":visible")
				$(this).next().slideUp()
			else
				$(this).next().slideDown()
		else
			if $(target).is(":visible")
				$(target).slideUp()
			else
				$(target).slideDown()

		return



	# commons for height
	###########################################################################################

	fillHeight = ->
		$("[data-fillH]").each ->
			less = 0
			if ($(this).attr("data-hLess").length isnt 0) 
				less = parseInt($(this).attr("data-hLess"))

			hei = $(this).attr("data-fillH")

			$(this).css("min-height", (window.screenHeight * hei / 100) - less)
			return

	fillHeight()
	$(window).on "resize orientationchange", ->
		fillHeight()


	alignOn = ->
		$("[data-align-on]").each ->
			if $(this).attr("data-align-min").length > 0
				alignMin = parseInt($(this).attr("data-align-min"))
			else
				alignMin = 0


			if typeof $(this).attr("data-min-width") isnt "undefined"
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
	$(window).on "resize orientationchange", ->
		alignOn()



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

	$(window).on "resize orientationchange", ->
		copyParentHW()

		return



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
	$(window).on "resize orientationchange", ->
		videoSizes()



	# Slider
	# =============================================================================
	fade = 750
	if ($(".slider-data").length isnt 0)

		$(".slider-data").each ->
			target = $(this).attr "data-target"

			if (typeof target isnt "undefined")
				sliderImages = []
				$(this).find("img").each ->
					sliderImages.push $(this).attr("src")

				if (sliderImages.length > 0)
					$("#" + target).backstretch sliderImages,
					  	duration: 3000
					  	fade: fade

				return
			return



	# center vertically
	# ===========================================================================

	centerVertically = () ->
		$("[data-centerVertically]").each () ->
			minMargins = parseInt( $(this).attr("data-centerVertically") )

			if ($(this).find(".center").length is 0)
				$(this).wrapInner("<div class='center clearfix relative' />")

			h = $(this).find(".center").height()
			if (h == 0)
				$(this).find(".center").children().each () ->
					h += $(this).height()
					return
				$(this).find(".center").css "height", h

			rH = $(this).height()

			margins = (rH - h) / 2

			if margins >= minMargins
				$(this).css
					paddingTop: margins
					paddingBottom: margins
			else
				$(this).css
					paddingTop: minMargins
					paddingBottom: minMargins

			return

		return

	centerVertically()
	$(window).on "resize orientationchange", () ->
		centerVertically()

		return


	# center
	# ===========================================================================
	absoluteCentered = () ->
		$("[data-absoluteCentered]").each () ->
			$(this).css
				top: "50%"
				left: "50%"
				marginLeft: -1/2 * $(this).outerWidth()
				marginTop: -1/2 * $(this).outerHeight()

		return

	absoluteCentered()
	$(window).on "resize orientationchange", () ->
		absoluteCentered()

		return

	# height based on inner elements
	# ===========================================================================
	heightChildrenBased = () ->
		$("[data-hcb]").each () ->
			selector = $(this).data("hcb")

			maxHeight = Math.max.apply(null, $(this).find(selector).map () ->
			   return $(this).height()
			)

			$(this).css "height", maxHeight

			return

	heightChildrenBased()
	$(window).on "resize orientationchange", () ->
		heightChildrenBased()

		return


	# max width with pixels
	# ===========================================================================
	maxWidth = () ->
		$("[data-maxW]").each () ->
			baseW = $(this).attr('data-baseW')

			if typeof baseW is "undefined" or baseW is false
				baseW = $(this).width()
				$(this).attr('data-baseW', baseW)

			baseW = parseInt( baseW )

			max = parseInt( $(this).attr("data-maxW") )

			if $(this).width() + max > $(window).width()
				$(this).css "width", ($(window).width() - max)
			else
				if $(window).width() - max > baseW
					$(this).css "width", baseW
				else
					$(this).css "width", ($(window).width() - max)

			return

		return

	maxWidth()
	$(window).on "resize orientationchange", () ->
		maxWidth()

		return



	# show and hide on click
	# ===========================================================================

	$("[data-toggleFade]").each () ->
		toggleTarget = $(this).data("toggleFade")

		$(this).click () ->
			if $(toggleTarget).is(":visible")
				$(toggleTarget).fadeOut("fast")
			else
				$(toggleTarget).fadeIn("fast")

			return

		return



	# equalize heights
	###########################################################################################

	equalizeHeights = () ->
		$("[data-equalizeHeight]").each () ->
			sel = $(this).attr("data-equalizeHeight")

			maxHeight = Math.max.apply(null, $(this).find(sel).map () ->
			   return $(this).outerHeight()
			)

			$(this).find(sel).css
				height: maxHeight

			return

		return

	equalizeHeights()

	$(window).on "resize orientationchange", () ->
		equalizeHeights()
		return


	# center in container
	###########################################################################################

	centerIn = () ->
		$("[data-centerH]").each () ->
			containerH = parseInt($(this).attr("data-centerH"))

			mg = (containerH - $(this).height()) / 2

			$(this).css
				paddingTop: mg
				paddingBottom: mg

			return


	centerIn()

	$(window).on "resize orientationchange", () ->
		centerIn()
		return


	# dropdown on hover
	###########################################################################################
	$(".dropdown").each () ->
		h = $(this).children().first().outerHeight() - 3

		$(this).css
			height: h
			overflow: "hidden"
			display: "block"

		return

	$(document).on "mouseenter", ".dropdown", () ->
		innerHeight = $(this).children().length * $(this).children().first().outerHeight() - 3

		$(this).stop(true, true).animate
			height: innerHeight
		, 300, "easeInOutQuint"

		return

	$(document).on "mouseleave", ".dropdown", () ->
		firstH = $(this).children().first().outerHeight() - 3

		$(this).stop(true, true).animate
			height: firstH
		, 300, "easeInOutQuint"

		return

	$(document).on "click", ".dropdown", () ->
		firstH = $(this).children().first().outerHeight() - 3

		if $(this).height() == firstH
			innerHeight = $(this).children().length * ($(this).children().first().outerHeight() - 3)

			$(this).stop(true, true).animate
				height: innerHeight
			, 300, "easeInOutQuint"
		else
			$(this).stop(true, true).animate
				height: firstH
			, 300, "easeInOutQuint"


		return



	# fill width
	###########################################################################################

	fillWidth = () ->
		$("[data-fillW]").each () ->
			w = $(window).width() * parseInt($(this).attr("data-fillW")) / 100

			$(this).css
				width: w

			return

		return

	fillWidth()

	$(window).on "resize orientationchange", () ->
		fillWidth()
		return
	

	# masonry
	###########################################################################################

	if $(".masonry").length isnt 0
		$(".masonry").each ->
			$(this).imagesLoaded =>
			    $(this).masonry
				    itemSelector: 'article'
				return
			return

			
	
	return