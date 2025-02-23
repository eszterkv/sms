const twilio = require('twilio')
const { OpenAI } = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const logger = {
  error: (message, error) => {
    process.stderr.write(`${message}: ${JSON.stringify(error)}\n`)
  },
  info: (message) => {
    process.stdout.write(`${message}\n`)
  }
}

const sendSMS = (to, body) => {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE_NUMBER
  })
}

module.exports = async (req, res) => {
  try {
    const { Body: userMessage, From: fromNumber } = req.body

    if (fromNumber !== process.env.ALLOWED_PHONE_NUMBER) {
      logger.info(`Rejected message from unauthorized number: ${fromNumber}`)
      return res.status(403).end()
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'you are a helpful assistant. provide concise answers under 160 characters. please use lowercase letters.'
        },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 60
    })

    const response = completion.choices[0].message.content
    await sendSMS(fromNumber, response)

    logger.info(`Processed message from ${fromNumber}`)
    return res.status(200).end()
  } catch (error) {
    logger.error('Error processing SMS', error)
    return res.status(500).end()
  }
} 