<?php

namespace MaximeRainville\SharedDraftComment;

use SilverStripe\Control\Director;
use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;


class ShareDraftControllerExtension extends Extension
{
    /**
     * @config
     */
    private static $shared_draft_comment_selector = 'body';

    public function updatePage($page)
    {
        $sharedDraftComment = [
            'graphqlUrl' => Director::baseURL() . 'shared-draft-comment/graphql',
            'pageID' =>  $page->ID,
            'selector' => $this->getOwner()->config()->get('shared_draft_comment_selector'),
        ];

        Requirements::customScript(
            sprintf('var sharedDraftComment = %s;', json_encode($sharedDraftComment)),
            'sharedDraftComment'
        );
        Requirements::javascript('maxime-rainville/shared-draft-comment: build/static/js/bundle.js');
    }
}
