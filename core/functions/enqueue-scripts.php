<?php

// Enqueue front-end scripts
// =============================================================================

if ( ! function_exists( 'st_enqueue_site_scripts' ) ) :
  function st_enqueue_site_scripts() {
  		wp_enqueue_script( 'production',  get_template_directory_uri() . '/js/production.js', array(), '1.0.0', false );
	}

	add_action( 'wp_enqueue_scripts', 'hzr_enqueue_site_scripts' );
endif;


// Enqueue admin scripts
// =============================================================================

if ( ! function_exists( 'st_enqueue_admin_scripts' ) ) :
  function st_enqueue_admin_scripts() {
  		wp_enqueue_script( 'admin_scripts',  get_template_directory_uri() . '/js/admin.js', array('jquery'), '1.0.0', false );
	}

	add_action( 'admin_enqueue_scripts', 'st_enqueue_admin_scripts' );
endif;

?>