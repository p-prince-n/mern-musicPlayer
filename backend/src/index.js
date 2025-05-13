import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';
import { connectDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express'
dotenv.config();
const app=express();


app.use(express.json())
app.use(clerkMiddleware)

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/albums', albumRoutes)
app.use('/api/stats', statRoutes)

 
const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server running on : https://localhost:${PORT}`);
    connectDB()
    
})