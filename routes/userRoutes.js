import express from 'express';
import * as userController from '../controllers/userController.js';

const router = new express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.softDeleteUser);

export default router;
