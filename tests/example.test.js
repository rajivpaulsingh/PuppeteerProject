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

        //Input fields
        await page.type('#developer-name', 'Rajiv', { delay: 200 }) //Added delay to type is slowly ~ 200 milliseconds

        //Checkbox
        await page.click('#tried-test-cafe', { clickCount: 4 }) //the clickCount is how many times it can click

        //Drop-down
        await page.select('#preferred-interface', 'JavaScript API')
        await browser.close()

    })
})