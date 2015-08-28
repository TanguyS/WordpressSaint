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
			$(this).css
				height: "auto"

			less = 0
			if $(this).attr("data-hLess") isnt undefined
				less = parseInt($(this).attr("data-hLess"))

			hei = $(this).attr("data-fillH")

			futureHeight = (window.screenHeight * hei / 100) - less

			if $(this).attr("data-fillHMethod") isnt undefined && $(this).attr("data-fillHMethod") is "hard"
				$(this).css
					height: futureHeight

				return
			

			innerHeight = $(this).height()

			margins = 100

			if innerHeight > futureHeight
				futureHeight = innerHeight + margins * 2
				$(this).css
					height: futureHeight
			else
				$(this).css
					height: futureHeight

			return

	$(window).on "resize siteReady orientationchange documentHeightChanged articleOpen", ->
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

	# distribute children
	# ===========================================================================

	distributeChildren = () ->
		$("[data-distribute-children]").each () ->
			selector = $(this).attr("data-distribute-children")

			heightToCopy = $(this).parent().children(selector).height()

			heightElem = 0
			$(this).children().each ->
				heightElem += $(this).height()

				return

			elementsLen = $(this).children().length

			return if elementsLen is 1

			futurePadding = (heightToCopy - heightElem ) / ( elementsLen - 1)
			
			$(this).children().css
				paddingBottom: futurePadding

			$(this).children().last().css
				paddingBottom: 0

			return

		return

	distributeChildren()
	$(window).on "resize orientationchange", () ->
		distributeChildren()

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

			if $(this).width() + max > window.screenWidth
				$(this).css "width", (window.screenWidth - max)
			else
				if $(window).width() - max > baseW
					$(this).css "width", baseW
				else
					$(this).css "width", (window.screenWidth - max)

			return

		return

	maxWidth()
	$(window).on "resize orientationchange", () ->
		maxWidth()

		return



	# show and hide on click
	# ===========================================================================

	$("[data-toggle]").each () ->
		toggleTarget = $(this).data("toggle")

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



	# fill width
	###########################################################################################

	fillWidth = () ->
		$("[data-fillW]").each () ->
			w = window.screenWidth * parseInt($(this).attr("data-fillW")) / 100

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