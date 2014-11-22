// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

/*******************************************************************************************/
// Redirect
/*******************************************************************************************/

$(document).on("click", ".redirect", function() {
    var location = $(this).find(".link").attr("href");
    if (location.indexOf("#") > -1 && window.location.pathname == "/")
        return true;

    if ($(this).find(".link").attr("target") == "_blank") {
        window.open(location);
    }
    else {
        window.location.href = location;
    }
    
    return false;
});

/*******************************************************************************************/
// Forms
/*******************************************************************************************/
// Handle forms
$(document).on("focusout", "input[type='text']", function() {
    if ($(this).val() == "")
        $(this).attr("value", $(this).attr("default"));
});

$(document).on("focusout", "textarea", function() {
    if ($(this).text() == "")
        $(this).text($(this).attr("default"));
});

$(document).on("click", "input[type='text']", function() {
    if ($(this).val() == $(this).attr("default")) {
        $(this).attr("value", "");
        $(this).css("color", "#808080");
    }
});

$(document).on("click", "textarea", function() {
    if ($(this).text() == $(this).attr("default")) {
        $(this).text("");
        $(this).css("color", "#808080");
    }
});