require("dotenv").config();
const Song = require("../models/Song");

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
        const { name } = req.params;
        const song = new Song();
        const foundSongs = await song.getByNameAdmin(name);
        res.status(200).json(foundSongs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getByAuthorAdmin = async (req, res) => {
    try {
        const { author } = req.params;
        const song = new Song();
        const foundSongs = await song.getByAuthorAdmin(author);
        res.status(200).json(foundSongs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// getting songs for user