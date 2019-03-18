import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import ApiError from '@/utils/apiError';
import { config } from 'config/config';

// Load User model
const User = require('@/api/users/userModel');

export class UserService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }

    /**
     * @desc    Create a user in db
     */
    createUser(userRequest) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: userRequest.email }).then(user => {
                if (user) {
                    reject(
                        new ApiError(405, { email: 'Email already exists' })
                    );
                } else {
                    const avatar = gravatar.url(userRequest.email, {
                        s: '200', // Size
                        r: 'pg', // Rating
                        d: 'mm' // Default
                    });

                    const newUser = new User({
                        name: userRequest.name,
                        email: userRequest.email,
                        avatar,
                        password: userRequest.password
                    });

                    // TODO: move it to a bcryptService
                    bcrypt.genSalt(config.bcrypt.salt, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                console.log(err);
                                reject(
                                    new ApiError(500, {
                                        message:
                                            'Eroor during password encryption'
                                    })
                                );
                            } else {
                                newUser.password = hash;
                                // Saving user
                                newUser
                                    .save()
                                    .then(user => {
                                        resolve(user);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        reject(
                                            new ApiError(500, {
                                                user: 'Error during user saving'
                                            })
                                        );
                                    });
                            }
                        });
                    });
                }
            });
        });
    }

    /**
     * @desc    Login a user
     */
    login(email, password) {
        return new Promise((resolve, reject) => {
            User.findOne({ email }).then(user => {
                // Check for user
                if (!user) {
                    reject(new ApiError(401, { msg: 'Invalid credentials' }));
                } else {
                    // Check Password
                    bcrypt.compare(password, user.password).then(isMatch => {
                        if (isMatch) {
                            // User Match
                            this.jwtService
                                .createToken(user)
                                .then(token => {
                                    resolve(token);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        } else {
                            reject(
                                new ApiError(401, {
                                    msg: 'Invalid credentials'
                                })
                            );
                        }
                    });
                }
            });
        });
    }
}
