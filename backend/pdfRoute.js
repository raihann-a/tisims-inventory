// routes/pdfRoute.js
import express from 'express';
import fs from 'fs';
import pdf from 'pdf-creator-node';
import { getLaporanData } from '../config/koneksi.js';

const router = express.Router();

router.get('/download-pdf', async (req, res) => {
    try {
        const data = await getLaporanData();

        // Data untuk template
        const templateData = {
            transactions: data
        };

        // Membaca template HTML
        const html = fs.readFileSync('template.html', 'utf8');

        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm'
        };

        // Dokumen PDF
        const document = {
            html: html,
            data: templateData,
            path: './output.pdf'
        };

        // Membuat PDF
        await pdf.create(document, options);

        // Mengirim file PDF ke klien
        res.download('./output.pdf', 'laporan-transaksi.pdf', (err) => {
            if (err) {
                console.error('Gagal mengunduh file:', err);
                res.status(500).send('Gagal mengunduh file');
            }

            // Menghapus file setelah dikirim
            fs.unlinkSync('./output.pdf');
        });
    } catch (error) {
        console.error('Gagal membuat dokumen PDF:', error);
        res.status(500).send('Gagal membuat dokumen PDF');
    }
});

export default router;
