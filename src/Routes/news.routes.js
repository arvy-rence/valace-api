import express from 'express';

// controllers
import { createNews, getAllNews, getSingleNews, updateNews } from '../Controllers/news.controller.js';

// router
const router = express.Router();

/**
 * ROOT URL: /api/news/
 */
router.get('/', getAllNews);
router.get('/:id', getSingleNews);
router.post('/createNews', createNews);
router.put('/updateNews/:id', updateNews);

export { router as newsRoutes }