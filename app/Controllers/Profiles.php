<?php namespace App\Controllers;

use App\Models\ProfilesModel;
use CodeIgniter\Controller;

class Profiles extends Controller
{
    public function index()
    {
        $model = new ProfilesModel();
        $data['profiles'] = $model->asArray()->orderBy('profile_name', 'asc')->findAll();
        echo view('templates/headerProfiles', $data);
        echo view('profiles/home', $data);
        echo view('templates/footerProfiles', $data);
    }

    public function addProfile()
    {
        $post = service('request')->getPost();

        $model = new ProfilesModel();
        $model->insert($post);

        return json_encode(['success'=> 'success']);
    }

    public function editProfile()
    {
        $post = service('request')->getPost();

        $model = new ProfilesModel();
        $model->save($post);

        return json_encode(['success'=> 'success']);
    }
}