require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Route for creating a payment intent
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body; // Amount in smallest currency unit (e.g., cents)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(400).send({ error: { message: error.message } });
    }
});

// Route for sending messages to Gemini AI
app.post('/gemini', async (req, res) => {
    const { prompt } = req.body;
    console.log('Using Gemini API Key:', process.env.GEMINI_API_KEY); // Debug log

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                params: { 
                    key: process.env.GEMINI_API_KEY.trim() // Ensure no whitespace
                },
                headers: { 'Content-Type': 'application/json' },
            }
        );

        // Improved error handling and response parsing
        if (!response.data.candidates || response.data.candidates.length === 0) {
            return res.status(404).json({ error: 'No response generated' });
        }

        res.json({ 
            reply: response.data.candidates[0].content.parts[0].text,
            status: 'success'
        });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Error communicating with Gemini API',
            details: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
        app.listen(PORT + 1);
    } else {
        console.error(err);
    }
});

