import User from '../models/userModel.js';
import { messages } from '../utils/msg.js';
import { logError } from '../utils/customLog.js';
const filename = 'userController.js';

export const createUser = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const existingUser = await User.findOne({ email, isDeleted: false });
        if (existingUser) {
            return res.status(400).json({ message: messages.userExists });
        }

        const user = new User({ name, email, phone });
        await user.save();
        res.status(201).json({ message: messages.userCreated, user });
    } catch (error) {
        logError(filename, 'createUser', error.message);
        res.status(400).json({ message: messages.error });
    }
};

export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, phone } = req.body;

    try {
        const user = await User.findOne({ _id: userId, isDeleted: false });
        if (!user) {
            return res.status(404).json({ message: messages.userNotFound });
        }
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email, isDeleted: false });
            if (existingUser) {
                return res.status(400).json({ message: messages.emailAlreadyExists });
            }
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        await user.save();
        res.json({ message: messages.userUpdated, user });
    } catch (error) {
        logError(filename, 'updateUser', error.message);
        res.status(400).json({ message: messages.error });
    }
};

export const softDeleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: messages.userNotFound });
        }

        res.json({ message: messages.userDeleted });
    } catch (error) {
        logError(filename, 'softDeleteUser', error.message);
        res.status(400).json({ message: messages.error });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false });
        res.json(users);
    } catch (error) {
        logError(filename, 'getUsers', error.message);
        res.status(500).json({ message: messages.error });
    }
};
