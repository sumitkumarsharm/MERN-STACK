import express from 'express'
import { forgotPassword, getMe, loginUser, logOutUser, registerUser, resetPassword, verifyUser } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginUser);
router.get('/profile', isLoggedIn, getMe);
router.post('/logout', isLoggedIn, logOutUser);
router.post('/resetpassword/:token', resetPassword);
router.post('/forgotpassword', forgotPassword);

export default router;