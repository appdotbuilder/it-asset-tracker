<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Asset
 *
 * @property int $id
 * @property string $asset_tag
 * @property string $name
 * @property int $asset_category_id
 * @property string|null $brand
 * @property string|null $model
 * @property string|null $serial_number
 * @property string|null $purchase_date
 * @property string|null $purchase_price
 * @property string $condition
 * @property string|null $description
 * @property string|null $warranty_until
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\AssetCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AssetMovement> $movements
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Asset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset query()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereAssetCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereAssetTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereCondition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset wherePurchasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereSerialNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereWarrantyUntil($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset available()
 * @method static \Database\Factories\AssetFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Asset extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'asset_tag',
        'name',
        'asset_category_id',
        'brand',
        'model',
        'serial_number',
        'purchase_date',
        'purchase_price',
        'condition',
        'description',
        'warranty_until',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'purchase_date' => 'date',
        'purchase_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include available assets.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Get the category that owns the asset.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(AssetCategory::class, 'asset_category_id');
    }

    /**
     * Get the movements for the asset.
     */
    public function movements(): HasMany
    {
        return $this->hasMany(AssetMovement::class);
    }
}