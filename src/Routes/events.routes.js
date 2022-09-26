import express from 'express';

// controllers
import {
    createEvent,
    getAllEvents,
    getUpcomingEvents,
    getSingleEvent,
    updateEvent
} from '../Controllers/events.controller.js';

// router
const router = express.Router();

/**
 * ROOT URL: /api/events/
 */
router.get('/', getAllEvents);
router.get('/upcomingEvents', getUpcomingEvents); // pattern matching (should not be placed below /:id)
router.get('/:id', getSingleEvent);
router.post('/createEvent', createEvent);
router.put('/updateEvent/:id', updateEvent);

export { router as eventsRoutes };