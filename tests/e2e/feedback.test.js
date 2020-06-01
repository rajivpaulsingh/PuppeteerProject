const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Feedback e2e test', () => {

    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch( { 
            headless: true, 
            slowMo: 0, 
            devtools: false 
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function() {
        await browser.close()
    })

    it('Display Feedback Form', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#feedback')
        await page.click('#feedback')
    })

    it('Submit Feedback Form', async function() {
        await page.waitForSelector('form')
        await page.type('#name', 'Rajiv')
        await page.type('#email', 'Rajiv@rajiv.com')
        await page.type('#subject', 'Test subject')
        await page.type('#comment', 'Random message in the text area')
        await page.click('input[type="submit"]')
    })

    it('Display Results Page', async function() {
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('/sendFeedback.html')
    })
})