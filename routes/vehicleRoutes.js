import express from 'express';
import * as vehicleController from '../controllers/vehicleController.js';

const router = new express.Router();

router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);

export default router;
