<?php

namespace Database\Seeders;

use App\Models\AssetCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AssetCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Laptops',
                'slug' => 'laptops',
                'description' => 'Portable computers including business laptops and workstations',
                'icon' => '💻',
                'is_active' => true,
            ],
            [
                'name' => 'Desktop Computers',
                'slug' => 'desktop-computers',
                'description' => 'Desktop PCs and all-in-one computers',
                'icon' => '🖥️',
                'is_active' => true,
            ],
            [
                'name' => 'Servers',
                'slug' => 'servers',
                'description' => 'Server hardware including rack and tower servers',
                'icon' => '🖲️',
                'is_active' => true,
            ],
            [
                'name' => 'Networking Equipment',
                'slug' => 'networking-equipment',
                'description' => 'Routers, switches, access points, and network infrastructure',
                'icon' => '🌐',
                'is_active' => true,
            ],
            [
                'name' => 'Mobile Devices',
                'slug' => 'mobile-devices',
                'description' => 'Smartphones, tablets, and mobile accessories',
                'icon' => '📱',
                'is_active' => true,
            ],
            [
                'name' => 'Peripherals',
                'slug' => 'peripherals',
                'description' => 'Monitors, keyboards, mice, and other input/output devices',
                'icon' => '⌨️',
                'is_active' => true,
            ],
            [
                'name' => 'Software Licenses',
                'slug' => 'software-licenses',
                'description' => 'Operating systems, applications, and software subscriptions',
                'icon' => '💿',
                'is_active' => true,
            ],
            [
                'name' => 'Audio/Video Equipment',
                'slug' => 'audio-video-equipment',
                'description' => 'Cameras, microphones, speakers, and AV equipment',
                'icon' => '📹',
                'is_active' => true,
            ],
            [
                'name' => 'Storage Devices',
                'slug' => 'storage-devices',
                'description' => 'Hard drives, SSDs, USB drives, and storage arrays',
                'icon' => '💾',
                'is_active' => true,
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Cables, adapters, chargers, and other accessories',
                'icon' => '🔌',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            AssetCategory::create($category);
        }
    }
}