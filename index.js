const crawler = require('./app.js');
(async()=>{
    let results = await crawler.fetchSinglePage(0)
    console.log(results)
})().then(r =>{
    console.log('done')
    process.exit(0)
}).catch(e=>{
    console.log(e)
    process.exit(1)
})