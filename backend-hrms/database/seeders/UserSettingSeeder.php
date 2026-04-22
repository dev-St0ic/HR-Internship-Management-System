<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Database\Seeder;

class UserSettingSeeder extends Seeder 
{
    public function run(): void 
    {
        User::all()->each(function ($user) 
        {
            UserSetting::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'theme'                      => 'light',
                    'language'                   => 'en',
                    'two_factor_enabled'         => false,
                    'mobile_push_notifications'  => true,
                    'desktop_notifications'      => true,
                    'email_notifications'        => true,
                ]
            );
        });
    }
}