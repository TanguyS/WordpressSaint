<?php

// convert email to prevent SPAM
// =============================================================================

function st_protect_email($content) {
	$pattern = '/(\w+@[\w\.]+)/e';
	$replace = "st_encode_email('$1')";
	$content = preg_replace($pattern, $replace, $content);
	return $content;
}

function st_encode_email($e) {
	$output = '';
	for ($i = 0; $i < strlen($e); $i++) { $output .= '&#'.ord($e[$i]).';'; }
	return $output;
}


// send mail
// =============================================================================
add_filter('wp_mail_content_type',create_function('', 'return "text/html"; '));

function st_send_mail($txt, $to, $subject, $from, $from_addr, $cc="", $bcc="") {
	
	//$srvr = get_path();
	$srvr = "http://" . $_SERVER['SERVER_NAME'] . "/";
	
	$txt = preg_replace(
		array("/\"img\//", 
			   "/href=\"(?!(http|mailto))/",
			  "/url\(/"
			), 
		array("\"".$srvr."/img/", 
			  "href=\"".$srvr,
			  "url(".$srvr
			), 
		$txt
		);

	$headers[] = "From: " . $from . "<" . $from_addr . ">";
	if ($cc)
		$headers[] = "Cc: " . $cc;
	if ($bcc)
		$headers[] = "Bcc: " . $bcc;
	return wp_mail($to, $subject,	$txt, $headers);
}


// check mail
// =============================================================================

function st_checkmail($email) {
	$atom   = '[-a-z0-9!#$%&\'*+\\/=?^_`{|}~]';
	$domain = '([a-z0-9]([-a-z0-9]*[a-z0-9]+)?)'; 
								   
	$regex = '/^' . $atom . '+' .  
	'(\.' . $atom . '+)*' .      
									
	'@' .                          
	'(' . $domain . '{1,63}\.)+' . 
									
	$domain . '{2,63}$/i';         
	
	if (preg_match($regex, $email)) {
		return TRUE;
	} else {
		return FALSE;
	}
}


?>