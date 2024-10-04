import Booking from '../models/bookingModel.js';
import Vehicle from '../models/vehicleModel.js';
import { messages } from '../utils/msg.js';
import { logError } from '../utils/customLog.js';
const filename = 'bookingController.js';

export const createBooking = async (req, res) => {
    const { user_id, vehicle_id, pickup_location, drop_location, distance, seats } = req.body;

    try {
        // Check if the vehicle is available
        const vehicle = await Vehicle.findById(vehicle_id);
        if (!vehicle || !vehicle.isAvailable) {
            return res.status(400).json({ message: messages.vehicleNotAvailable });
        }

        // Calculate total cost
        const total_cost = vehicle.rate_per_km * distance;

        // Create the booking
        const booking = new Booking({
            user_id,
            vehicle_id,
            pickup_location,
            drop_location,
            distance,
            seats,
            total_cost,
            status: 'pending'
        });

        await booking.save();

        // Mark the vehicle as not available
        vehicle.isAvailable = false;
        await vehicle.save();

        res.status(201).json({ message: messages.bookingCreated, booking });
    } catch (error) {
        logError(filename, 'createBooking', error.message);
        res.status(400).json({ message: messages.error });
    }
};

export const completeBooking = async (req, res) => {
    const { bookingId } = req.body;

    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId).populate('vehicle_id');

        if (!booking) {
            return res.status(404).json({ message: messages.bookingNotFound });
        }

        // Check if the booking is already completed
        if (booking.status === 'completed') {
            return res.status(400).json({ message: messages.bookingAlreadyCompleted });
        }
        // Update booking status to completed
        booking.status = 'completed';
        await booking.save();

        // Make the associated vehicle available again
        const vehicle = booking.vehicle_id;
        vehicle.isAvailable = true;
        await vehicle.save();

        res.json({ message: messages.bookingCompleted, booking });
    } catch (error) {
        logError(filename, 'completeBooking', error.message);
        res.status(400).json({ message: messages.error });
    }
};

