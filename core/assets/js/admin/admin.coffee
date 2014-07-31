jQuery(document).ready ($) ->

	# Pages template
	# =============================================================================

	# Page options loading 
	loadPageParts = () ->
		template = $("#page_template option:selected").val()

		if (template is "rooms.php" or template is "contact.php")
			$("#postdivrich").hide()
		else
			$("#postdivrich").show()

	if $("#page_template").length > 0
		loadPageParts()
		$("#page_template").change ->
			loadPageParts()
			return

		return

	return