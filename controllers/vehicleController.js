import Vehicle from '../models/vehicleModel.js';
import { messages } from '../utils/msg.js';
import { logError } from '../utils/customLog.js';
const filename = 'vehicleController.js';

export const createVehicle = async (req, res) => {
    const { name, number_plate, rate_per_km } = req.body;

    try {
        const existingVehicle = await Vehicle.findOne({ number_plate });
        if (existingVehicle) {
            return res.status(400).json({ message: messages.vehicleExists });
        }

        const vehicle = new Vehicle({ name, number_plate, rate_per_km });
        await vehicle.save();
        res.status(201).json({ message: messages.vehicleCreated, vehicle });
    } catch (error) {
        logError(filename, 'createVehicle', error.message);
        res.status(400).json({ message: messages.error });
    }
};

export const getVehicles = async (req, res) => {
    const { available } = req.query;
    const filter = {};

    if (available !== undefined) {
        filter.isAvailable = available === 'true';
    }

    try {
        const vehicles = await Vehicle.find(filter);
        res.json(vehicles);
    } catch (error) {
        logError(filename, 'getVehicles', error.message);
        res.status(500).json({ message: messages.error });
    }
};


