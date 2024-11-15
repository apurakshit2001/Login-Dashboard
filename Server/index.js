const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/Data')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    first_name: String,
    // last_name: String,
    // ph_number: Number,
});

const userModel = mongoose.model('Contacts', userSchema);

app.get('/getContacts', (req, res) => {
    userModel.find({})
        .then((Contacts) => {
            res.json(Contacts);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
