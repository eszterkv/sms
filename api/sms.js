const smsProvider = require('./providers/twilio')
const aviationWeather = require('./services/aviation-weather')
const chatGPT = require('./services/chatgpt')

const logger = {
  error: (message, error) => {
    process.stderr.write(`${message}: ${JSON.stringify(error)}\n`)
  },
  info: (message) => {
    process.stdout.write(`${message}\n`)
  }
}

module.exports = async (req, res) => {
  try {
    const { Body: userMessage, From: fromNumber } = req.body

    if (fromNumber !== process.env.ALLOWED_PHONE_NUMBER) {
      logger.info(`Rejected message from unauthorized number: ${fromNumber}`)
      return res.status(403).end()
    }

    let response = ''

    if (userMessage.toLowerCase().startsWith('wx')) {
      const icao = userMessage.split(' ')[1]
      const weather = await aviationWeather.getWeather(icao)
      response = weather
      if (!response) throw new Error('No response from aviation weather service')
    } else {
      response = await chatGPT.getAnswer(userMessage)
      if (!response) throw new Error('No response from chatGPT')
    }

    await smsProvider.sendMessage(fromNumber, response)

    return res.status(200).end()
  } catch (error) {
    logger.error('Error processing SMS', error)
    return res.status(500).end()
  }
}