const { query } = require('express');
const pool = require('../db/dbConnection');

class Song {
    constructor(name, photo, duration, artist_name, mp3_file) {
        this.name = name;
        this.photo = photo;
        this.duration = duration;
        this.artist_name = artist_name;
        this.mp3_file = mp3_file;
    }

    async save() {
        const query = 'INSERT INTO songs (name, photo, duration, artist_name, mp3_file) VALUES ($1, $2, make_interval(secs => $3), $4, $5)';
        const values = [this.name, this.photo, this.duration, this.artist_name, this.mp3_file];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }   
    }

    async update(id) {
        const query = 'UPDATE songs SET name = $1, photo = $2, duration = make_interval(secs => $3), artist_name = $4, mp3_file = $5 WHERE id = $6';
        const values = [this.name, this.photo, this.duration, this.artist_name, this.mp3_file, id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        const query = 'DELETE FROM songs WHERE id = $1';
        const values = [id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        const query = 'SELECT * FROM songs WHERE id = $1';
        const values = [id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllAdmin() {
        const query = 'SELECT * FROM songs';
        
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByNameAdmin(name) {
        const query = 'SELECT * FROM songs WHERE name LIKE $1';
        const values = [`%${name}%`];

        try {
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByAuthorAdmin(author) {
        const query = 'SELECT * FROM songs WHERE artist_name LIKE $1';
        const values = [`%${author}%`];;
        
        try {
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllUser(user_id) {
        const query = `
            SELECT 
                s.*, 
                CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END AS is_favorite
            FROM 
                songs s 
            LEFT JOIN 
                favorites f 
            ON 
                s.id = f.song_id 
                AND f.user_id = $1
        `;
        const values = [user_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }
    
}

module.exports = Song;