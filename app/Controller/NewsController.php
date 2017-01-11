<?php

namespace App\Controller;

use App\Model\News;
use Framework\Controller\AbstractController;

class NewsController extends AbstractController
{
    public function add()
    {
        $news = new News();
        $news->options['image'] = "public/firstnews.png";
        $news->options['title'] = "Firstnews";
        $news->options['description'] = "FirstnewsFirstnews";
        $news->options['text'] = "FirstnewsFirstnewsFirstnews";
        $news->save();
    }
}
