import express from 'express';
import { body, param, validationResult } from 'express-validator';
import URLController from '../controller/urlController.js';
import logger from '../../util/logger.js';

const router = express.Router();

router.post(
    '/shorten',
    body('url').isURL().withMessage('Invalid URL'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(`Validation error: ${JSON.stringify(errors.array())}`);
            return res.status(400).json({ error: 'Invalid input' });
        }
        next();
    },
    URLController.shorten
);

router.get(
    '/:shortenedUrl',
    param('shortenedUrl').isLength({ min: 1 }).withMessage('Invalid URL'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(`Validation error: ${JSON.stringify(errors.array())}`);
            return res.status(400).json({ error: 'Invalid input' });
        }
        next();
    },
    URLController.expand
);

export default router;
