const cheerio = require('cheerio');
const superagent = require('superagent');
const eventproxy = require('eventproxy');
const url = require('url')
const cnode = 'https://cnodejs.org/'

for(let i = 1; i <=100; i++){
    let pageUrl = cnode + '?tab=all&page='+ i;
    superagent.get(pageUrl).end(function(err,res){
        if(err){
            return console.error(err)
        }
        let topicUrls = [];
        const $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function(index,element){
            let $element = $(element);
            let topicUrl = $(element).attr('href');
            let href = url.resolve(cnode, topicUrl);
            topicUrls.push(href);
        })
        topicUrls.forEach(function(topicUrl){
            superagent.get(topicUrl).end(function(err,res){
                ep.emit('topic_html', [topicUrl, res.text])
            })
        })
        let ep = new eventproxy();
        ep.after('topic_html', topicUrls.length, function(topics){
            topics = topics.map(function(topicPair){
                let topicUrl = topicPair[0];
                let topicHtml = topicPair[1];
                const $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                })
            })
            console.log(topics)
        })
    })
}
