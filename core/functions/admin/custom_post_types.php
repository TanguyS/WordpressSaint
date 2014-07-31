<?php
// Custom Post types
// =============================================================================

add_action('init', 'hzr_register_post_types');

function hzr_register_post_types() {

	$version = (floatval( get_bloginfo( 'version' ) ) >= '3.8');


	// Home
	// =============================================================================

  	$menu_icon = ( $version ) ? 'dashicons-admin-home' : NULL;

	register_post_type('Home', 
		array(
			'labels' => array(
				'name'               => __( 'Home', 'hotelizr' ),
			    'singular_name'      => __( 'Home', 'hotelizr' ),
			    'add_new'            => __( 'Add New Home', 'hotelizr' ),
			    'add_new_item'       => __( 'Add New Home', 'hotelizr' ),
			    'edit_item'          => __( 'Edit Home', 'hotelizr' ),
			    'new_item'           => __( 'Add New Home', 'hotelizr' ),
			    'view_item'          => __( 'View Home', 'hotelizr' ),
			    'search_items'       => __( 'Search Homes', 'hotelizr' ),
			    'not_found'          => __( 'No home found', 'hotelizr' ),
			    'not_found_in_trash' => __( 'No home found in trash', 'hotelizr' )
			),
			'public'          => true,
			'show_ui'         => true,
			'supports'        => array( 'title', 'editor', 'revisions' ),
			'capability_type' => 'post',
			'hierarchical'    => false,
			'menu_position'   => 4,
			'menu_icon'       => $menu_icon,
			'has_archive'     => true
		)
	);


	// Rooms
	// =============================================================================

  	$menu_icon = ( $version ) ? 'dashicons-networking' : NULL;

	register_post_type('Room', 
		array(
			'labels' => array(
				'name'               => __( 'Rooms', 'hotelizr' ),
			    'singular_name'      => __( 'Room', 'hotelizr' ),
			    'add_new'            => __( 'Add New Room', 'hotelizr' ),
			    'add_new_item'       => __( 'Add New Room', 'hotelizr' ),
			    'edit_item'          => __( 'Edit Room', 'hotelizr' ),
			    'new_item'           => __( 'Add New Room', 'hotelizr' ),
			    'view_item'          => __( 'View Room', 'hotelizr' ),
			    'search_items'       => __( 'Search Rooms', 'hotelizr' ),
			    'not_found'          => __( 'No room found', 'hotelizr' ),
			    'not_found_in_trash' => __( 'No room found in trash', 'hotelizr' )
			),
			'public'          => true,
			'show_ui'         => true,
			'supports'        => array( 'title', 'editor', 'revisions' ),
			'capability_type' => 'post',
			'hierarchical'    => false,
			'menu_position'   => 4,
			'menu_icon'       => $menu_icon,
			'has_archive'     => true
		)
	);



	// Events
	// =============================================================================

  	$menu_icon = ( $version ) ? 'dashicons-microphone' : NULL;

	register_post_type('Event', 
		array(
			'labels' => array(
				'name'               => __( 'Events', 'hotelizr' ),
			    'singular_name'      => __( 'Event', 'hotelizr' ),
			    'add_new'            => __( 'Add New Event', 'hotelizr' ),
			    'add_new_item'       => __( 'Add New Event', 'hotelizr' ),
			    'edit_item'          => __( 'Edit Event', 'hotelizr' ),
			    'new_item'           => __( 'Add New Event', 'hotelizr' ),
			    'view_item'          => __( 'View Event', 'hotelizr' ),
			    'search_items'       => __( 'Search Events', 'hotelizr' ),
			    'not_found'          => __( 'No event found', 'hotelizr' ),
			    'not_found_in_trash' => __( 'No event found in trash', 'hotelizr' )
			),
			'public'          => true,
			'show_ui'         => true,
			'supports'        => array( 'title', 'editor', 'revisions' ),
			'capability_type' => 'post',
			'hierarchical'    => false,
			'menu_position'   => 4,
			'menu_icon'       => $menu_icon,
			'has_archive'     => true
		)
	);


	// Events
	// =============================================================================

  	$menu_icon = ( $version ) ? 'dashicons-plus-alt' : NULL;

	register_post_type('Health', 
		array(
			'labels' => array(
				'name'               => __( 'Healths', 'hotelizr' ),
			    'singular_name'      => __( 'Health', 'hotelizr' ),
			    'add_new'            => __( 'Add New Health', 'hotelizr' ),
			    'add_new_item'       => __( 'Add New Health', 'hotelizr' ),
			    'edit_item'          => __( 'Edit Health', 'hotelizr' ),
			    'new_item'           => __( 'Add New Health', 'hotelizr' ),
			    'view_item'          => __( 'View Health', 'hotelizr' ),
			    'search_items'       => __( 'Search Healths', 'hotelizr' ),
			    'not_found'          => __( 'No health found', 'hotelizr' ),
			    'not_found_in_trash' => __( 'No health found in trash', 'hotelizr' )
			),
			'public'          => true,
			'show_ui'         => true,
			'supports'        => array( 'title', 'editor', 'revisions' ),
			'capability_type' => 'post',
			'hierarchical'    => false,
			'menu_position'   => 4,
			'menu_icon'       => $menu_icon,
			'has_archive'     => true
		)
	);


	// Menu
	// =============================================================================

  	$menu_icon = ( $version ) ? 'dashicons-marker' : NULL;

	register_post_type('Menu', 
		array(
			'labels' => array(
				'name'               => __( 'Menus', 'hotelizr' ),
			    'singular_name'      => __( 'Menu', 'hotelizr' ),
			    'add_new'            => __( 'Add New Menu', 'hotelizr' ),
			    'add_new_item'       => __( 'Add New Menu', 'hotelizr' ),
			    'edit_item'          => __( 'Edit Menu', 'hotelizr' ),
			    'new_item'           => __( 'Add New Menu', 'hotelizr' ),
			    'view_item'          => __( 'View Menu', 'hotelizr' ),
			    'search_items'       => __( 'Search Menus', 'hotelizr' ),
			    'not_found'          => __( 'No menu found', 'hotelizr' ),
			    'not_found_in_trash' => __( 'No menu found in trash', 'hotelizr' )
			),
			'public'          => true,
			'show_ui'         => true,
			'supports'        => array( 'title', 'editor', 'revisions' ),
			'capability_type' => 'post',
			'hierarchical'    => false,
			'menu_position'   => 4,
			'menu_icon'       => $menu_icon,
			'has_archive'     => true
		)
	);


	// Offers
	// =============================================================================

  	$menu_icon = ( $version ) ? 'dashicons-star-filled' : NULL;

	register_post_type('Offer', 
		array(
			'labels' => array(
				'name'               => __( 'Offers', 'hotelizr' ),
			    'singular_name'      => __( 'Offer', 'hotelizr' ),
			    'add_new'            => __( 'Add New Offer', 'hotelizr' ),
			    'add_new_item'       => __( 'Add New Offer', 'hotelizr' ),
			    'edit_item'          => __( 'Edit Offer', 'hotelizr' ),
			    'new_item'           => __( 'Add New Offer', 'hotelizr' ),
			    'view_item'          => __( 'View Offer', 'hotelizr' ),
			    'search_items'       => __( 'Search Offers', 'hotelizr' ),
			    'not_found'          => __( 'No offer found', 'hotelizr' ),
			    'not_found_in_trash' => __( 'No offer found in trash', 'hotelizr' )
			),
			'public'          => true,
			'show_ui'         => true,
			'supports'        => array( 'title', 'editor', 'revisions' ),
			'capability_type' => 'post',
			'hierarchical'    => false,
			'menu_position'   => 5,
			'menu_icon'       => $menu_icon,
			'has_archive'     => true
		)
	);


	// Gallery
	// =============================================================================

  	$menu_icon = ( $version ) ? 'dashicons-format-gallery' : NULL;

	register_post_type('Gallery', 
		array(
			'labels' => array(
				'name'               => __( 'Gallery', 'hotelizr' ),
			    'singular_name'      => __( 'Image', 'hotelizr' ),
			    'add_new'            => __( 'Add New Image', 'hotelizr' ),
			    'add_new_item'       => __( 'Add New Image', 'hotelizr' ),
			    'edit_item'          => __( 'Edit Image', 'hotelizr' ),
			    'new_item'           => __( 'Add New Image', 'hotelizr' ),
			    'view_item'          => __( 'View Image', 'hotelizr' ),
			    'search_items'       => __( 'Search Images', 'hotelizr' ),
			    'not_found'          => __( 'No image found', 'hotelizr' ),
			    'not_found_in_trash' => __( 'No image found in trash', 'hotelizr' )
			),
			'public'          => true,
			'show_ui'         => true,
			'supports'        => array( 'title', 'revisions' ),
			'capability_type' => 'post',
			'hierarchical'    => false,
			'menu_position'   => 5,
			'menu_icon'       => $menu_icon,
			'has_archive'     => true
		)
	);


	// Press
	// =============================================================================

  	$menu_icon = ( $version ) ? 'dashicons-text' : NULL;

	register_post_type('Press', 
		array(
			'labels' => array(
				'name'               => __( 'Press', 'hotelizr' ),
			    'singular_name'      => __( 'Press', 'hotelizr' ),
			    'add_new'            => __( 'Add New press article', 'hotelizr' ),
			    'add_new_item'       => __( 'Add New press article', 'hotelizr' ),
			    'edit_item'          => __( 'Edit press article', 'hotelizr' ),
			    'new_item'           => __( 'Add New press article', 'hotelizr' ),
			    'view_item'          => __( 'View press article', 'hotelizr' ),
			    'search_items'       => __( 'Search press articles', 'hotelizr' ),
			    'not_found'          => __( 'No press article found', 'hotelizr' ),
			    'not_found_in_trash' => __( 'No press article found in trash', 'hotelizr' )
			),
			'public'          => true,
			'show_ui'         => true,
			'supports'        => array( 'title', 'revisions' ),
			'capability_type' => 'post',
			'hierarchical'    => false,
			'menu_position'   => 5,
			'menu_icon'       => $menu_icon,
			'has_archive'     => true
		)
	);
}

?>