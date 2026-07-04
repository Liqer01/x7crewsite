require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const app = express();

app.use(session({
    secret: 'x7crew-gizli-anahtar-123',
    resave: false,
    saveUninitialized: true
}));

// Ana sayfayı servis et
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// Discord Auth
app.get('/auth/discord', (req, res) => {
    res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=identify`);
});

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code;
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI
    }));

    const user = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
    });

    req.session.user = user.data;
    res.redirect('/');
});

// Veri Çekme API'si
app.get('/api/user-status', (req, res) => {
    if (req.session.user) {
        // BURAYA DİKKAT: Botun veritabanındaki verileri burada çekeceğiz
        res.json({ 
            loggedIn: true, 
            username: req.session.user.username,
            // Buraya veritabanından çektiğin verileri ekleyeceksin
            stats: { ses: "45 Saat", mesaj: "1.204" } 
        });
    } else {
        res.json({ loggedIn: false });
    }
});

app.listen(3000, () => console.log('x7Crew Paneli http://localhost:3000 adresinde çalışıyor!'));

const audio = document.getElementById('audioPlayer');
const toggleBtn = document.getElementById('musicToggle');
const playIcon = document.getElementById('playIcon');
const volumeBar = document.getElementById('volumeBar');

toggleBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
});

volumeBar.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});
