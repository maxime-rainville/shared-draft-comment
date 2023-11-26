<?php
namespace MaximeRainville\SharedDraftComment;

use SilverStripe\Security\Security;

class WhoAmIResolver
{
    public static function resolve(): ?array
    {
        if ($member = Security::getCurrentUser()) {
            return [
                'name' => $member->getName(),
                'email' => $member->Email,
                'avatar' => $member->Email ? 'https://www.gravatar.com/avatar/' . md5($member->Email) . '?s=64' : null,
            ];
        }

        return null;
    }
}
