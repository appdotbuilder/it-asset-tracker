<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LocationSeeder::class,
            AssetCategorySeeder::class,
        ]);

        User::factory()->create([
            'name' => 'IT Admin',
            'email' => 'admin@example.com',
            'location_id' => 1,
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'IT Staff Jakarta',
            'email' => 'staff@example.com',
            'location_id' => 1,
            'role' => 'it_staff',
        ]);
    }
}
