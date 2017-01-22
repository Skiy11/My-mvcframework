<?php

namespace App\Controller;

use App\Model\News;
use Framework\Controller\AbstractController;

class NewsController extends AbstractController
{
    public function index()
    {
        $this->view->renderView('theme.phtml');
    }

    public function add()
    {
        $news = new News();
        $news->options['image'] = "/img/img-post.jpg";
        $news->options['title'] = $_POST['title-news'];
        $news->options['text'] = $_POST['text-news'];
        $news->save();

        echo json_encode($news->options);
    }

    public function edit()
    {
        $news = new News();
        $news->where($args = array('id' => 1))->update($args = array('title' => 'UpdatedNews7'));
    }

    public function delete()
    {
        $idDeletedNews = json_decode($_POST['id']);
        $news = new News();
        $news->where($args = array('id' => $idDeletedNews))->update($args = array('deleted' => 1));
    }

    public function get()
    {
        $news = new News();

        if (isset($_POST['startFrom'])) {
            $allNews = $news->where($args = array('deleted' => 0))->orderBy($args = array('first' => 'created_at'))->setLimit($_POST['startFrom'], 4)->read();
        } else {
            $allNews = $news->where($args = array('deleted' => 0))->orderBy($args = array('first' => 'created_at'))->setLimit(4)->read();
        }

        echo json_encode($allNews);
    }
}
