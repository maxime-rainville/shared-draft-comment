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
        'HighlightedText' => 'HTMLText',
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
}
