import express from 'express';

// controllers
import {
    createNews,
    getAllNews,
    getLatestNews,
    getSingleNews,
    updateNews
} from '../Controllers/news.controller.js';

// router
const router = express.Router();

/**
 * ROOT URL: /api/news/
 */
router.get('/', getAllNews);
router.get('/latestNews', getLatestNews); // pattern matching (should not be placed below /:id)
router.get('/:id', getSingleNews);
router.post('/createNews', createNews);
router.put('/updateNews/:id', updateNews);

export {router as newsRoutes}