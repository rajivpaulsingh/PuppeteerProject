const puppeteer = require('puppeteer')

describe('Payment 2e2 test', ()=> {

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

        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('input[type="submit"]')
    })

    after(async function() {
        await browser.close()
    })

    it('Display payment form', async function() {
        await page.waitForSelector('.nav-tabs')
        await page.click('#pay_bills_tab')
        await page.waitForSelector('.board')
    })

    it('Make payment', async function() {
        await page.select('#sp_payee', 'Apple')
        await page.select('#sp_account', 'Credit Card')
        await page.type('#sp_amount', '500')
        await page.type('#sp_date', '2020-05-25')
        await page.keyboard.press('Enter')
        await page.type('#sp_description', 'Payment for rent')
        await page.click('#pay_saved_payees')
        await page.waitForSelector('#alert_content')
    })
})