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
        $allNews = $news->where($args = array('id' => 1, 'image' => 'public/news.png'))
            ->orderBy($args = array('first' => 'id', 'second' => 'created_at'), 'desc')
            ->setLimit(10)
            ->read();
    }
}
