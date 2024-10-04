import express from 'express';
import { connectDB } from './configs/db.js'
import userRoutes from './routes/userRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/bookings', bookingRoutes);

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();