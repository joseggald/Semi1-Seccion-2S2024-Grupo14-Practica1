const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const {first_name, last_name, email, password, role_id, photo_url, date_of_birth} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        createdOn = new Date();
        const user = new User(first_name, last_name, email, hashedPassword, createdOn, createdOn, role_id, photo_url, date_of_birth);
        await user.save();
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(400).json({error: error.message });   
    }
};