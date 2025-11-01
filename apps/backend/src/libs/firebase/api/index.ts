import createHttpError from 'http-errors';
import { RequestHandler } from "express";
import { firebaseConfig } from '../configs';

const getFireBaseConfig: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: { config: firebaseConfig },
            message: "Config fetch!",
        });
    } catch (error) {
        next(createHttpError.InternalServerError("Firebase error"))
    }
}

export default getFireBaseConfig;