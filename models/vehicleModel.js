import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number_plate: {
        type: String,
        required: true,
        unique: true
    },
    rate_per_km: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
