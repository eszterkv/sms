const smsProvider = require('./providers/twilio')
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

    const response = await chatGPT.getAnswer(userMessage)
    await smsProvider.sendMessage(fromNumber, response)

    return res.status(200).end()
  } catch (error) {
    logger.error('Error processing SMS', error)
    return res.status(500).end()
  }
}