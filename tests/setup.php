<?php
require '/wordpress/wp-load.php';

$userId = 1;

// Remove the noise
$userSettings = [
	'core/edit-post' => ['welcomeGuide' => false],
	'core/edit-site' => ['welcomeGuide' => false],
	'core' => ['enableChoosePatternModal' => false],
	'_modified' => gmdate('c'),
];
update_user_meta($userId, 'wp_persisted_preferences', $userSettings);
