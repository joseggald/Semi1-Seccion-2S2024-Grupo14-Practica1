const { query } = require('express');
const pool = require('../db/dbConnection');

class Favorite {
    constructor(user_id, song_id) {
        this.user_id = user_id;
        this.song_id = song_id;
    }

    async save() {
        const query = 'INSERT INTO favorites (user_id, song_id) VALUES ($1, $2)';
        const values = [this.user_id, this.song_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }   
    }

    async delete() {
        const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';
        const values = [this.user_id, this.song_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByUserId(user_id) {
        const query = 'SELECT * FROM favorites WHERE user_id = $1';
        const values = [user_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Favorite;