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

function st_send_mail($txt, $to, $subject, $from, $from_addr, $cc="", $bcc="") {
	
	//$srvr = get_path();
	$srvr = "http://".$SERVER_NAME."/";
	
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

	$headers = "MIME-Version: 1.0\n"
		 ."Content-type: text/html; charset: UTF-8\n"
		 ."From: ".$from."<".$from_addr.">\n"
		 ."Reply-To: ".$from_addr."\n"
		 ."Return-Path: ".$from_addr."\n"
		 ."X-Mailer: PHP/".phpversion()."\n";
	if ($cc)
		$headers .= "Cc: ".$cc."\n";
	if ($bcc)
		$headers .= "Bcc: ".$bcc."\n";
	return mail($to, $subject,	$txt, $headers); //, "-f".$from_addr);
	//return mail($to, $subject,	$txt, $headers, "-f".$from_addr);
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