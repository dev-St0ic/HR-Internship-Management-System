<?php
require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = \Illuminate\Http\Request::capture()
);

$users = \App\Models\User::with('role')->select('id', 'email', 'first_name', 'last_name', 'role_id')->get();

foreach ($users as $user) {
    echo "ID: {$user->id}, Email: {$user->email}, Name: {$user->first_name} {$user->last_name}, Role ID: {$user->role_id}\n";
}
