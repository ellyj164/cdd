<?php
// Banner Controller implementation moved to HomepageController.php for better organization
// This file serves as a redirect/alias for backward compatibility

require_once 'HomepageController.php';

// Alias for BannerController
class BannerControllerAlias extends BannerController {}
?>