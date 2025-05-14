import express from 'express'
import { createSong, deleteSong, createAlbum, deleteAlbum,  checkAdmin } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const adminRoutes = express.Router();

adminRoutes.use(protectRoute, requireAdmin)

adminRoutes.get('/check',  checkAdmin)

adminRoutes.post('/songs',  createSong)
adminRoutes.delete('/songs/:id', deleteSong)
adminRoutes.post('/ablums',  createAlbum)
adminRoutes.delete('/albums/:id',  deleteAlbum)

export default adminRoutes;