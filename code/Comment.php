<?php

namespace MaximeRainville\SharedDraftComment;

use SilverStripe\ORM\DataObject;
use SilverStripe\Security\Member;
use SilverStripe\Security\Security;

class Comment extends DataObject
{

    /**
     * @var string
     */
    private static $table_name = 'Comment';

    /**
     * @var array
     */
    private static $db = [
        'Content' => 'HTMLText',
    ];

    /**
     * @var array
     */
    private static $has_one = [
        'Commenter' => Commenter::class,
        'Selection' => Selection::class,
        'Member' => Member::class,
    ];

    public function canDelete($member = null)
    {
        return true;
    }

    public function canCreate($member = null, $context = [])
    {
        return true;
    }

    public function canEdit($member = null)
    {
        return true;
    }

    public function canView($member = null)
    {
        return true;
    }

    public function getAuthor(): array
    {
        if ($this->MemberID) {
            $member = $this->Member;
            return [
                'name' => $member->getName(),
                'email' => $member->Email,
                'avatar' => $member->Email ? 'https://www.gravatar.com/avatar/' . md5($member->Email) . '?s=64' : null,
            ];
        }

        if ($this->CommenterID) {
            $commenter = $this->Commenter;
            return [
                'name' => $commenter->Name,
                'email' => $commenter->Email,
                'avatar' => $commenter->Email ? 'https://www.gravatar.com/avatar/' . md5($commenter->Email) . '?s=64' : null,
            ];
        }

        return [];
    }

    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if ($member = Security::getCurrentUser()) {
            $this->MemberID = $member->ID;
        }
    }
}
