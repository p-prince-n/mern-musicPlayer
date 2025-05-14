import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllUsers } from '../controller/user.controller.js';

const userRoutes = express.Router();

userRoutes.get('/', protectRoute, getAllUsers )

export default userRoutes;