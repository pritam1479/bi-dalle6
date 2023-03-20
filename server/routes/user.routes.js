import express from 'express';
import { getAllUsers, getUserInfoById, createUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoById);

export default router