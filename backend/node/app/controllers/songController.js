require("dotenv").config();
const jwt = require('jsonwebtoken');
const Song = require("../models/Song");
const Favorite = require("../models/Favorite");
const UserSession = require('../models/UserSession');

exports.createSong = async (req, res) => {
  try {
    const { name, photo, duration, artist_name, mp3_file } = req.body;
    const song = new Song(name, photo, duration, artist_name, mp3_file);
    await song.save();
    res.status(201).json({ message: "Song created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSong = async (req, res) => {
    const { id } = req.params;
    try {
        const song = new Song();
        const foundSong = await song.getById(id);
        if (!foundSong) return res.status(404).json({ error: 'Song not found' });
        await song.delete(id);
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateSong = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, photo, duration, artist_name, mp3_file } = req.body;
        const song = new Song(name, photo, duration, artist_name, mp3_file);
        const foundSong = await song.getById(id);
        if (!foundSong) return res.status(404).json({ error: 'Song not found' });
        await song.update(id);
        res.status(200).json({ message: 'Song updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSongById = async (req, res) => {
    const { id } = req.params;
    try {
        const song = new Song();
        const foundSong = await song.getById(id);
        if (!foundSong) return res.status(404).json({ error: 'Song not found' });
        res.status(200).json(foundSong);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// adding songs to favorites
exports.addToFavorites = async (req, res) => {
    const{ token } = req.body;
    try {
        const { song_id } = req.body;
        const session = new UserSession();
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundSession = await session.find(decoded.id, token);
        if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
        const favorite = new Favorite(decoded.id, song_id);
        await favorite.save();
        res.status(201).json({ message: 'Song added to favorites' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// removing songs from favorites
exports.removeFromFavorites = async (req, res) => {
    const{ token } = req.body;
    try {
        const { song_id } = req.body;
        const session = new UserSession();
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundSession = await session.find(decoded.id, token);
        if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
        const favorite = new Favorite(decoded.id, song_id);
        await favorite.delete();
        res.status(200).json({ message: 'Song removed from favorites' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getFavoritesUser = async (req, res) => {
    const{ token } = req.body;
    try {
        const session = new UserSession();
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundSession = await session.find(decoded.id, token);
        if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
        const favorite = new Favorite();
        const favorites = await favorite.getByUserId(decoded.id);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// getting songs for admin
exports.getAllAdmin = async (req, res) => {
    try {
        const song = new Song();
        const songs = await song.getAllAdmin();
        res.status(200).json(songs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getByNameAdmin = async (req, res) => {
    try {
        const { name } = req.body;
        const song = new Song();
        const foundSongs = await song.getByNameAdmin(name);
        res.status(200).json(foundSongs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getByAuthorAdmin = async (req, res) => {
    try {
        const { author } = req.body;
        const song = new Song();
        const foundSongs = await song.getByAuthorAdmin(author);
        res.status(200).json(foundSongs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// getting songs for user and adding a parameter to show if the song is in favorites
exports.getAllUser = async (req, res) => {
    const{ token } = req.body;
    try {
        const session = new UserSession();
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundSession = await session.find(decoded.id, token);
        if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
        const song = new Song();
        const songs = await song.getAllUser(decoded.id);
        res.status(200).json(songs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};