import express from 'express';
import { UserService } from '@/api/users/userService';

const router = express.Router();
const userService = new UserService();

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

module.exports = router;
