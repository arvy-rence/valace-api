import express from 'express';

// controllers
import { createEvent, getAllEvents, getSingleEvent, updateEvent } from '../Controllers/events.controller.js';

// router
const router = express.Router();

/**
 * ROOT URL: /api/events/
 */
router.get('/', getAllEvents);
router.get('/:id', getSingleEvent);
router.post('/createEvent', createEvent);
router.put('/updateEvent/:id', updateEvent);

export { router as eventsRoutes };