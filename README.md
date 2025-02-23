# SMS ChatGPT

This project integrates Twilio's SMS service with OpenAI's ChatGPT to provide automated responses to SMS messages.

## Costs (200 messages/month)
- Twilio: $1.00 (phone number) + $1.58 (SMS) = $2.58
- OpenAI API: ~$0.10
- Total: ~$2.68/month

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

To start the development server, use:

```bash
npm run dev
```

## Setup Twilio

1. Sign up for a Twilio account
2. Get a phone number
3. Set up webhook URL in Twilio dashboard to point to your deployment URL:
   - If using Vercel: `https://your-project-name.vercel.app/api/sms`
4. Configure environment variables

## Environment Variables

Make sure to set the following environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key
- `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
- `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
- `TWILIO_PHONE_NUMBER`: Your Twilio phone number
- `ALLOWED_PHONE_NUMBER`: Your phone number that is allowed to send messages

Phone numbers must be in `+XXXXXXXXXXXX` format (e.g. `+12345678901`)

## License

This project is licensed under the MIT License.
