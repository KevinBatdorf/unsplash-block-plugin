<?php
/**
 * Plugin Name:       Unlimited Photos
 * Description:       Search millions of photos, AI-generated imagry, textures, wallpapers, and more.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.5.0
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

add_action('admin_enqueue_scripts', function () {
    wp_add_inline_script(
        'kevinbatdorf-unlimited-photos-editor-script',
        'window.unlimitedPhotosConfig = ' . wp_json_encode([
            // Convert to mb
            'maxUploadSize' => number_format(wp_max_upload_size() / 1048576),
        ]),
        'before'
    );
});
