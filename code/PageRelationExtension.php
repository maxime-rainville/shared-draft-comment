<?php

namespace MaximeRainville\SharedDraftComment;

use Page;
use SilverStripe\ORM\DataExtension;

class PageRelationExtension extends DataExtension
{
    private static $has_many = [
        'Selections' => Selection::class,
    ];
}