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
        await page.waitFor(2000) //implicit wait
        await page.waitForSelector('h1')
        await page.reload()
        await page.waitFor(2000)
        await page.waitForSelector('h1')
        await browser.close()
    })
})