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
}
