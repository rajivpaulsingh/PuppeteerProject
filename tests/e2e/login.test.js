const puppeteer = require('puppeteer')

describe('Login e2e test', () => {

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

    it('Login Test - Invalid Credentials', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'invalid user')
        await page.type('#user_password', 'invalid password')
        await page.click('input[type="submit"]')
        await page.waitForSelector('.alert-error') //here the . is for class (error message locator)
    })

    it('Login Test - Valid Credentials', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('input[type="submit"]')
        await page.waitForSelector('#settingsBox')
    })
})