import logger from "../util/logger.js";
import CacheService from "./cacheService.js";
import Url from "../models/urlModel.js";
import shortenerUtils from "../util/util.js";
import AnalyticsService from "./analyticsService.js";

const fileName = "urlService.js";

class UrlService {
  static async shortenUrl(originalUrl) {
    try {
      logger.info(`[${fileName}] Shortening URL`);

      // Log access
      await AnalyticsService.logRequest(originalUrl);

      // Check cache first
      const cached = await CacheService.getFromCache(originalUrl);
      if (cached) {
        return cached.shortenedUrl;
      }

      // Generate a unique short URL
      const shortenedUrl = shortenerUtils.generateShortUrl(originalUrl);

      // Save URL in PostgreSQL using Sequelize ORM
      const [url, created] = await Url.findOrCreate({
        where: { original_url: originalUrl },
        defaults: { shortened_url: shortenedUrl },
      });

      // If the URL already exists, use the existing shortened URL
      const finalShortenedUrl = created ? shortenedUrl : url.shortened_url;

      // Cache the result
      await CacheService.saveToCache(originalUrl, {
        shortenedUrl: finalShortenedUrl,
      });

      return finalShortenedUrl;

    } catch (error) {
      logger.error(`Error shortening URL: ${error.message}`);
      throw error;
    }
  }

  static async expandUrl(shortenedUrl) {
    try {
        logger.info(`[${fileName}] Expanding URL:`);

      // Check cache first
      const cached = await CacheService.getFromCache(shortenedUrl);
      if (cached) {
        return cached.originalUrl;
      }

      // Retrieve original URL from Postgres using Sequelize ORM
      const url = await Url.findOne({ where: { shortened_url: shortenedUrl } });
      if (!url) throw new Error("URL not found");
      const originalUrl = url.original_url;

      // Cache the result
      await CacheService.saveToCache(shortenedUrl, { originalUrl });
      return originalUrl;

    } catch (error) {
      logger.error(`Error expanding URL: ${error.message}`);
      throw error;
    }
  }
}

export default UrlService;
