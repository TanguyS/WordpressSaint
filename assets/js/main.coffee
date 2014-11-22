jQuery(document).ready ($) ->

	# Declare global vars
	###########################################################################################

	setSizes = ->
		window.screenWidth = $(window).width()
		window.screenHeight = (if window.innerHeight then window.innerHeight else $(window).height())

		if window.screenWidth < 560
			window.screenWidth = 560

	setSizes()

	$(window).on "resize orientationchange", ->
		setSizes()


	# to override with customizer
	if typeof window.settings is "undefined"
		window.settings = {}
		window.settings.lightColor = "#ffffff"
		window.settings.darkColor = "#000000"

	window.mobilecheck = (->
		check = false
		((a) ->
			check = true  if /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) or /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
			return
		) navigator.userAgent or navigator.vendor or window.opera
		check
	)()

	# Fix some for bootstrap
	###########################################################################################

	$('.hide').hide().removeClass('hide')


	# Event for change on document height
	###########################################################################################

	checkDocumentHeight = () ->
		lastHeight = document.body.clientHeight
		newHeight = undefined
		timer = undefined
		(run = ->
			newHeight = document.body.clientHeight
			$(document).trigger("documentHeightChanged") unless lastHeight is newHeight
			lastHeight = newHeight
			timer = setTimeout(run, 500)
			return
		)()
		return

	checkDocumentHeight()



	# mobile meta
	###########################################################################################
	if $(window).width() < 800
		viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'width=595');


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



	# Modules
	###########################################################################################

	# simple subscriber
	$("#simple_subscriber input").addClass("light")
	$("#simple_subscriber input[type='text']").addClass("light-border")

	$("#simple_subscriber input").css
		color: window.settings.lightColor
		borderColor: window.settings.lightColor

	# Hotel Maps
	$(window).on "mapContentLoaded", ->
		$(".infoBubble h2, .infoBubble .links, .around, .mapPanel h2").css "border-color", window.settings.darkColor
		$(".mapPanel input[type='submit']").css "background-color", window.settings.lightColor


	# footer
	# http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
	###########################################################################################
	unless String.linkify
		String::linkify = ->
		    
		    # http://, https://, ftp://
		    urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/g
		    
		    # www. sans http:// or https://
		    pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/g
		    
		    # Email addresses
		    emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/g
		    @replace(urlPattern, "<a href=\"$&\">$&</a>").replace(pseudoUrlPattern, "$1<a href=\"http://$2\">$2</a>").replace emailAddressPattern, "<a href=\"mailto:$&\">$&</a>"

	if $("footer .contact").length > 0
		$("footer .contact").html( $("footer .contact").html().linkify() )


	# header
	###########################################################################################
	menuW = 0

	$("#navWrapper").find("a").each () ->
		menuW += $(this).outerWidth(true)

	replaceNav = () ->
		totalW = $(".nav-bar").width()
		availW = totalW - $(".nav-bar .rightPart").width()

		if menuW < availW
			$("#navigation").show()
			$(".hamburger").hide()
		else
			$(".hamburger").show()
			$("#navigation").hide()

		return

	replaceNav()

	$(window).on "resize orientationchange", () ->
		replaceNav()
		return


	# reservation
	###########################################################################################

	# http://www.sitepoint.com/javascript-generate-lighter-darker-color/
	colorLuminance = (hex, lum) ->
		# validate hex string
		hex = String(hex).replace(/[^0-9a-f]/g, "")
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]  if hex.length < 6
		lum = lum or 0

		# convert to decimal and change luminosity
		rgb = "#"
		c = undefined
		i = undefined
		i = 0
		while i < 3
			c = parseInt(hex.substr(i * 2, 2), 16)
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
			rgb += ("00" + c).substr(c.length)
			i++
		rgb


	$( '[name="adultsField"]' ).minimalect
		placeholder: ""

	$( '[name="childrenField"]' ).minimalect
		placeholder: ""

	$("#reservation .minict_wrapper").addClass("light-border light")
	$("#reservation .minict_wrapper ul").addClass("dark-background")

	#i18n
	currentLang = $("#calendarData .locale").text()
	months = $("#calendarData .months").text().split(',')
	weekDays = $("#calendarData .weekdays").text().split(',')
	weekDaysShort = $("#calendarData .weekdaysShort").text().split(',')

	$beginnningField = $("#checkinField")
	$endField = $("#checkoutField")
	today = new Date();
	window.datepicker = new Pikaday
		format: "YYYY-MM-DD"
		minDate: moment().toDate()
		i18n:
			previousMonth : 'Previous Month',
			nextMonth     : 'Next Month',
			months        : months,
			weekdays      : weekDays,
			weekdaysShort : weekDaysShort
		onSelect: (value) ->
			
			$(".calendarField.selected").val( @getMoment().format("YYYY-MM-DD") )
			$(".calendarField.selected").parent().find(".textDate").text( @getMoment().locale(currentLang).format("LL") )

			if ($(".calendars").is(":visible"))
				$(".calendarField").removeClass("selected")
				$(".calendars").fadeOut("slow")

			return

	$(".calendars").append(datepicker.el)

	# add some custom css for calendar
	calendarStyle = "<style type='text/css'>" +
	".pika-single { background-color: " + window.settings.lightColor + "; color: " + window.settings.darkColor + "; }" +
	".pika-button { background-color: " + window.settings.lightColor + "; border-color: " + window.settings.lightColor + "; }" +
	".pika-button:hover { border-color: " + colorLuminance(window.settings.darkColor, 0.5) + "; }" +
	".is-disabled .pika-button, .is-disabled.is-today .pika-button { color: " + window.settings.darkColor + "; }" +
	".is-selected .pika-button { background-color: " + window.settings.darkColor + "; color: " + window.settings.lightColor + "; border-color: " + window.settings.darkColor + "; }" +
	"</style>"

	$("head").append(calendarStyle)

	$(document).on "click", ".arrival", () ->
		$(".calendarField").removeClass("selected")
		$beginnningField.addClass("selected")
		
		if $endField.val() == ""
			maxDate = new Date("2050-01-01")
		else
			maxDate = new Date( Date.parse( $endField.val() ) )
			maxDate.setDate(maxDate.getDate()-1);

		datepicker.setMinDate( new Date() )
		datepicker.setMaxDate( new Date(maxDate) )

		datepicker.setDate( $beginnningField.val() )

		$(".calendars").fadeIn( "slow" )

		return

	$(document).on "click", ".departure", () ->
		$(".calendarField").removeClass("selected")
		$endField.addClass("selected")

		if $beginnningField.val() == ""
			minDate = new Date()
		else
			minDate = new Date( Date.parse( $beginnningField.val() ) + 1 )

		datepicker.setMinDate( minDate )
		datepicker.setMaxDate( new Date("2050-01-01") )

		datepicker.setDate( $endField.val() )

		$(".calendars").fadeIn("slow")

		return

	$(document).on "click", ".pika-background", () ->
		$(".calendarField").removeClass("selected")
		$(".calendars").fadeOut("slow")
		return


	# sticky navbar
	###########################################################################################
	$nav = $(".nav-bar")
	if $nav.length > 0
		
		navHeight = $nav.outerHeight()
		$nav.before "<div id='nav-replace' class='part' />"
		$("#nav-replace").css
			height: 0

		stickyTop = $("#nav-replace")[0].offsetTop

		stickyNav = () ->
			windowTop = $(window).scrollTop()
			if stickyTop < windowTop
				$nav.css
					position: "fixed"
					top: 0
					left: 0
					right: 0

				$("#nav-replace").css
					height: navHeight

			else
				$nav.css "position", "relative"
				$("#nav-replace").css
					height: 0

			return

		
		$(document).on "documentHeightChanged", ->
			stickyTop = $("#nav-replace")[0].offsetTop
			stickyNav()
			return

		$(window).scroll ->
			stickyNav()
			
			return


	# sticky navbar
	###########################################################################################
	animateButton = () ->
		$hamButton = $(".hamburger")
		pad = "7px"
		padExt = "8px"

		# animate bars
		if !$("#navigation-down").is(":visible")
			$hamButton.find(".icon-bar").css
				webkitTransition:"transform 1s"
				transition: 'transform 1s'

			$hamButton.find(".icon-bar:first").css
				msTransform: "translate(0px,#{pad})"
				mozTransform: "translate(0px,#{pad})"
				webkitTransform: "translate(0px,#{pad})"
				transform: "translate(0px,#{pad})"

			setTimeout () ->
				$hamButton.find(".icon-bar:first").css
					msTransform: "translate(0px,#{padExt}) rotate(45deg)"
					mozTransform: "translate(0px,#{padExt}) rotate(45deg)"
					webkitTransform: "translate(0px,#{padExt}) rotate(45deg)"
					transform: "translate(0px,#{padExt}) rotate(45deg)"

				return

			, 1000

			$hamButton.find(".icon-bar:last").css
				msTransform: "translate(0px,-#{pad})"
				mozTransform: "translate(0px,-#{pad})"
				webkitTransform: "translate(0px,-#{pad})"
				transform: "translate(0px,-#{pad})"

			setTimeout () ->
				$hamButton.find(".icon-bar").first().next().css
					opacity: 0

				$hamButton.find(".icon-bar:last").css
					msTransform: "translate(0px,-#{padExt}) rotate(-45deg)"
					mozTransform: "translate(0px,-#{padExt}) rotate(-45deg)"
					webkitTransform: "translate(0px,-#{padExt}) rotate(-45deg)"
					transform: "translate(0px,-#{padExt}) rotate(-45deg)"

				return
				
			, 1000

		else
			$hamButton.find(".icon-bar:first").css
				msTransform: "translate(0px,#{padExt}) rotate(0deg)"
				mozTransform: "translate(0px,#{padExt}) rotate(0deg)"
				webkitTransform: "translate(0px,#{padExt}) rotate(0deg)"
				transform: "translate(0px,#{padExt}) rotate(0deg)"

			$hamButton.find(".icon-bar:last").css
				msTransform: "translate(0px,-#{padExt}) rotate(0deg)"
				mozTransform: "translate(0px,-#{padExt}) rotate(0deg)"
				webkitTransform: "translate(0px,-#{padExt}) rotate(0deg)"
				transform: "translate(0px,-#{padExt}) rotate(0deg)"


			setTimeout () ->
				$hamButton.find(".icon-bar:first").css
					msTransform: "translate(0px,0px) rotate(0deg)"
					mozTransform: "translate(0px,0px) rotate(0deg)"
					webkitTransform: "translate(0px,0px) rotate(0deg)"
					transform: "translate(0px,0px) rotate(0deg)"

				$hamButton.find(".icon-bar").first().next().css
						opacity: 1

				$hamButton.find(".icon-bar:last").css
					msTransform: "translate(0px,0px) rotate(0deg)"
					mozTransform: "translate(0px,0px) rotate(0deg)"
					webkitTransform: "translate(0px,0px) rotate(0deg)"
					transform: "translate(0px,0px) rotate(0deg)"
			, 1000

		return

	toggleNav = () ->
		animateButton()

		$mNav = $("#navigation-down")


		if $mNav.is(":visible")
			$mNav.hide()
		else
			$mNav.show()

		return

	$(document).on "click", ".hamburger", () ->
		if $("#reservation").is(":visible")
			$("#reservation").hide()

		navOffset = $(".nav-bar")[0].offsetTop
		if navOffset isnt 0
			$("html, body").animate(
				scrollTop: navOffset
			, 500).promise().done( () -> # use promise to have a single callback
				console.log "toggle"
				toggleNav()
			)
		else
			toggleNav()


	# recalc font-size menu
	###########################################################################################
	recalcMenu = () ->
		if window.screenHeight / window.screenWidth > 1
			lH = ( ( window.screenWidth - 50 ) / $("#navigation-down li").length ) - 25
		else
			lH = ( ( window.screenHeight - 50 ) / $("#navigation-down li").length ) - 25


		$("#navigation-down li").css
			lineHeight: parseInt( lH ) + "px"
			fontSize: parseInt( lH * 0.9 ) + "px"

		return

	recalcMenu()

	$(window).on "resize orientationchange", () ->
		recalcMenu()

		return


	# header
	###########################################################################################

	$("#navigation-down li").addClass("redirect")
	$("#navigation-down li a").addClass("link")

	$("#navigation-down li").css "background-color", window.settings.lightColor

	$(document).on "mouseenter", "#navigation-down li", () ->
		$(this).animate
			backgroundColor: window.settings.darkColor
		, 300

		$(this).find("a").animate
			color: window.settings.lightColor
		, 300

	$(document).on "mouseleave", "#navigation-down li", () ->
		$(this).animate
			backgroundColor: window.settings.lightColor
		, 300

		$(this).find("a").animate
			color: window.settings.darkColor
		, 300



	# resa in home appearing and disappearing at scroll
	###########################################################################################
	beforeStart = true
	toggleReservationInHome = () ->
		large = $(window).width() > 990

		if !large
			$("#reservation").hide()
			return

		sectionTop = $(".home .presentation")[0].offsetTop
		sectionH = $(".home .presentation").outerHeight()
		resaH = 380 #maybe do better after but it's unnecessary
		menuH = 46

		$(document).on "documentHeightChanged", ->
			sectionTop = $(".home .presentation")[0].offsetTop
			sectionH = $(".home .presentation").outerHeight()
			return

		$(window).scroll ->
			if $(".mainBookButton").hasClass "userControlled"
				return

			resaVisible = $("#reservation").is(":visible")
			topS = $(window).scrollTop()
			if topS <= sectionTop + sectionH - menuH - resaH && !resaVisible
				if beforeStart
					$("#reservation").show()
				else
					$("#reservation").fadeIn()
			else if topS > sectionTop + sectionH - menuH - resaH && resaVisible
				if beforeStart
					$("#reservation").hide()
				else
					$("#reservation").fadeOut()

			beforeStart = false
			
			return

	if $(".home").length > 0
		toggleReservationInHome()

		$(window).on "resize orientationchange", () ->
			toggleReservationInHome()

			return


	$(".mainBookButton").on "click", () ->
		$(this).addClass "userControlled"

		return


	# booking in iframe
	###########################################################################################
	loadBookingFrame = (target) ->
		if $("#bookingFrame").length > 0
			$("#bookingFrame").remove()

		$("body").children("section").not(".part").remove()
		$("footer").before '<iframe src=' + target + ' id="bookingFrame" name="bookingFrame" frameborder="0" width="100%" scrolling="no">'
		$("#bookingFrame").iFrameResize
			checkOrigin: false

		$("footer").css "margin-top", "-10px"

		return

	$(document).on "click", ".book-room", (e) ->
		e.preventDefault()

		target = $(this).attr("href")

		loadBookingFrame(target)

		false

	$(document).on "click", ".promo-link", (e) ->
		e.preventDefault()

		target = $(this).find("a.link").attr("href")

		loadBookingFrame(target)

		false


	$(window).on "reservation", () ->
		target = $("#booking_form").attr("action") + "?" + $("#booking_form").serialize()

		loadBookingFrame(target)

		return



	return