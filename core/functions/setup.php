<?php

// Theme Setup
// =============================================================================
if ( ! function_exists( 'st_activate_theme' ) ) :
    function st_activate_theme() {

        // Responsive images.
        // =============================================================================

        update_option('thumbnail_size_w', 640);
        update_option('thumbnail_size_h', 377);

        update_option('medium_size_w', 1280);
        update_option('medium_size_h', 753);

        update_option('large_size_w', 1920);
        update_option('large_size_h', 1130);

    }
add_action('after_switch_theme', 'st_activate_theme'); 
endif;



if ( ! function_exists( 'st_setup_theme' ) ) :
    function st_setup_theme() {

        // Automatic feed links.
        // Adds RSS feed links to <head> for posts and comments.
        // =============================================================================

        add_theme_support( 'automatic-feed-links' );



        // Post formats.
        // =============================================================================

        add_theme_support( 'post-formats', array( 'gallery', 'quote', 'image', 'video', 'audio' ) );



        // WordPress menus
        // =============================================================================

        register_nav_menus( array(
          'primary' => __( 'Primary Menu', 'hotelizr' ),
          'footer'  => __( 'Footer Menu', 'hotelizr' )
        ) );


        // Allow shortcodes in widgets.
        // =============================================================================

        add_filter( 'widget_text', 'do_shortcode' );



        // Remove unnecessary stuff.
        //
        // 1. Version number (for security).
        // 2. Really simple discovery.
        // 3. Windows live writer.
        // 4. Post relational links.
        // =============================================================================

        remove_action( 'wp_head', 'wp_generator' );                    // 1
        remove_action( 'wp_head', 'rsd_link' );                        // 2
        remove_action( 'wp_head', 'wlwmanifest_link' );                // 3
        remove_action( 'wp_head', 'start_post_rel_link' );             // 4
        remove_action( 'wp_head', 'index_rel_link' );                  // 4
        remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head' ); // 4



        // Remove unneeded widgets that have undesirable query overhead
        // =============================================================================
        
        add_action( 'widgets_init', 'remove_unneeded_widgets' );

        function remove_unneeded_widgets() {
            unregister_widget('WP_Widget_Pages');
            unregister_widget('WP_Widget_Calendar');
            unregister_widget('WP_Widget_Tag_Cloud');
            unregister_widget('WP_Nav_Menu_Widget');
        }



        // Hide admin bar
        // =============================================================================
        
        add_filter( 'show_admin_bar', '__return_false' );



        // WPML browser redirect fix.
        // https://wpml.org/forums/topic/browser-language-detection-is-not-working/
        // =============================================================================

        if (function_exists('icl_get_home_url')) {
            function wpml_browser_redirect_fix(){
                global $sitepress, $post;

                $browser_language_code = substr( $_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2 );
                $active_languages = $sitepress->get_active_languages();
                 
                $reffered = @$_SERVER['HTTP_REFERER'];
                 
                foreach( $active_languages as $language_code => $language ){
                    if( $browser_language_code == $language_code && !$reffered ){
                        if ( is_home() || is_front_page() ) {
                            if( $sitepress->get_current_language() != $language_code ){
                                wp_redirect( $sitepress->convert_url( site_url(), $browser_language_code ) );
                            }
                        } 
                        else {
                            if( $post->ID ){
                                if( $sitepress->get_current_language() != $language_code ){
                                    $post_type = get_post_type( $post->ID );
                                    wp_redirect( get_permalink( icl_object_id( $post->ID, $post_type, true, $language_code ) ) );
                                }
                            }
                        }
                    }
                }
            }
               
            add_action( 'wp_head', 'wpml_browser_redirect_fix', 0 );
        }



        // Remove unused menus
        // =============================================================================

        add_action('admin_head', 'remove_menu');

        function remove_menu() {
            global $menu;
            unset($menu[2]);
            unset($menu[25]);
        }

    }
    add_action( 'after_setup_theme', 'st_setup_theme' );
endif;
?>