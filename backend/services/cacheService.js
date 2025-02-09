import logger from '../util/logger.js';
import cache from '../config/cache.js';

class CacheService {
  static async getFromCache(key) {
    const fileName = 'cacheService.js';
    try {
      const result = await cache.get(key);
      if (result) {
        return JSON.parse(result); // Parse and return the cached data
      }
      return null;
    } catch (err) {
      logger.error(`[${fileName}] Error retrieving from cache: ${err.message}`);
      return null;
    }
  }

  static async saveToCache(key, data) {
    const fileName = 'cacheService.js';
    try {
      await cache.setEx(key, 3600, JSON.stringify(data));
    } catch (err) {
      logger.error(`[${fileName}] Error saving to cache: ${err.message}`);
    }
  }
}

export default CacheService;
