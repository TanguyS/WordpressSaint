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


// image utility
// =============================================================================

function get_home_path_alternative() {
	$home = get_option( 'home' );
	$siteurl = get_option( 'siteurl' );
	if ( ! empty( $home ) && 0 !== strcasecmp( $home, $siteurl ) ) {
		$wp_path_rel_to_home = str_ireplace( $home, '', $siteurl ); /* $siteurl - $home */
		$pos = strripos( str_replace( '\\', '/', $_SERVER['SCRIPT_FILENAME'] ), trailingslashit( $wp_path_rel_to_home ) );
		$home_path = substr( $_SERVER['SCRIPT_FILENAME'], 0, $pos );
		$home_path = trailingslashit( $home_path );
	} else {
		$home_path = ABSPATH;
	}

	return str_replace( '\\', '/', $home_path );
}


function get_size_component() {
	global $image_sizes;

	foreach (get_intermediate_image_sizes() as $s ){
		$image_sizes[ $s ] = array( 0, 0 );
		if( in_array( $s, array( 'thumbnail', 'medium', 'large' ) ) ){
			$image_sizes[ $s ][0] = get_option( $s . '_size_w' );
			$image_sizes[ $s ][1] = get_option( $s . '_size_h' );
		}
	}
}

add_action('init', 'get_size_component');

function filter_sizes ($img) {
	global $image_sizes;

	$original_img = $img;
	$img = str_replace(site_url(), "", $img);

	if (!isset($_COOKIE['width_screen'])) {
		$size = "medium";
	}
	else {
		$size = (in_array($_COOKIE['width_screen'], array("thumbnail", "medium", "large"))) ? $_COOKIE['width_screen'] : "medium";
	}

	if ($size == "large") {
		return $img;
	}

	$component = "-" . implode("x", $image_sizes[$size]);

	$parts = explode("/", $img);
	$final_parts = explode (".", $parts[count($parts) - 1]);

	$parts[count($parts) - 1] = $final_parts[0] . $component . "." . $final_parts[1];

	$img = implode("/", $parts);

	$path_img = str_replace('//', '/', get_home_path_alternative() . $img);

	if (file_exists($path_img)) {
		$img = site_url() . $img;
	}
	else {
		$img = $original_img;
	}

	return $img;
}

?>