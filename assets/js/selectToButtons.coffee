# Select To buttons

selectToButtons = (opts = {}) ->
	@$element = opts.$element
	@id = @$element.attr("name") + parseInt( Math.random() * 1000 + 1000 ).toString()

	@onReady = opts.onReady or null
	@onSelect = opts.onSelect or null

	@$wrapper = null
	@optionCount = 0

	@initialize()
	@listen()

	return

selectToButtons::initialize = () ->
	@$element.hide()

	@$element.after("<div id='" + @id + "' class='buttonsWrapper clearfix' />")
	@$wrapper = @$element.siblings(".buttonsWrapper").first()

	@optionCount = @$element.find("option").length

	if @optionCount is 0
		console.warn "SelectToButtons: there's no option on the select. Initialization aborted."
		return

	i = 0
	while i < @optionCount
		@$wrapper.append("<div class='item' />")
		$item = @$wrapper.find(".item:last")

		$item.css
			width: 100 / @optionCount + "%"
			cursor: "pointer"
			float: "left"

		$item.append( "<div class='itemContent'>" + @$element.find("option")[i].innerText + "</div>" )

		i++

	# automatically select first item
	sel = @$element[0].selectedIndex

	@$wrapper.find(".item").eq(sel).addClass("selected")

	if @onSelect
		@onSelect.call(null, @)

	if @onReady
		@onReady.call(null, @)

	return

selectToButtons::listen = () ->
	self = @	

	$(document).on "click", "#" + @id + " .item", () ->
		$("#" + self.id + " .item").removeClass("selected")
		$(this).addClass("selected")

		index = $(this).index()
		self.$element.val( self.$element.find("option").eq(index).val() ) 

		if self.onSelect
			self.onSelect.call(null, self)

		return

	return


# jQuery plugin definition
$.fn.selectToButtons = (option) ->
	new selectToButtons
		$element: $(this)
