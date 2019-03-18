const puppeteer = require("puppeteer")
const $ = require("cheerio")
const fs = require("fs")
const FILEPATH = __dirname + '/stocks.json';

async function Scrape() {

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log('scraping...');
        
        var contents = fs.readFileSync(FILEPATH,'utf8');
        
        const parsedContent = JSON.parse(contents);
        let today,price = "";
    
        await asyncForEach(parsedContent.stocks, async (element) => {
            await page.goto(element.url);
            await page.content()
            .then(function(html) {
                today = $('#main',html).find('#surface .quoteWrapper .changePercent').text();
                price = $('#main', html).find('#surface .quoteWrapper .lastPrice').text();

                element.today = today;
                element.price = price;
    
                return element;
            })
        });

        parsedContent.lastUpdated = new Date(Date.now()).toLocaleString();
    
        fs.writeFileSync(FILEPATH, JSON.stringify(parsedContent), function (err) {
            if (err) throw err;
        })
    
    } catch (error) {
        console.log(error);
    }
   
    console.log('file updated');
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

module.exports = Scrape;