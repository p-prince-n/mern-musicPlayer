import express from 'express'
import { getAllAlbums, getAlbumById } from '../controller/album.controller.js';

const albumRoutes = express.Router();

albumRoutes.get('/', getAllAlbums);
albumRoutes.get('/:albumId', getAlbumById);

export default albumRoutes;