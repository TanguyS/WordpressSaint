<?php
// Meta Boxes
// =============================================================================

if (class_exists('RW_Meta_Box')) {

	add_action( 'admin_init', 'hzr_register_meta_boxes' );

	function hzr_register_meta_boxes() {

		// Declare vars
		// =============================================================================

		$prefix = 'meta_';

		$meta_boxes = array();


		// Homepage
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'layout',
			'title' => 'Home',
			'pages' => array('home'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Layout',
					'id' => $prefix . 'layout',
					'type' => 'select',
					'options' => array(
						'slider' => 'Full-screen Slider',
						'video' => 'Full-screen Video'
					)
				)
			)
		);

		$meta_boxes[] = array(
			'id' => 'slider',
			'title' => 'Slider',
			'pages' => array('home'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Images',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
			)
		);

		$meta_boxes[] = array(
			'id' => 'video',
			'title' => 'Video',
			'pages' => array('home'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'type' => 'heading',
					'name' => __( '
						You chose video, it is a really good option but you will have to be serious with it to make it work properly.<br /><br />
						1°/ You will need a mp4 video with a correct compression. <a href="https://vimeo.com/" target="_blank">Vimeo</a> makes a really good job for this. Upload your video and download it from there.<br />
						2°/ You will need to upload an image as a fallback for iOS devices (which do not support automatic play) and for mobile devices in general which have probably a too slow internet connection.<br /><br />
						', 'hotelizr' ),
					'id'   => 'disclaimer_fake_id', // Not used but needed for plugin
				),
				array(
					'name' => 'Video format MP4',
					'desc' => '',
					'id' => $prefix . 'mp4',
					'type' => 'file_advanced',
					'max_file_uploads' => 1,
					'mime_type' => 'video'
				)
				,array(
					'name' => 'Image',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'image_fallback_for_video',
					'type' => 'plupload_image'
				)
			)
		);

		$meta_boxes[] = array(
			'id' => 'pages',
			'title' => 'Home',
			'pages' => array('home'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Featured pages',
					'id' => $prefix . 'pages',
					'type' => 'multisortable'
				)
			)
		);


		// Rooms
		// =============================================================================
		
		$meta_boxes[] = array(
			'id' => 'room-id',
			'title' => 'Room',
			'pages' => array('room'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Features',
					'id' => $prefix . 'features',
					'type' => 'text',
					'clone' => true
				)
				,array(
					'name' => 'Image(s)',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
				,array(
					'name' => 'if you have a booking engine, you can provide the code of the room (or a direct link in the next field)',
					'id' => $prefix . 'code',
					'type' => 'text'
				)
				,array(
					'name' => 'direct link to book the room',
					'id' => $prefix . 'link',
					'type' => 'text'
				)
			)
		);
	

		// Gallery
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'galerie-id',
			'title' => 'Galerie',
			'pages' => array('gallery'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Images',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
			)
		);


		// Press
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'press-id',
			'title' => 'Press',
			'pages' => array('press'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Description',
					'desc' => 'description',
					'id' => $prefix . 'description',
					'type' => 'wysiwyg'
				)
				,array(
					'name' => 'Image(s)',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
				,array(
					'name' => 'Attached file',
					'desc' => 'do not attach any file will remove the download link automatically.',
					'id' => $prefix . 'file_advanced',
					'type' => 'file'
				)
			)
		);


		// Menus
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'menu-id',
			'title' => 'Menu',
			'pages' => array('menu'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Dishes',
					'id' => $prefix . 'dishes',
					'type' => 'multitext',
					'subFields' => array( 'dish' , 'price' , 'description' ),
					'clone' => true
				)
				,array(
					'name' => 'Image(s)',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
			)
		);


		// Health
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'health-id',
			'title' => 'Service',
			'pages' => array('health'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Features',
					'id' => $prefix . 'features',
					'type' => 'text',
					'clone' => true
				),
				array(
					'name' => 'Image(s)',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
			)
		);


		// Menus
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'offer-id',
			'title' => 'Offer',
			'pages' => array('offer'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Image(s)',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
				,array(
					'name' => 'if you have a booking engine, you can provide the code of the offer (or a url in the next field)',
					'id' => $prefix . 'code',
					'type' => 'text'
				)
				,array(
					'name' => 'direct link to the offer',
					'id' => $prefix . 'link',
					'type' => 'text'
				)
			)
		);


		// Event
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'event-id',
			'title' => 'Images',
			'pages' => array('event'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Features',
					'id' => $prefix . 'features',
					'type' => 'text',
					'clone' => true
				),
				array(
					'name' => 'Image(s)',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
			)
		);


		// Pages
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'pages-image-id',
			'title' => 'Images',
			'pages' => array('page'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Images',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'slider_images',
					'type' => 'plupload_image'
				)
			)
		);

		$meta_boxes[] = array(
			'id' => 'header-id',
			'title' => 'Header',
			'pages' => array('page'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Image(s)',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
			)
		);


		// Posts
		// =============================================================================

		$meta_boxes[] = array(
			'id' => 'posts-image-id',
			'title' => 'Images',
			'pages' => array('post'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Images',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'images',
					'type' => 'plupload_image'
				)
			)
		);

		$meta_boxes[] = array(
			'id' => 'posts-quote-id',
			'title' => 'Author',
			'pages' => array('post'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Author',
					'desc' => '',
					'id' => $prefix . 'author',
					'type' => 'text'
				)
			)
		);

		$meta_boxes[] = array(
			'id' => 'posts-video-id',
			'title' => 'Video',
			'pages' => array('post'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Video format MP4',
					'desc' => 'To get mp4 video with a correct compression. <a href="https://vimeo.com/" target="_blank">Vimeo</a> makes a really good job for this. Upload your video and download it from there.',
					'id' => $prefix . 'mp4',
					'type' => 'file_advanced',
					'max_file_uploads' => 1,
     				'mime_type' => 'video'
				)
				,array(
					'name' => 'Image',
					'desc' => 'Preferred size for images is width: 1920px, height: 1130px.',
					'id' => $prefix . 'image_fallback_for_video',
					'type' => 'plupload_image'
				)
			)
		);

		$meta_boxes[] = array(
			'id' => 'posts-audio-id',
			'title' => 'Audio',
			'pages' => array('post'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Audio format MP3',
					'desc' => '',
					'id' => $prefix . 'mp3',
					'type' => 'file_advanced',
					'max_file_uploads' => 1
				)
			)
		);


		// Register meta boxes
		// =============================================================================

	    foreach ( $meta_boxes as $meta_box )
	    {
	        new RW_Meta_Box( $meta_box );
	    }
	}
}
?>