require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const upload = multer({ storage: multer.memoryStorage() }).single('file');

exports.uploadSong = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: 'Error al subir el archivo' });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
        }

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `canciones/${file.originalname}`,
            Body: file.buffer,
            ContentType: 'audio/mpeg',
        };

        try {
            s3.upload(params, (err, data) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(201).json({ url: data.Location });
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

exports.uploadImage = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: 'Error al subir el archivo' });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
        }

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `fotos/${file.originalname}`,
            Body: file.buffer,
            ContentType: 'image/jpeg',
        };

        try {
            s3.upload(params, (err, data) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(201).json({ url: data.Location });
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}