(function() {
  jQuery(document).ready(function($) {
    var loadPageParts;
    loadPageParts = function() {
      var template;
      template = $("#page_template option:selected").val();
      if (template === "rooms.php" || template === "contact.php") {
        return $("#postdivrich").hide();
      } else {
        return $("#postdivrich").show();
      }
    };
    if ($("#page_template").length > 0) {
      loadPageParts();
      $("#page_template").change(function() {
        loadPageParts();
      });
      return;
    }
  });

}).call(this);
