const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use(express.json());
app.use(cookieParser());

app.use('/users', require('./routes/users'));
app.use('/s3', require('./routes/s3'));
app.use('/songs', require('./routes/songs'));
app.use('/playlists', require('./routes/playlists'));


app.listen(8000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:8000');
});
