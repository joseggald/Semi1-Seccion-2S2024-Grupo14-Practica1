const { query } = require('express');
const pool = require('../db/dbConnection');

class Playlist {
    constructor(user_id, name, description, photo) {
        this.user_id = user_id;
        this.name = name;
        this.description = description;
        this.photo = photo;
    }

    async create() {
        const query = 'INSERT INTO playlists (user_id, name, description, photo) VALUES ($1, $2, $3, $4)';
        const values = [this.user_id, this.name, this.description, this.photo];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }   
    }

    async addSong(playlists_id, song_id) {
        const query = 'INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2)';
        const values = [playlists_id, song_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteSong(playlists_id, song_id) {
        const query = 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2';
        const values = [playlists_id, song_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async getSongs (playlist_id) {
        const query = 'SELECT * FROM playlist_songs WHERE playlist_id = $1';
        const values = [playlist_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(playlist_id) {
        const query = 'DELETE FROM playlists WHERE id = $1';
        const values = [playlist_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPlaylistsAdmin() {
        const query = 'SELECT * FROM playlists';
        
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPlaylistsUser(user_id) {
        const query = 'SELECT * FROM playlists WHERE user_id = $1';
        const values = [user_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async edit(playlist_id, name, description) {
        const query = 'UPDATE playlists SET name = $2, description = $3 WHERE id = $1';
        const values = [playlist_id, name, description];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Playlist;