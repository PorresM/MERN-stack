import { config } from 'config/config';
import ApiError from './apiError';
import jwt from 'jsonwebtoken';

export class jwtService {
    /**
     * @desc    Create a JWT based on a user
     */
    createToken(user) {
        return new Promise((resolve, reject) => {
            // User payload
            const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
            };

            // Sign Token
            jwt.sign(
                payload,
                config.jwt.secret,
                {
                    expiresIn: config.jwt.expiration
                },
                (err, token) => {
                    if (err) {
                        reject(
                            new ApiError(500, {
                                message: 'Error during JWT creation'
                            })
                        );
                    } else {
                        resolve({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                }
            );
        });
    }
}
