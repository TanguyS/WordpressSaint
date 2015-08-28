jQuery(document).ready ($) ->

	# Home template
	# =============================================================================

	# Home options loading 
	loadHomeParts = () ->
		template = $( "[name='example']" ).val()

		$selectors = $( "#example" )
		$selectors.hide()

		switch template
		    when "example"
		      jQuery("#example").show()

		return


	if $("[name='example']").length > 0
		loadHomeParts()
		$("[name='example']").change ->
			loadHomeParts()
			return


	return