<section class="nav-bar clearfix relative part">
    <div class="nav pull-left">
        <div class="shortNavButton relative">
            <button type="button" class="hamburger" data-toggleFade="#navigation-down">
                <span class="sr-only"><?php _e("Toggle navigation", "hy"); ?></span>
                <span class="icon-bar dark-background"></span>
                <span class="icon-bar dark-background"></span>
                <span class="icon-bar dark-background"></span>
            </button>
            <div id="navigation-down" class="hide" data-fillW="100" data-fillH="100" data-hLess="40">
                <div id="navWrapperDown" class="relative">
                    <?php
                        wp_nav_menu( array(
                            'menu'              => 'primary',
                            'theme_location'    => 'primary',
                            'depth'             => 2,
                            'container'         => 'div',
                            'container_class'   => '',
                            'container_id'      => 'primaryNavBarDown',
                            'menu_class'        => 'prim no-style',
                            'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                            'walker'            => new wp_bootstrap_navwalker())
                        );
                    ?>
                </div>
            </div>
        </div>
        <div id="navigation" class="uppercase">
            <div id="navWrapper" class="relative">
                <?php
                    wp_nav_menu( array(
                        'menu'              => 'primary',
                        'theme_location'    => 'primary',
                        'depth'             => 2,
                        'container'         => 'div',
                        'container_class'   => '',
                        'container_id'      => 'primaryNavBar',
                        'menu_class'        => 'prim no-style uppercase',
                        'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                        'walker'            => new wp_bootstrap_navwalker())
                    );
                ?>
            </div>
        </div>
    </div>