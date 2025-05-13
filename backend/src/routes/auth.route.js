import express from 'express'

import { authCallback } from '../controller/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/callback', authCallback)

export default authRoutes;