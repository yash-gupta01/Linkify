import Analytics from '../models/analyticsModel.js';
import sequelize from '../config/database.js'; // Adjust the path as necessary
import logger from '../util/logger.js';

const fileName = 'analyticsService.js';

class AnalyticsService {
    static async logRequest(shortenedUrl) {
        logger.info(`[${fileName}] Logging request for URL: ${shortenedUrl}`);
        try {
            const timestamp = new Date();
            await Analytics.create({ shortened_url: shortenedUrl, request_time: timestamp });
        } catch (error) {
            logger.error(`[${fileName}] Error logging request: ${error.message}`);
        }
    }

    static async getAnalytics(shortenedUrl) {
        logger.info(`[${fileName}] Retrieving analytics for URL: ${shortenedUrl}`);
        try {
            const analytics = await Analytics.findAll({
                where: { shortened_url: shortenedUrl },
                attributes: [
                    'shortened_url',
                    [sequelize.fn('COUNT', sequelize.col('shortened_url')), 'usage_count'],
                    [sequelize.fn('ARRAY_AGG', sequelize.col('request_time')), 'timestamps']
                ],
                group: ['shortened_url'],
            });

            return analytics.map(entry => ({
                shortenedUrl: entry.shortened_url,
                usageCount: entry.dataValues.usage_count,
                timestamps: entry.dataValues.timestamps
            }));
        } catch (error) {
            logger.error(`[${fileName}] Error retrieving analytics: ${error.message}`);
            throw error;
        }
    }
}

export default AnalyticsService;
