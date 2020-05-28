const puppeteer = require('puppeteer')

describe('My First Puppetter Test', () => {
    it('should launch the browser', async function() {
        const browser = await puppeteer.launch({ 
            headless: false, 
            slowMo: 10,
            devtools: false,
        })
        const page = await browser.newPage()

        // await page.goto('https://example.com/')
        // await page.waitFor(1000) //implicit wait
        // await page.waitForSelector('h1')
        // await page.goto('https://dev.to/')
        // await page.waitForSelector('#top-bar')
        // await page.goBack()
        // await page.waitForSelector('h1')
        // await page.goForward()
        // await page.waitForSelector('#top-bar')
        // await browser.close()

        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.type('#developer-name', 'Rajiv', { delay: 500 }) //Added delay to type is slowly ~ 500 miliseconds
        await browser.close()

    })
})