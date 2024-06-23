const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Use transaction routes
app.use('/api', transactionRoutes);

// MongoDB connection details
const username = 'charulchim18';
const password = 'Charul@90';  // Example password with special characters
const cluster = 'interntask.bz0ypuo.mongodb.net';
const database = 'Text';

// Encode the password
const encodedPassword = encodeURIComponent(password);

// Construct the MongoDB connection string
const connectionString = `mongodb+srv://${username}:${encodedPassword}@${cluster}/${database}?retryWrites=true&w=majority`;

// Connect to MongoDB using mongoose
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
