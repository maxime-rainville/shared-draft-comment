<?php

namespace MaximeRainville\SharedDraftComment;

use PharIo\Manifest\Requirement;
use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class ShareDraftControllerExtension extends Extension
{
    public function updatePage($page)
    {
        Requirements::customScript('var sharedDraftComment = {pageID: ' . $page->ID . '};', 'sharedDraftComment');
        Requirements::javascript('maxime-rainville/shared-draft-comment: build/static/js/bundle.js');
    }
}
