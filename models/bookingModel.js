import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    pickup_location: {
        type: String,
        required: true
    },
    drop_location: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
