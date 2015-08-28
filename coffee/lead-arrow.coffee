# Lead Arrow

leadArrow = (opts = {}) ->
	@$element = opts.$element
	@image = opts.image

	@id = opts.id or "arrowLead"

	@delayStart = opts.delayStart or 1000
	@delayStop = opts.delayStop or 5000

	@duration = opts.duration or 1000

	@$arrow = null

	@callback = opts.callback or null

	@init()
	@listen()

leadArrow::init = () ->
	self = @

	@$element.css
		position: "relative"

	@$element.append("<img src='" + @image + "' id='" + @id + "' style='display: none;' alt='' />")
	@$arrow = @$element.find("#" + @id)


	img = new Image()
	img.onload = () ->
		self.$arrow.css
			position: "absolute"
			zIndex: 2000
			left: "50%"
			top: "90%"
			cursor: "pointer"
			marginLeft: - this.width / 2
			marginTop: - this.height / 2

		# start animation
		self.blink()
	
	img.src = @image


	return

leadArrow::blink = () ->
	self = @

	# blink element
	unless Modernizr.touch
		setTimeout (->
			self.$arrow.fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn "slow", ->
				setTimeout (->
					self.$arrow.fadeOut "slow"
					return
				), self.delayStop
				return
			return
		), self.delayStart

	return

leadArrow::listen = () ->
	self = @

	$(document).on "click", "#" + @id, =>
		#$("html, body").animate
		#	scrollTop: @$element.height()
		#, @duration

		if (self.callback)
			self.callback.call()


		@$arrow.fadeOut "slow"

		return


	return
