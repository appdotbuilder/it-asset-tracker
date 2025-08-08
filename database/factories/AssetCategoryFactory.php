<?php

namespace Database\Factories;

use App\Models\AssetCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AssetCategory>
 */
class AssetCategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\AssetCategory>
     */
    protected $model = AssetCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Laptops', 'icon' => '💻'],
            ['name' => 'Desktop Computers', 'icon' => '🖥️'],
            ['name' => 'Servers', 'icon' => '🖲️'],
            ['name' => 'Networking Equipment', 'icon' => '🌐'],
            ['name' => 'Mobile Devices', 'icon' => '📱'],
            ['name' => 'Peripherals', 'icon' => '⌨️'],
            ['name' => 'Software Licenses', 'icon' => '💿'],
            ['name' => 'Audio/Video Equipment', 'icon' => '📹'],
            ['name' => 'Storage Devices', 'icon' => '💾'],
            ['name' => 'Accessories', 'icon' => '🔌'],
        ];
        
        $category = fake()->randomElement($categories);
        $name = $category['name'];
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(),
            'icon' => $category['icon'],
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the category is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}