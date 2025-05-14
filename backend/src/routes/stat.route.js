import express from 'express'

import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';
import { getStats } from '../controller/stats.controller.js';


const statRoutes = express.Router();

statRoutes.get('/', protectRoute, requireAdmin, getStats)

export default statRoutes;