import redis from '../../config/cache.js';
import { RateLimiterRedis } from 'rate-limiter-flexible';

// Rate limiter configuration
const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 10,
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  }
};

export default rateLimiterMiddleware ;
