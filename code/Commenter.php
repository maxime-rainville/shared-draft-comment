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
}
