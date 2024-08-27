const { query } = require('express');
const pool = require('../db/dbConnection');

class UserSession {
    constructor(user_id, token) {
        this.user_id = user_id;
        this.token = token;
        this.created_at = new Date();
        this.expires_at = new Date(this.created_at.getTime() + 30 * 60000);
    }

    async save() {
        const query = 'INSERT INTO user_sessions (user_id, token, created_at, expires_at) VALUES ($1, $2, $3, $4)';
        const values = [this.user_id, this.token, this.created_at, this.expires_at];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }   
    }

    async find(userId, token) {
        const query = 'SELECT * FROM user_sessions WHERE user_id = $1 AND token = $2';
        const values = [userId, token];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        const query = 'DELETE FROM user_sessions WHERE id = $1';
        const values = [id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UserSession;