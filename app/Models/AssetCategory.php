<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\AssetCategory
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string|null $icon
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Asset> $assets
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetCategory active()
 * @method static \Database\Factories\AssetCategoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AssetCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the assets for the category.
     */
    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
}