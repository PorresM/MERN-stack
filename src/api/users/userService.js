import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import ApiError from '@/utils/apiError';

// Load User model
const User = require('@/api/users/userModel');

export class UserService {
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

                    bcrypt.genSalt(10, (err, salt) => {
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
}
