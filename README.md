# AI Chatbot with Gemini Integration

A modern chatbot implementation using Node.js and Google's Gemini AI API.

## Features

- Real-time chat interface
- AI-powered responses using Gemini API
- Email transcript functionality
- Minimizable chat window
- Typing indicators
- Error handling

## Tech Stack

- Backend: Node.js, Express
- Frontend: HTML, CSS, JavaScript
- AI: Google Gemini API
- Payment Processing: Stripe

## Setup

1. Clone the repository
```bash
git clone https://github.com/mehedihnb/Ai-chatbot
cd your-repo-name
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

4. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

- `POST /gemini` - Send messages to Gemini AI
- `POST /create-payment-intent` - Create Stripe payment intent

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `STRIPE_SECRET_KEY`: Stripe secret key
- `GEMINI_API_KEY`: Google Gemini API key
- `PORT`: Server port (default: 5000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
``` 