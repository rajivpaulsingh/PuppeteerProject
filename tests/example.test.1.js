const puppeteer = require('puppeteer')

describe('My First Puppetter Test', () => {
    it('should launch the browser', async function() {
        const browser = await puppeteer.launch({ 
            headless: false, 
            slowMo: 10,
            devtools: false,
        })
        const page = await browser.newPage()

        await page.goto('https://example.com/')
        const title = await page.title()
        const url = await page.url()
        
        console.log('TITLE: ' + title)
        console.log('URL: ' + url)

        //Extracting a text from an element
        const text = await page.$eval('h1', element => element.textContent)
        console.log('Text in the h1 tag: ' + text)

        await browser.close()

    })
})