import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors({
 origin: 'http://localhost:8080'
   /* [
     'http://localhost:3000', // local dev frontend
    'https://distemperately-merrier-joella.ngrok-free.dev' // ngrok public frontend
  ] */
}));
/// Serve frontend build
 app.use(express.static(path.join(__dirname, '../dist')));

 // API route
 app.post('/api/prod-offers/calculate', (req, res) => {
   res.json({ message: 'Offer calculated!' });
 });

 // Catch-all for React frontend
 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../dist', 'index.html'));
 });

 app.listen(3000, () => {
   console.log('Production server running on port 3000');
 });