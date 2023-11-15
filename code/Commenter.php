<?php

namespace MaximeRainville\SharedDraftComment;

use SilverStripe\ORM\DataObject;

class Commenter extends DataObject
{

    /**
     * @var string
     */
    private static $table_name = 'Commenter';

    /**
     * @var array
     */
    private static $db = [
        'FirstName' => 'Varchar',
        'Surname' => 'Varchar',
        'HexCode' => 'Varchar',
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
