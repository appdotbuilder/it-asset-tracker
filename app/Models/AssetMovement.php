<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AssetMovement
 *
 * @property int $id
 * @property int $asset_id
 * @property int $location_id
 * @property int $user_id
 * @property string $type
 * @property int $quantity
 * @property string|null $purpose
 * @property string|null $recipient
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon $movement_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Asset $asset
 * @property-read \App\Models\Location $location
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement query()
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereAssetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereLocationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereMovementDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereRecipient($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement incoming()
 * @method static \Illuminate\Database\Eloquent\Builder|AssetMovement outgoing()
 * @method static \Database\Factories\AssetMovementFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AssetMovement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'asset_id',
        'location_id',
        'user_id',
        'type',
        'quantity',
        'purpose',
        'recipient',
        'notes',
        'movement_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'movement_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'quantity' => 'integer',
    ];

    /**
     * Scope a query to only include incoming movements.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeIncoming($query)
    {
        return $query->where('type', 'incoming');
    }

    /**
     * Scope a query to only include outgoing movements.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOutgoing($query)
    {
        return $query->where('type', 'outgoing');
    }

    /**
     * Get the asset that owns the movement.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    /**
     * Get the location that owns the movement.
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    /**
     * Get the user that owns the movement.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}