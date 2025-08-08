<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Location
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string|null $address
 * @property string $city
 * @property string $country
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AssetMovement> $assetMovements
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Location newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Location newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Location query()
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location active()
 * @method static \Database\Factories\LocationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Location extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'address',
        'city',
        'country',
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
     * Scope a query to only include active locations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the users for the location.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the asset movements for the location.
     */
    public function assetMovements(): HasMany
    {
        return $this->hasMany(AssetMovement::class);
    }
}