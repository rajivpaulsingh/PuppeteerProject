const puppeteer = require('puppeteer')

describe('Device Emulation', () => {

    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch({
            headless: false, 
            slowMo: 10,
            devtools: false,
        })
        // const context = await browser.createIncognitoBrowserContext() //to launch the browser in incognito mode
        // page = await context.newPage()
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function() {
        await browser.close()
    })

    it('Desktop Device Test', async function() {
        await page.setViewport( { width: 1650, height: 1050 })
        await page.goto('https://example.com/')
        await page.waitFor(2000)
    })

    it('Tablet Device Test', async function() {
        const tablet = puppeteer.devices['iPad landscape']
        await page.emulate(tablet)
        await page.goto('https://example.com/')
        await page.waitFor(2000)
    })

    it('Mobile Device Test', async function() {
        const mobile = puppeteer.devices['iPhone X']
        await page.emulate(mobile)
        await page.goto('https://example.com/')
        await page.waitFor(2000)
    })

})