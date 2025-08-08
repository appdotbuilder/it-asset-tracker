<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Head Office Jakarta',
                'code' => 'JKT',
                'address' => 'Jl. Sudirman No. 123',
                'city' => 'Jakarta',
                'country' => 'Indonesia',
                'is_active' => true,
            ],
            [
                'name' => 'Branch Office Surabaya',
                'code' => 'SBY',
                'address' => 'Jl. Basuki Rachmat No. 456',
                'city' => 'Surabaya',
                'country' => 'Indonesia',
                'is_active' => true,
            ],
            [
                'name' => 'Branch Office Bandung',
                'code' => 'BDG',
                'address' => 'Jl. Asia Afrika No. 789',
                'city' => 'Bandung',
                'country' => 'Indonesia',
                'is_active' => true,
            ],
            [
                'name' => 'Branch Office Medan',
                'code' => 'MDN',
                'address' => 'Jl. Gatot Subroto No. 321',
                'city' => 'Medan',
                'country' => 'Indonesia',
                'is_active' => true,
            ],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}