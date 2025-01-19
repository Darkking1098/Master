<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'menus';
    public $timestamps = false;

    protected $casts = [
        'is_active' => 'bool'
    ];

    protected $fillable = [
        'title',
        'is_active'
    ];

    public function items()
    {
        return $this->hasMany(MenuItem::class)->where('group_id', null)->orderBy('index');
    }

    public function visibleItems()
    {
        return $this->items()->with(['visibleItems']);
    }
}
