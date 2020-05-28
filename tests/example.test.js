const puppeteer = require('puppeteer')

describe('My First Puppetter Test', () => {
    it('should launch the browser', async function() {
        const browser = await puppeteer.launch({ headless: true, slowMo: 50 })
        const page = await browser.newPage()
        await page.goto('https://example.com/')
        await page.waitForSelector('h1')
        await browser.close()
    })
})