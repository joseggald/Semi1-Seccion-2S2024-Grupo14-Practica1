const { query } = require('express');
const pool = require('../db/dbConnection');

class User {
    constructor(first_name, last_name, email, hashed_password, created_on, updated_on, role_id, photo_url, date_of_birth) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.hashed_password = hashed_password;
      this.created_on = created_on;
      this.updated_on = updated_on;
      this.role_id = role_id;
      this.photo_url = photo_url;
      this.date_of_birth = date_of_birth;
    }

    async save() {
        const query = 'INSERT INTO users (first_name, last_name, email, hashed_password, created_on, updated_on, role_id, photo_url, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        const values = [this.first_name, this.last_name, this.email, this.hashed_password, this.created_on, this.updated_on, this.role_id, this.photo_url, this.date_of_birth];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }   
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }
}
  

module.exports = User;