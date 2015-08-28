<?php

function get_post_from_blog($args = array(), $id = 1) {
	$original_blog_id = get_current_blog_id();
	switch_to_blog($id);
	$data = get_posts($args);
	switch_to_blog( $original_blog_id );

	return $data;
}

function get_checkbox_list_from_network($args = array(), $lang = 'fr', $add_meta = array() ) {
	$original_blog_id = get_current_blog_id();
	switch_to_blog(1);
	
	global $polylang;

	// Fix for Intuitive order plugin
	$args['orderby'] = 'menu_order';
	$args['order'] = 'ASC';

	$posts = get_posts( $args );

	$list = array();
	foreach ($posts as $post) {
		if (!is_null($polylang)) {
			if ($polylang->model->get_post_language($post->ID)->slug != $lang)
				continue;
		}

		$value = $post->post_title;
	
		foreach ($add_meta as $meta) {
			$m = get_post_meta($post->ID, $meta, true);

			if (!empty( $m )):
				$value .= ' - ' . $m;
			endif;
		}
		
		$list[$post->ID] = $value;
	}
	switch_to_blog( $original_blog_id );

	return $list;
}
?>