const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
require('dotenv').config();

router.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({
                status: 'failed',
                statusCode: 401,
                message: 'Invalid Username Or Password',
                token: ''
            });
        }

        const tokenOptions = {
            expiresIn: '20d', // s saniye, m dakika, h saat, d gün
            // notBefore: '15s', // 15 saniye sonra başlar
            // audience: 'http://localhost:3000', // token hangi sunucuda kullanılacak
            // issuer: 'http://localhost:5001', // token kimin tarafından veriliyor
            // jwtid: 'CodeAcademyTokenId', // token id
            // subject: 'nodejs dersleri için üretilen token, pervinden icaze almadan servisler çalışmaz', // token hangi konuda
            // algorithm: 'HS256' // token hangi algoritmayla şifrelenecek 
        }

        const token = jwt.sign({
            userId: user._id  //,
            // role: 'admin',
            // manager: 'pervin',
            // movzu: 'node.js',
            // date: 'eski date',
            // group:'RADFE203' 
        }, process.env.SECRET_KEY, tokenOptions);
        res.status(200).send({
            status: 'succeeded',
            statusCode: 200,
            message: 'Login Success',
            token: token
        });
    }
    catch (err) {
        res.status(400).send({
            status: 'failed',
            statusCode: 400,
            message: err.message,
            token: 'Invalid token'
        });
    }
});
module.exports = router;