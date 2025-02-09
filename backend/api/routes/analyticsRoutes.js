import express from 'express';
import { param, validationResult } from 'express-validator';
import AnalyticsController from '../controller/analyticsController.js';
import logger from '../../util/logger.js';

const router = express.Router();

router.get(
    '/:shortenedUrl',
    param('shortenedUrl')
        .exists().withMessage('URL is required')
        .isLength({ min: 1 }).withMessage('Invalid URL'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(`Validation error: ${JSON.stringify(errors.array())}`);
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        next();
    },
    AnalyticsController.getAnalytics
);

export default router;