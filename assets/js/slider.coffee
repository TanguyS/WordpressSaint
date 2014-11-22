# Simple slider
# just a simple interface


simpleSlider = (opts = {}) ->
	@$container = opts.$container
	@selector = opts.selector
	@overlay = opts.overlay or null
	@interval = opts.interval or 5000
	@transition = opts.transition or 1000
	@onBefore = opts.onBefore or () ->
	@onComplete = opts.onComplete or () ->
	@transitionType = opts.transitionType or "fade"

	@index = 0

	@controlMethod = opts.controlMethod or "mouse"
	@rightArrow = opts.rightArrow
	@leftArrow = opts.leftArrow
	@controlWidth = opts.controlWidth
	@controlHeight = opts.controlHeight

	@length = @$container.find(@selector).length
	@$controls = null
	@containerWidth = opts.containerWidth or @$container.width()
	@containerHeight = opts.containerHeight or @$container.height()

	@isIOS = if navigator.userAgent.match(/(iPad|iPhone|iPod)/g) then true else false

	@timer = null

	@initialize()
	@sizeIt()
	
	$(window).on "resize orientationchange", () =>
		@sizeIt()
		return

	@createControls()

	return


simpleSlider.prototype.initialize = () ->
	self = @

	@$container.find(@selector).each (e) ->
		if e isnt 0
			$(this).hide()

		return
	
	@$container.find(@selector).each (e) ->
		$(this).css
			position: "absolute"
			zIndex: 10
			backgroundPosition: "center center"
			backgroundRepeat: "no-repeat"
			"-webkit-background-size": "100%"
			"-moz-background-size": "100%"
			"-o-background-size": "100%"
			"background-size": "100%"
			"-webkit-background-size": "cover"
			"-moz-background-size": "cover"
			"-o-background-size": "cover"
			"background-size": "cover"

		if !self.isIOS
			$(this).css
				"-webkit-background-attachment": "fixed"
				"-moz-background-attachment": "fixed"
				"-o-background-attachment": "fixed"
				"background-attachment": "fixed"

		if self.isIOS
			setTimeout () ->
				$(window).trigger "resize"
			, 500

		return

	return

simpleSlider.prototype.sizeIt = () ->
	self = @

	wT = $(window).width()
	hT = (if window.innerHeight then window.innerHeight else $(window).height())

	if wT < 595
		wT = 595

	@containerWidth = wT
	@containerHeight = hT

	@$container.css
		overflow: "hidden"
		width: wT
		height: hT


	if @$container.find(@overlay).length > -1
		@$container.find(@overlay).css
			position: "absolute"
			top: "50%"
			left: "50%"
			zIndex: 11

		@$container.find(@overlay).css
			marginLeft: -1/2 * @$container.find(@overlay).width()
			marginTop: -1/2 * @$container.find(@overlay).height()
			

	# center images
	@$container.find(@selector).each () ->
		###
		if self.isIOS
			# simulate cover
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
		###
		$(this).css
			width: wT
			height: hT

		return

	return

# controls
simpleSlider.prototype.createControls = () ->
	self = @

	if @length < 2
		return

	if @controlMethod is "mouse"
		@$container.bind "mousemove", (e) ->
			#if e.offsetParent is "div.closePop"
			#	$(this).css "cursor", "pointer"
			#	return

			if e.pageX < self.containerWidth / 2
				$(this).css "cursor", "url('" + self.leftArrow + "') " + (self.controlWidth / 2) + " " + (self.controlHeight / 2) + ", auto"
			else
				$(this).css "cursor", "url('" + self.rightArrow + "') " + (self.controlWidth / 2) + " " + (self.controlHeight / 2) + ", auto"
			return

		$(document).on "click", @$container[0].selector, (e) =>
			if e.pageX < @containerWidth / 2
				@prev()
			else
				@next()

			# stop the slider since the user take control
			@stop()

			return

	else
		@$container.append("<ul class='controls'></div>")

		@$controls = @$container.find(".controls")

		@$controls.css
			width: "100%"
			height: "100%"
			zIndex: 1000
			position: "relative"

		@$controls.append("<div class='control left'><img src='" + @leftArrow + "' alt='' /></div>")
		@$controls.append("<div class='control right'><img src='" + @rightArrow + "' alt='' /></div>")

		@$controls.find(".control").css
			position: "absolute"
			width: "50%"
			height: "100%"
			cursor: "pointer"

		@$controls.find(".left").css
			left: 0

		@$controls.find(".right").css
			right: 0

		@$controls.find(".control img").css
			position: "absolute"
			top: "50%"
			marginTop: -1 * @controlHeight / 2

		@$controls.find(".left img").css
			left: 30

		@$controls.find(".right img").css
			right: 30

		$(document).on "click", @$container.selector + " .control", (e) =>
			# stop the slider since the user take control
			@stop()

			if $(this).hasClass("left")
				@prev()
			else
				@next()

			return

	return


simpleSlider.prototype.hideControls = (instant = false) ->	
	if @controls
		if instant
			@controls.hide()
		else
			@controls.fadeOut("slow")

	return

simpleSlider.prototype.showControls = (instant = false) ->	
	if @controls
		if instant
			@controls.show()
		else
			@controls.fadeIn("slow")

	return


# behaviour
simpleSlider.prototype.start = () ->
	@timer = setInterval () =>
		@next()
	, @interval

	return



simpleSlider.prototype.stop = () ->
	clearInterval(@timer)

	@timer = null

	return


simpleSlider.prototype.reset = () ->
	clearInterval(@timer)

	@$container.find(@selector).each (e) =>

		if e isnt 0
			$(this).hide()

		return

	@index = 0

	return

simpleSlider.prototype.next = () ->
	if @length < 2
		return

	if @onBefore
		@onBefore.call()

	if @transitionType is "fade"
		@$container.find(@selector).eq(@index).stop(true, true).fadeOut(@transition)

	@index++

	if @transitionType is "fade"
		if (@$container.find(@selector).eq(@index).length > 0)
			@$container.find(@selector).eq(@index).stop(true, true).fadeIn @transition, () =>
		else
			@index = 0
			@$container.find(@selector).first().stop(true, true).fadeIn @transition, () =>

			if @onComplete
				@onComplete.call()

	return

simpleSlider.prototype.prev = () ->
	if @length < 2
		return

	if @onBefore
		@onBefore.call()

	if @transitionType is "fade"
		@$container.find(@selector).eq(@index).stop(true, true).fadeOut(@transition)

	@index--

	if @transitionType is "fade"
		if (@$container.find(@selector).eq(@index).length > 0)
			@$container.find(@selector).eq(@index).stop(true, true).fadeIn @transition, () =>

			if @onComplete
				@onComplete.call()
		else
			@index = @length
			@$container.find(@selector).last().stop(true, true).fadeIn @transition, () =>

			if @onComplete
				@onComplete.call()

	return

simpleSlider.prototype.goTo = (index) ->
	if @length < 2
		return

	if @onBefore
		@onBefore.call()

	@$container.find(@selector).eq(@index).hide()

	@index = index

	@$container.find(@selector).eq(@index).show()

	if @onComplete
		@onComplete.call()

	return
