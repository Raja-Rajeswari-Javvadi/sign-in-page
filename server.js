// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/signinDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('MongoDB connected'));
db.on('error', console.error.bind(console, 'MongoDB error:'));

// Schema and Model
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

// Route to handle sign-in
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Optional: Check if user exists, validate password, etc.
    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: 'User signed in and data saved!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
