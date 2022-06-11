<?php
/**
 * Plugin Name:       Unlimited Photos
 * Description:       Search over 3 million photos, textures, wallpapers, and more.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.2
 * Author:            Kevin Batdorf
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       unlimited-photos
 *
 * @package           kevinbatdorf
 */

add_action('init', function () {
    register_block_type(__DIR__ . '/build');
    wp_set_script_translations('kevinbatdorf/unlimited-photos', 'unlimited-photos');
});
