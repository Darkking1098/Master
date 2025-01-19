<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $table = 'menu_items';

    protected $casts = [
        'menu_id' => 'int',
        'group_id' => 'int',
        'index' => 'float',
        'is_visible' => 'bool',
        'is_active' => 'bool'
    ];

    protected $fillable = [
        'menu_id',
        'group_id',
        'index',
        'uri',
        'icon',
        'title',
        'type',
        'is_visible',
        'is_active'
    ];

    public function menu_item()
    {
        return $this->belongsTo(MenuItem::class, 'group_id');
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function items()
    {
        return $this->hasMany(MenuItem::class, 'group_id')->orderBy('index');
    }

    public function visibleItems()
    {
        return $this->items()->visible();
    }

    public function scopeVisible($query)
    {
        return $query->where('is_visible', 1)->where('is_active', 1);
    }
}
