const twilio = require('twilio')

class TwilioProvider {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )
  }

  async sendMessage(to, body) {
    try {
      const result = await this.client.messages.create({
        body,
        to,
        from: process.env.TWILIO_PHONE_NUMBER
      })
      return {
        success: true,
        messageId: result.sid,
        provider: 'twilio'
      }
    } catch (error) {
      throw new Error(`Twilio SMS sending failed: ${error.message}`)
    }
  }
}

module.exports = new TwilioProvider() 