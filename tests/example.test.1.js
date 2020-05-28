const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('My Second Puppetter Test', () => {
    it('should interact with elements in the browser', async function() {
        const browser = await puppeteer.launch({ 
            headless: false, 
            slowMo: 10,
            devtools: false,
        })
        const page = await browser.newPage()

        //Set default timeouts
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)

        await page.goto('https://example.com/')
        const title = await page.title()
        const url = await page.url()
        
        console.log('TITLE: ' + title)
        console.log('URL: ' + url)

        //Extracting a text from an element
        const text = await page.$eval('h1', element => element.textContent)
        console.log('Text in the h1 tag: ' + text)

        //Get element count
        const count = await page.$$eval('p', element => element.length) //note the 2 $ signs
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
        await page.waitFor(5000)

        await browser.close()

    })
})