const express = require('express');
const axios = require('axios');

const app = express();

// Mengatur port untuk Vercel
const PORT = process.env.PORT || 3000;

// API Key yang diperlukan untuk autentikasi
const API_KEY = 'f43691-5477-2024';  // Ganti dengan kunci asli jika diperlukan

// Endpoint untuk memanggil API Higames
app.get('/api/freefire', async (req, res) => {
    const { userID } = req.query;

    if (!userID) {
        return res.status(400).json({
            status: false,
            message: 'userID wajib diisi!'
        });
    }

    // API URL untuk check game dengan API Key
    const apiUrl = `https://api.higames.my.id/check-game?game=free_fire&userID=${userID}&api_key=${API_KEY}`;

    try {
        // Melakukan request ke API Higames
        const response = await axios.get(apiUrl);

        if (response.data.status === 200) {
            // Mengirimkan response sesuai format yang diinginkan
            return res.status(200).json({
                status: true,
                message: response.data.message,
                data: {
                    nickname: response.data.data.nickname,
                    userid: response.data.data.userid
                }
            });
        } else {
            return res.status(500).json({
                status: false,
                message: 'Gagal memproses request API'
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan, silakan coba lagi nanti.'
        });
    }
});

// Menjalankan server di port 3000
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

module.exports = app;
      
