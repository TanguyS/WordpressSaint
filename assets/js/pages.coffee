jQuery(document).ready ($) ->

	# Home
	# ---------------------------------------------------------------

	# instantiate room carousel
	new infCarousel
		$wrapper: $(".home .rooms .carouselContainer")
		elementSelector: ".room"
		prevSelector: ".arrowLeft"
		nextSelector: ".arrowRight"
		duration: 1000
		easing: "easeInOutQuint"
		readyCallback: ->
			$(".home .room .backstretch").each ->
				$self = $(this)
				images = $.map $(this).find("img"), (value, index) ->
					$(value).attr("src")
				$(this).html("")
				$(this).backstretch images
		beforeResizeCallback: (ctx)->
			if $(window).width() < 990
				ctx.elementRatio = 1
			else
				ctx.elementRatio = 0.5

	# instantiate avis carousel
	new infCarousel
		$wrapper: $(".home .avis .carouselContainer")
		elementSelector: ".avi"
		prevSelector: ".arrowLeft"
		nextSelector: ".arrowRight"
		duration: 1000
		easing: "easeInOutQuint"






	# Gallery
	# ---------------------------------------------------------------

	# adjust number of images
	galleryIsDone = false
	adjustGalleryImages = () ->
		if $(window).width() > 990
			if galleryIsDone
				return

			toAdd = 3 - $(".galerie article").length % 3

			if toAdd is 0
				return

			c = 0
			while c < toAdd
				$(".galerie").append( $(".galerie article").eq(c).clone().addClass("clone").removeClass("goUp") )

				c++

			$(".galerie article.clone .image").each ->
				$self = $(this)
				images = new Array()
				$(this).find("img").each ->
					images.push( $(this).attr("src") )

				if images.length > 0
					$(this).html("")
					$(this).backstretch images

			galleryIsDone = true

			$(window).trigger "resize"

			$(".masonry").imagesLoaded () ->
				$(".masonry").masonry()

		else
			if !galleryIsDone
				return

			$(".galerie article.clone").remove()

			galleryIsDone = false
		
		return

	if $(".galerie").length > 0
		adjustGalleryImages()

		$(window).on "resize orientationchange", () ->
			adjustGalleryImages()
			return


		# create a slider
		$(".galerie article").not(".clone").each () ->
			$(".fullSlider").append("<li style='background-image:url(" + $(this).find("img").attr("src") + ");'></li>")

			return

		fullSlider = new simpleSlider
			$container: $(".fullSlider")
			selector: "li"
			rightArrow: $(".data-slider .arrowRight").attr("src")
			leftArrow: $(".data-slider .arrowLeft").attr("src")
			controlWidth: 100
			controlHeight: 100


		$(document).on "click", ".galerie article", () ->
			if $(this).hasClass("clone")
				index = $(this).index(".clone")
			else
				index = $(this).index()

			fullSlider.goTo(index)

			$("html, body").css "overflow", "hidden"

			$(".fullSlider").show()

			fullSlider.showControls(false)
			fullSlider.start()

			$(window).trigger "resize"

			$(".closeSlider").show()

			false

		$(document).on "click", ".closeSlider", () ->
			$(".fullSlider").hide()
			fullSlider.stop()
			fullSlider.hideControls(true)
			$("html, body").css "overflow", "auto"
			$(".closeSlider").hide()

			false


	# Rooms
	# ---------------------------------------------------------------
	if $(".rooms").length > 0
		# fix some layouts problem with masonry
		$(window).on "resize orientationchange", () ->
			$(".masonry").imagesLoaded () ->
				$(".masonry").masonry()
			return

		# replace book button
		replaceRoomBook = () ->
			if $(window).width() > 990
				$(".rooms .room").each () ->
					leftH = $(this).find(".left").height()
					rightH = $(this).find(".right").height()

					if leftH + 50 < rightH
						$(this).find(".book-room").css
							marginTop: "-50px"
					else
						$(this).find(".book-room").css
							marginTop: 0

			else
				$(".book-room").css
					marginTop: 30


		replaceRoomBook()
		$(window).on "resize orientationchange", () ->
			replaceRoomBook()
			return



	# Seminar
	# ---------------------------------------------------------------

	$(".formWrap").find("input[type='text']").addClass("dark dark-border")
	$(".formWrap").find("textarea").addClass("dark")

	if $(".seminarDesc").length > 0
		setTimeout () ->
			$(window).trigger "resize"
		, 200

		$('.seminarContact').find('[name="type"]' ).val($('.seminarContact [name="type"] option:first').val());

		$('.seminarContact').find('[name="type"]' ).minimalect
			placeholder: $('.seminarContact [name="type"] option:first').text()

		$(".seminarContact .minict_wrapper").addClass("dark-border dark")
		$(".seminarContact .minict_wrapper ul").addClass("light-background")

		new selectToButtons
			$element: $('[name="duree"]')
			onReady: (ctx) ->
				$("#" + ctx.id).find(".itemContent").addClass("dark-border")
			onSelect: (ctx) ->
				$("#" + ctx.id).find(".item.selected").addClass("dark-background light")
				$("#" + ctx.id).find(".item:not(.selected)").removeClass("dark-background light")

		new selectToButtons
			$element: $('[name="nombre"]')
			onReady: (ctx) ->
				$("#" + ctx.id).find(".itemContent").addClass("dark-border")
			onSelect: (ctx) ->
				$("#" + ctx.id).find(".item.selected").addClass("dark-background light")
				$("#" + ctx.id).find(".item:not(.selected)").removeClass("dark-background light")



	# Services
	# ---------------------------------------------------------------

	removeAddGoUp = () ->
		toggleService = ($service, hasImage, hasntImage) ->
			for i of hasImage
				c = hasImage[i]
				if $service.eq(c).hasClass "light-background"
					$service.eq(c).removeClass("light-background")

				$service.eq(c).addClass("light")
				$service.eq(c).find(".image").show()

			for j of hasntImage
				c = hasntImage[j]
				if $service.eq(c).hasClass "light"
					$service.eq(c).removeClass("light")
				$service.eq(c).addClass("light-background")
				$service.eq(c).find(".image").hide()

			return

		w = $(window).width()

		$service = $(".highlightedServices .service")

		if w > 990
			$service.eq(0).addClass("goUp")
			$service.eq(3).addClass("goUp")

			hasImage = [0,2,5,6,8,11]
			hasntImage = [1,3,4,7,9,10]
			toggleService($service, hasImage, hasntImage)
			
		else if w > 768
			$service.eq(0).addClass("goUp")
			$service.eq(3).removeClass("goUp")

			hasImage = [0,3,4,7,8,11]
			hasntImage = [1,2,5,6,9,10]
			toggleService($service, hasImage, hasntImage)

		else
			$service.eq(0).removeClass("goUp")
			$service.eq(3).removeClass("goUp")

			hasImage = [0,2,4,6,8,10]
			hasntImage = [1,3,5,7,9,11]
			toggleService($service, hasImage, hasntImage)
			
		return

	if $(".highlightedServices").length > 0
		removeAddGoUp()

		$(".masonry").imagesLoaded () ->
			setTimeout () ->
				$(window).trigger "resize"
			,0

			$(".masonry").masonry 'on', 'layoutComplete', () ->
				$(window).trigger "resize"

		$(window).on "resize orientationchange", () ->
			removeAddGoUp()
			return


	# Contact
	# ---------------------------------------------------------------
	if $(".contact-bandeau").length > 0

		$(".contact-bandeau [type='text']").addClass("light light-border")




	return