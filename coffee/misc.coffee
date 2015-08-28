# http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
###########################################################################################
unless String.linkify
	String::linkify = ->
	    
	    # http://, https://, ftp://
	    urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/g
	    
	    # www. sans http:// or https://
	    pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/g
	    
	    # Email addresses
	    emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/g
	    @replace(urlPattern, "<a href=\"$&\">$&</a>").replace(pseudoUrlPattern, "$1<a href=\"http://$2\">$2</a>").replace emailAddressPattern, "<a href=\"mailto:$&\">$&</a>"

# http://stackoverflow.com/questions/1418050/string-strip-for-javascript
###########################################################################################
if typeof String::trim == 'undefined'

  String::trim = ->
    String(this).replace /^\s+|\s+$/g, ''