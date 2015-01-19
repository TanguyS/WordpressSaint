jQuery(document).ready ($) ->

	# Pages template
	# =============================================================================

	# Page options loading 
	loadPageParts = () ->
		template = $("#page_template option:selected").val()
		$selectors = $("#section-regular, #section-home, #section-commons-home, #section-hotel, #section-rooms, #section-service, #section-promo, #section-gallery, #section-seminar, #section-press, #section-contact")
		$selectors.hide()

		if template is "home.php"
			$("#section-commons").hide()
			$("#section-commons-home").show()
			$("#section-home").show()
		else if template is "rooms.php"
			$("#section-rooms").show()
		else if template is "services.php"
			$("#section-service").show()
		else if template is "promo.php"
			$("#section-promo").show()
		else if template is "gallery.php"
			$("#section-gallery").show()
		else if template is "seminar.php"
			$("#section-seminar").show()
		else if template is "press.php"
			$("#section-press").show()
		else if template is "hotel.php"
			$("#section-hotel").show()
		else if template is "contact.php"
			$("#section-commons").hide()
			$("#section-contact").show()
		else
			$("#section-regular").show()

	if $("#page_template").length > 0
		loadPageParts()
		$("#page_template").change ->
			loadPageParts()
			return

		return

	return