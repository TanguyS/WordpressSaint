function generateGUID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 12; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

jQuery(document).ready(function($) {

	$(".file-field").each(function() {


		var uniqID = generateGUID();
		$(this).attr("id", uniqID);

		$wrapper = $(this).parent(".file-field-wrapper");

		$wrapper.append("<div class='additionalContainer clearfix' />");
		$wrapper.find(".additionalContainer").hide();

		var text = $(this).attr("data-text");
		var limit = typeof $(this).attr("data-sizeLimit") != "undefined" ? parseInt($(this).attr("data-sizeLimit")) : 0;
		var extensions = typeof $(this).attr("data-allowedExtensions") != "undefined" ? $(this).attr("data-allowedExtensions").split(',') : [];

		var upload = new qq.FileUploader({
			element: document.getElementById(uniqID),
			action: '/', 
			params: {},
			sizeLimit: limit,
			uploadButtonText: text,
			allowedExtensions: extensions, 
			onSubmit : function(file, ext){
				$wrapper.find(".description").hide();
				$wrapper.find(".additionalContainer").show();
			},
			onComplete: function(file, response, responseJSON){
				$wrapper.find(".qq-upload-list").hide();

				$wrapper.find(".additionalContainer").html("<div class='name'><a href='/wp-content/wp-uploads/" + responseJSON['filefinal'] + "' target='_blank'>" + responseJSON['filefinal'] +"</a></div><div class='cancel'><p>supprimer</p></div>");
				$wrapper.find(".file-field-input").attr('value', responseJSON['filefinal']);
			}
		});
		$(document).on('click', $wrapper.selector + " .cancel", function() {
			$('.qq-upload-list').hide();
			$wrapper.find(".description").show();
			$wrapper.find(".additionalContainer").hide();
		});
	});
});

