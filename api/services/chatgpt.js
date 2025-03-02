const { OpenAI } = require('openai')

class ChatGPT {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }

  async getAnswer(userMessage) {
    try {
      const completion = await this.client.chat.completions.create({
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
      return completion.choices[0].message.content
    } catch (error) {
      throw new Error(`ChatGPT API failed: ${error.message}`)
    }
  }
}

module.exports = new ChatGPT()