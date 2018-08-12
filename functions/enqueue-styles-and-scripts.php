<?php
function theme_enqueue_scripts() {
    wp_enqueue_style( 'google_fonts', 'https://fonts.googleapis.com/css?family=Montserrat:400i,500,700,900|Open+Sans', false );
	wp_enqueue_style( 'main_css', get_stylesheet_directory_uri() . '/css/main.css', array(), microtime() );
	wp_enqueue_script( 'main_js', get_stylesheet_directory_uri() . '/js/scripts-bundled.js', NULL, microtime(), true );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts', 11 );
?>