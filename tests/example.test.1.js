const puppeteer = require('puppeteer')
const expect = require('chai').expect

const { click } = require('../lib/helpers')
const { getText } = require('../lib/helpers')
const { getCount } = require('../lib/helpers')

describe('My Second Puppetter Test', () => {

    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch({
            headless: false, 
            slowMo: 10,
            devtools: false,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function() {
        await browser.close()
    })

    beforeEach(async function() {
        //Runs before each test step
    })

    afterEach(async function() {
        //Runs after each test steps
    })

    it('should interact with elements in the browser', async function() {

        await page.goto('https://example.com/')
        await page.waitForXPath('//h1') //wait for xpath 
        const title = await page.title()
        const url = await page.url()
        
        console.log('TITLE: ' + title)
        console.log('URL: ' + url)

        //Extracting a text from an element
        // const text = await page.$eval('h1', element => element.textContent)
        const text = await getText(page, 'h1') //Using custom function
        console.log('Text in the h1 tag: ' + text)

        //Get element count
        // const count = await page.$$eval('p', element => element.length) //note the 2 $ signs
        const count = await getCount(page, 'p') //Using custom function
        console.log('Number of p tags in the page is: ' + count)

        //Assertions
        expect(title).to.be.a('string', 'Example Domain')
        expect(url).to.include('example.com')
        expect(text).to.be.a('string', 'Example Domain')
        expect(count).to.equal(2)

        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#searchTerm') //its a good practice to wait for element before performing actions on it
        await page.type('#searchTerm', 'Hello World')

        //Keyboard press simulation
        await page.keyboard.press('Enter', { delay: 5 })
        await page.waitFor(2000)

        await page.goto('http://zero.webappsecurity.com/index.html')
        // await page.waitForSelector('#signin_button')
        // await page.click('#signin_button')
        await click(page, '#signin_button') //Using the custom function

        //Element not exist
        await page.waitFor(() => !document.querySelector('signin_button')) //1st way
        await page.waitForSelector('#signin_button', { hidden: true, timeout: 3000 }) //2nd way

    })
})