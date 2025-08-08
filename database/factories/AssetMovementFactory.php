<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\AssetMovement;
use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AssetMovement>
 */
class AssetMovementFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\AssetMovement>
     */
    protected $model = AssetMovement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['incoming', 'outgoing'];
        $purposes = [
            'New purchase',
            'Replacement',
            'Upgrade',
            'Maintenance',
            'Transfer',
            'Return',
            'Deployment',
            'Testing',
        ];

        return [
            'asset_id' => Asset::factory(),
            'location_id' => Location::factory(),
            'user_id' => User::factory(),
            'type' => fake()->randomElement($types),
            'quantity' => fake()->numberBetween(1, 5),
            'purpose' => fake()->randomElement($purposes),
            'recipient' => fake()->name(),
            'notes' => fake()->sentence(),
            'movement_date' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Indicate that the movement is incoming.
     */
    public function incoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'incoming',
            'purpose' => fake()->randomElement(['New purchase', 'Return', 'Transfer in']),
        ]);
    }

    /**
     * Indicate that the movement is outgoing.
     */
    public function outgoing(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'outgoing',
            'purpose' => fake()->randomElement(['Deployment', 'Transfer out', 'Maintenance']),
        ]);
    }
}