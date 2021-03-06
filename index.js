const puppeteer = require('puppeteer');
const request = require('request');

async function getData() {
    return new Promise((resolve, reject) => {
        request.post('https://us-central1-firstproject-ce1f8.cloudfunctions.net/helloHttp', async function(error, response, body) {
            // console.error('error:', error);
            // console.log('statusCode:', response && response.statusCode);
            var Data = JSON.parse(body);
            if (error == null) {
                resolve(Data);
            } else {
                reject(null);
            }

        })
    });
}


(async() => {
    let browser = await puppeteer.launch({
        headless: true,
        devtools: true
    });
    const Data = await getData();
    let page = await browser.newPage();
    var allData = [];
    for (let i = 0; i < Data.data.links.length; i++) {
        await page.goto(Data.data.links[i]);
        await page.waitFor('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(1) > td:nth-child(3) b');
        let details = await page.evaluate(() => {
            return {
                name: document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(1) > td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(1) > td:nth-child(3) b').innerText : false,
                adress: document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(3) > td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(3) > td:nth-child(3) b').innerText : false,
                country: document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(4) > td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(4) > td:nth-child(3) b').innerText : false,
                malling: document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(6) > td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(6) > td:nth-child(3) b').innerText : false,
                locations: document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(8) > td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody tbody tbody tr:nth-child(8) > td:nth-child(3) b').innerText : false,
                type: document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(1)> td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(1)> td:nth-child(3) b').innerText : false,
                rank: document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2)> td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2)> td:nth-child(3) b').innerText : false,
                number: document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(3)> td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(3)> td:nth-child(3) b').innerText : false,
                status: document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(4)> td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(4)> td:nth-child(3) b').innerText : false,
                date: document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(5)> td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(5)> td:nth-child(3) b').innerText : false,
                expires: document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(6)> td:nth-child(3) b') ? document.querySelector('tbody tbody tbody tbody tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(6)> td:nth-child(3) b').innerText : false,
                sent: document.querySelector('tbody  tbody tbody  tbody  tbody tbody tbody tbody tbody > tr:nth-child(1) > td:nth-child(3) b') ? document.querySelector('tbody  tbody tbody  tbody  tbody tbody tbody tbody tbody > tr:nth-child(1) > td:nth-child(3) b').innerText : false
            }
        })
        allData.push(details);
    }
    //Gettings errors and idk why :-) 
    console.log(allData);
})();