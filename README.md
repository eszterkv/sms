# SMS ChatGPT

This project integrates Twilio's SMS service with OpenAI's ChatGPT to provide automated responses to SMS messages.

## Motivation

I use a dumb phone as my daily driver, and the only missing feature was ChatGPT integration. Here it is.

## Approximated costs (100 messages/month)
- Twilio: $3 (phone number) + $7.90 (outbound SMS @ $0.079/msg) + $3.80 (inbound SMS @ $0.038/msg) = $14.70
- OpenAI API: ~$0.05
- Total: ~$14.75/month

A lower-usage estimate (30 messages/month) would be $3 (phone number) + $2.37 (outbound SMS) + $1.14 (inbound SMS) = $6.51/month.

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
2. Get a phone number (preferably a local number or a number in the EU — some countries are cheaper than others)
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
