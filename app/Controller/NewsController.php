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
        $news->options['image'] = "public/firstnews.png";
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
        $news = new News();
        $news->where($args = array('id' => 4))->update($args = array('deleted' => 1));
    }

    public function get()
    {
        $news = new News();

        if (isset($_POST['startFrom'])) {
            $allNews = $news->setLimit(4, $_POST['startFrom'])->read();
        } else {
            $allNews = $news->setLimit(4)->read();
        }

        echo json_encode($allNews);
    }
}
