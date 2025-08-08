<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\AssetCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Asset>
     */
    protected $model = Asset::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Apple', 'Microsoft', 'Cisco', 'Huawei'];
        $conditions = ['excellent', 'good', 'fair', 'poor'];
        $statuses = ['available', 'in_use', 'maintenance'];
        
        return [
            'asset_tag' => 'AST-' . fake()->unique()->numerify('######'),
            'name' => fake()->words(3, true),
            'asset_category_id' => AssetCategory::factory(),
            'brand' => fake()->randomElement($brands),
            'model' => fake()->bothify('Model-??##'),
            'serial_number' => fake()->bothify('SN-########'),
            'purchase_date' => fake()->dateTimeBetween('-2 years', 'now'),
            'purchase_price' => fake()->randomFloat(2, 500, 50000),
            'condition' => fake()->randomElement($conditions),
            'description' => fake()->sentence(),
            'warranty_until' => fake()->dateTimeBetween('now', '+3 years')->format('Y-m-d'),
            'status' => fake()->randomElement($statuses),
        ];
    }

    /**
     * Indicate that the asset is available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'available',
        ]);
    }

    /**
     * Indicate that the asset is in use.
     */
    public function inUse(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_use',
        ]);
    }
}