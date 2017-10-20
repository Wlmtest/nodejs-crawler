var express = require('express');
var app = new express();
var axios = require('axios');
var cheerio = require('cheerio');
var url = require('url')
var cnodeUrl = 'https://cnodejs.org/';
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var ep = new eventproxy();
var pages = 100;
var pageUrls = [];
var urls = [];

    for(let i = 1; i <= pages; i++){
        let thisPath = cnodeUrl + '?tab=all&page=' + i;
        pageUrls.push(thisPath);
    }

    pageUrls.forEach(function(pageUrl){
        superagent.get(pageUrl).end(function(err,res){
            var $ = cheerio.load(res.text);
            $('.topic_title').each(function(index,element){
                var $element = $(element);
                var href = url.resolve(cnodeUrl, $element.attr('href'))
                console.log(href)
            })
        })
    })

    ep.after('topicHtml', pageUrls.length * 40, function(topicUrls){
    
    })





app.listen(3000, function(){
    console.log('listening on port 3000')
})