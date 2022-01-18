import { JWT_SECRET } from "../app_config";
import jwt from 'jsonwebtoken';

export function generateToken(email, expireInSeconds=3000){
    return jwt.sign(
        { email: email },
        JWT_SECRET,
        {
            expiresIn: expireInSeconds, 
        },
    );
}