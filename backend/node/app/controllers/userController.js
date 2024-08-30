require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserSession = require('../models/UserSession');

exports.registerUser = async (req, res) => {
    const {first_name, last_name, email, password, role_id, photo_url, date_of_birth} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdOn = new Date();
        const user = new User(first_name, last_name, email, hashedPassword, createdOn, createdOn, role_id, photo_url, date_of_birth);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });   
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User();
        const foundUser = await user.findByEmail(email);
        console.log('usuario encontrado:',foundUser);

        if (!foundUser || !(await bcrypt.compare(password, foundUser.hashed_password))) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }

        console.log(process.env.SECRET_KEY);
        const token = jwt.sign({ id: foundUser.id, email: foundUser.email }, process.env.SECRET_KEY, { expiresIn: '190m' });
        console.log('token:',token);
        const session = new UserSession(foundUser.id, token);
        await session.save();
        res.cookie('session_token', token, { httpOnly: true, secure: false, sameSite: 'Strict' });
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.verifySession = async (req, res) => {
    const { token } = req.body;
    try {
        const session = new UserSession();
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundSession = await session.find(decoded.id, token);
        if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
        res.json({ message: 'Session is valid' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.logoutUser = async (req, res) => {
    const { token } = req.body;
    try {
        const session = new UserSession();
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundSession = await session.find(decoded.id, token);
        if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
        await session.delete(foundSession.id);
        res.clearCookie('session_token');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const { token } = req.body;
    console.log('token get user:',token);
    try {
        const session = new UserSession();
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundSession = await session.find(decoded.id, token);
        if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
        const user = new User();
        const foundUser = await user.findById(decoded.id);
        res.json(foundUser);
    } catch (error) {
        res.status(400).json({ error: error.message }); // Corregido: res.status en lugar de error.status
    }
};

exports.updatePhoto = async (req, res) => {
    const { token } = req.body;
    try {
        const session = new UserSession();
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundSession = await session.find(decoded.id, token);
        if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
        const user = new User();
        const foundUser = await user.findById(decoded.id);
        const photo_url = req.body.photo_url;
        await user.updatePhotoUrl(foundUser.id, photo_url);
        res.json({ message: 'Photo updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
