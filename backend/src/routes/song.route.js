import express from 'express'
import { getAllSongs, getFeaturedSong, getTrendingSongs, getMadeForYouSongs  } from '../controller/song.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const songRoutes = express.Router();

songRoutes.get('/', protectRoute, requireAdmin,  getAllSongs)
songRoutes.get('/featured', getFeaturedSong )
songRoutes.get('/made-for-you', getMadeForYouSongs )
songRoutes.get('/trending', getTrendingSongs )

export default songRoutes;