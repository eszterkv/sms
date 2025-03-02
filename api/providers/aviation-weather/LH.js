const puppeteer = require('puppeteer')

class AviationWeatherHungary {
  constructor() {
    this.browser = null
    this.username = process.env.MET_HU_USERNAME
    this.password = process.env.MET_HU_PASSWORD
  }

  getContent(el) {
    return el.querySelector('.sorok')?.textContent ?? el.querySelector('.j')?.textContent
  }

  async initBrowser() {
    if (!this.browser) this.browser = await puppeteer.launch({ headless: true })
  }

  async getWeather(icao) {
    try {
      await this.initBrowser()
      const page = await this.browser.newPage()
      await page.goto('https://aviation.met.hu/index2.php?lng=hu')
      await page.type('input[name="user"]', this.username)
      await page.type('input[name="passwd"]', this.password)
      await page.click('input[value="Belépés"]')
      await page.waitForSelector('.tavirat-table')

      await page.goto(`https://aviation.met.hu/hu/taviratok/index.php?ap=${icao.toUpperCase()}`)

      const metar = await page.$eval('.tavirat-row:nth-of-type(1)', this.getContent)
      const taf = await page.$eval('.tavirat-row:nth-of-type(2)', this.getContent)

      if (!metar && !taf) throw new Error(`Could not find weather info for ${icao.toUpperCase()}`)

      return { metar: metar.trim(), taf: taf.trim() }
    } catch (error) {
      throw new Error(`Failed to fetch weather for ${icao.toUpperCase()}: ${error.message}`)
    }
  }
}

module.exports = new AviationWeatherHungary()
