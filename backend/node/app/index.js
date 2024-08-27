const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/users', require('./routes/users'));

app.listen(8000, () => {
    console.log(`Server running on http://127.0.0.1:8000`);
});