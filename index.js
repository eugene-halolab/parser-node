const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());


const express = require('express')
const app = express()
const port = 3003
app.get('/', async (request, response) => {
  const { url } = request.query;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: ['networkidle2'] });

  const element = await page.$('#data')
  const data = await (await element.getProperty('textContent')).jsonValue()

  await browser.close()

  response.json(JSON.parse(data))
})


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})