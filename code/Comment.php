<?php

namespace MaximeRainville\SharedDraftComment;

use SilverStripe\ORM\DataObject;

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
    ];

}
