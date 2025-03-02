# SMS services

This project allows you to send and receive SMS messages and run arbitrary services.

Currently, it supports:
- ChatGPT
- aviation weather.

## Motivation

I use a dumb phone as my daily driver. I started writing this service because I missed access to ChatGPT, and I have since expanded it to support other functionality.

## Approximate costs

**DISCLAIMER:** My calculations are an estimate and specific to my geography and usage. Please do your own math before using it. All responsibility for the correctness of the calculations and incurred costs is yours.

Important: You need to have a paid SMS provider account and a paid OpenAI API account, both with available credits.

OpenAI's free tier has a limited quota and will return `insufficient_quota` errors when exceeded. Visit https://platform.openai.com/account/billing to set up a paid account.

### 100 messages/month

- Twilio: $3 (phone number) + $7.90 (outbound SMS @ $0.079/msg) + $3.80 (inbound SMS @ $0.038/msg) = $14.70
- OpenAI API: ~$0.05
- Total: ~$14.75/month

### 30 messages/month

- Twilio: $3 (phone number) + $2.37 (outbound SMS) + $1.14 (inbound SMS) = $6.51/month
- OpenAI API: ~$0.015
- Total: ~$6.53/month

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

## Setup an SMS provider

### Twilio

1. Sign up for a Twilio account
2. Get a phone number (preferably a local number or a number in the EU — some countries are cheaper than others)
3. Set up webhook URL in Twilio dashboard to point to your deployment URL:
   - If using Vercel: `https://your-project-name.vercel.app/api/sms`
4. Configure environment variables

### Other providers

Coming later.

## Environment Variables

### Must haves

#### Basic configuration
- `ALLOWED_PHONE_NUMBER`: Your phone number that is allowed to send messages
Phone numbers must be in `+XXXXXXXXXXXX` format (e.g. `+12345678901`)

#### SMS provider specific configuration
- `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
- `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
- `TWILIO_PHONE_NUMBER`: Your Twilio phone number

### Services

#### ChatGPT
- `OPENAI_API_KEY`: Your OpenAI API key

#### Aviation weather
- `BROWSERLESS_TOKEN`: Your Browserless token for running the scraping service

Check specific providers for their configuration in `/api/providers/aviation/weather/XX.js` where XX is the ICAO country prefix.

## Known caveats

- If you have an international number, replies come from a generic Twilio phone number, not the `TWILIO_PHONE_NUMBER` you set up in the Twilio dashboard.

## License

This project is licensed under the MIT License.
