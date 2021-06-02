<?php namespace App\Models;

use CodeIgniter\Model;

class ProfilesModel extends Model
{
    protected $table = 'profiles';

    protected $allowedFields = ['profile_name', 'description'];

    protected $primaryKey = 'uid';
}