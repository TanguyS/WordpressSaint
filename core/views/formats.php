<?php
global $_args;

if (!empty($_args)) {
	query_posts($_args);
}
if (have_posts()) : while (have_posts()) : the_post();
setup_postdata($post);

	$format = get_post_format($post->ID);

	$data = prepare_data($post);


	if ($format == 'gallery' || $format == 'image') {

		get_partial('image', $data);
	}

	else if ($format == 'quote') {

		get_partial('quote', $data);
	}

	else if ($format == 'audio') {

		get_partial('audio', $data);
	}

	else if ($format == 'video') {

		get_partial('video', $data);
	}

	else {
		get_partial('content', $data);
	}

endwhile; endif;
wp_reset_query();
?>