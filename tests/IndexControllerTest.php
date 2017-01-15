<?php

use App\Controller\IndexController;
use Framework\Bootstrap\Router;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DomCrawler\Crawler;

class IndexControllerTest extends TestCase
{

    public function testIndexActionFunctional()
    {
        $readerController = new IndexController();
        ob_start();
        $readerController->index();
        $result = ob_get_clean();

        $crawler = new Crawler($result);

        $this->assertEquals('Home', $crawler->filter('title')->text());
    }

}