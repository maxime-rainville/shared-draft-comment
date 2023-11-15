<?php

namespace MaximeRainville\SharedDraftComment;

use SilverStripe\ORM\DataObject;

class DomMeta extends DataObject
{
    /**
     * @var string
     */
    private static $table_name = 'DomMeta';

    /**
     * @var array
     */
    private static $db = [
        'TextOffset' => 'Int',
        'ParentTagName' => 'Varchar',
        'ParentIndex' => 'Int',
    ];

    private static $has_one = [
        'Selection' => Selection::class,
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
