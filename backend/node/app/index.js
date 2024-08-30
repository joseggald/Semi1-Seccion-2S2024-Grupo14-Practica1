const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors(
    {
        origin: 'http://sound-stream-semi1-seccion-g14.s3-website-us-east-1.amazonaws.com/',
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
