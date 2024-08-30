require('dotenv').config();
const jwt = require('jsonwebtoken');
const Playlist = require('../models/Playlist');
const UserSession = require('../models/UserSession');

exports.createPlaylist = async (req, res) => {
    const{ token } = req.body;
    {
        try {
            
            const { name, description, photo } = req.body;
            console.log(name, description, photo);
            const session = new UserSession();
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const foundSession = await session.find(decoded.id, token);
            if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
            const playlist = new Playlist(decoded.id, name, description,photo);
            await playlist.create();
            res.status(201).json({ message: 'Playlist created successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message }); 
        }
    }
};


exports.addSongToPlaylist = async (req, res) => {
    const{ token } = req.body;
    {
        try {
            const { playlist_id, song_id } = req.body;
            const session = new UserSession();
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const foundSession = await session.find(decoded.id, token);
            if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
            const playlist = new Playlist();
            await playlist.addSong(playlist_id, song_id);
            res.status(201).json({ message: 'Song added to playlist' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

exports.deleteSongFromPlaylist = async (req, res) => {
    const{ token } = req.body;
    {
        try {
            const { playlist_id, song_id } = req.body;
            const session = new UserSession();
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const foundSession = await session.find(decoded.id, token);
            if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
            const playlist = new Playlist();
            await playlist.deleteSong(playlist_id, song_id);
            res.status(200).json({ message: 'Song removed from playlist' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

exports.getSongsFromPlaylist = async (req, res) => {
    const{ token } = req.body;
    {
        try {
            const { playlist_id } = req.body;
            const session = new UserSession();
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const foundSession = await session.find(decoded.id, token);
            if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
            const playlist = new Playlist();
            const songs = await playlist.getSongs(playlist_id);
            res.status(200).json(songs);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

exports.deletePlaylist = async (req, res) => {
    const{ token } = req.body;
    {
        try {
            const { playlist_id } = req.body;
            const session = new UserSession();
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const foundSession = await session.find(decoded.id, token);
            if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
            const playlist = new Playlist();
            await playlist.delete(playlist_id);
            res.status(200).json({ message: 'Playlist deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

exports.getPlaylistsAdmin = async (req, res) => {
    try {
        const playlist = new Playlist();
        const playlists = await playlist.getPlaylistsAdmin();
        res.status(200).json(playlists);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPlaylistsUser = async (req, res) => {
    const{ token } = req.body;
    {
        try {
            const session = new UserSession();
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const foundSession = await session.find(decoded.id, token);
            if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
            const playlist = new Playlist();
            const playlists = await playlist.getPlaylistsUser(decoded.id);
            res.status(200).json(playlists);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

exports.editPlaylist = async (req, res) => {
    const{ token } = req.body;
    {
        try {
            const { playlist_id, name, description } = req.body;
            const session = new UserSession();
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const foundSession = await session.find(decoded.id, token);
            if (!foundSession) return res.status(401).json({ message: 'Invalid session' });
            const playlist = new Playlist();
            await playlist.edit(playlist_id, name, description);
            res.status(200).json({ message: 'Playlist updated' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};