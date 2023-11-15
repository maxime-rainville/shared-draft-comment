<?php

namespace MaximeRainville\SharedDraftComment;

use SilverStripe\ORM\DataObject;
use Page;

class Selection extends DataObject
{
    /**
     * @var string
     */
    private static $table_name = 'Selection';

    /**
     * @var array
     */
     private static $db = [
        'Text' => 'HTMLText',
    ];

    private static $has_one = [
        'Page' => Page::class,
        'StartMeta' => DomMeta::class,
        'EndMeta' => DomMeta::class,
    ];

    /**
     * @var array
     */
    private static $has_many = [
        'Comments' => Comment::class,
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
}
