class AviationWeather {
  async getWeather(icao) {
    const countryCode = icao.substring(0, 2).toUpperCase()

    try {
      const provider = require(`../providers/aviation-weather/${countryCode}`)
      const { metar, taf } = await provider.getWeather(icao)
      return `${metar} // ${taf}`
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        return `ERR: no provider for country code: ${countryCode}`
      }

      return `ERR: ${error.message}`
    }
  }
}

module.exports = new AviationWeather()
