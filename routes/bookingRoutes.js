import express from 'express';
import * as bookingController from '../controllers/bookingController.js';

const router = new express.Router();

router.post('/', bookingController.createBooking);
router.post('/mark-completed', bookingController.completeBooking);

export default router;


