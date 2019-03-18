import express from 'express';
import { UserService } from '@/api/users/userService';
import { jwtService } from '@/utils/jwtService';

const router = express.Router();
const userService = new UserService(new jwtService());

/**
 * @route   GET api/users/test
 * @desc    Tests users route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

/**
 * @route   POST api/users/
 * @desc    Register user
 * @access  Public
 */
router.post('', (req, res) => {
    userService
        .createUser(req.body)
        .then(result => res.json(result))
        .catch(result => res.json(result));
});

/**
 * @route   POST api/users/login
 * @desc    Login user and return JWT Token
 * @access  Public
 */
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userService
        .login(email, password)
        .then(result => res.json(result))
        .catch(result => res.json(result));
});

module.exports = router;
