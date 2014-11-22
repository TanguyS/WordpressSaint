# Inf Carousel
# infinite carousel

infCarousel = (opts = {}) ->
	@$wrapper = opts.$wrapper
	@elementSelector = opts.elementSelector
	@prevSelector = opts.prevSelector
	@nextSelector = opts.nextSelector

	@duration = opts.duration or 1000
	@easing = opts.easing or "linear"

	@elementRatio = 0
	@elementWidth = 0
	@elementHeight = 0
	@elementCount = 0

	@$carouselWrap = null

	@readyCallback = opts.readyCallback or ->
	@transitionCallback = opts.transitionCallback or ->
	@beforeResizeCallback = opts.beforeResizeCallback or ->
	@afterResizeCallback = opts.afterResizeCallback or ->

	@init()
	
	@setSizes()
	$(window).on "resize orientationchange", () =>
		@setSizes()
		return

	@listen()

	@readyCallback.call()
	


infCarousel.prototype.init = () ->
	

	@$wrapper.find(@elementSelector).wrapAll("<div class='carouselWrap' />")
	@$carouselWrap = @$wrapper.find(".carouselWrap")

	$(@$wrapper.selector + " " + @nextSelector + ", " + @$wrapper.selector + " " + @prevSelector).css
		cursor: "pointer"

	# add first for prev
	$firstElement = @$wrapper.find(@elementSelector).last().clone()
	@$wrapper.find(@elementSelector).first().before($firstElement)

	# count elements
	@elementCount = @$wrapper.find(@elementSelector).length

	@elementRatio =  @$wrapper.find(@elementSelector).width() / $(window).width()

	return


infCarousel.prototype.setSizes = () ->
	self = this

	@beforeResizeCallback.call(null, this)

	@elementWidth = $(window).width() * @elementRatio

	@elementHeight = Math.max.apply(null, @$wrapper.find(@elementSelector).map () ->
		return $(this).height()
	)

	@$wrapper.css
		position: "relative"
		width: $(window).width()
		overflow: "hidden"

	@$carouselWrap.css
		position: "absolute"
		top: 0
		left: -@elementWidth
		width: @elementWidth * @elementCount
		height: @elementHeight

	@$wrapper.find(@elementSelector).each (e) ->
		$(this).css
			width: self.elementWidth
			float: "left"

		return

	@afterResizeCallback.call(null, this)

	return


infCarousel.prototype.listen = () ->
	$(document).on "click",  @$wrapper.selector + " " + @nextSelector, () =>
		@next()

		return

	$(document).on "click", @$wrapper.selector + " " + @prevSelector, () =>
		@prev()

		return

	return


infCarousel.prototype.next = () ->
	self = this

	@$carouselWrap.animate
    	left: -@elementWidth * 2
    , @duration, @easing, () ->
    	self.$wrapper.find(self.elementSelector).first().remove()

    	$firstElement = self.$wrapper.find(self.elementSelector).first().clone()
    	self.$carouselWrap.css
    		left: -self.elementWidth

    	self.$wrapper.find(self.elementSelector).last().after($firstElement)

    	self.transitionCallback.call()
    return

infCarousel.prototype.prev = () ->
	self = this

	@$carouselWrap.animate
    	left: 0
    , @duration, @easing, () ->
    	self.$wrapper.find(self.elementSelector).last().remove()

    	$firstElement = self.$wrapper.find(self.elementSelector).last().clone()
    	self.$carouselWrap.css
    		left: -self.elementWidth

    	self.$wrapper.find(self.elementSelector).first().before($firstElement)

    	self.transitionCallback.call()

    return