import AnalyticsService from '../../services/analyticsService.js';
import logger from '../../util/logger.js';

const fileName = 'analyticsController.js';

class AnalyticsController {
    static async getAnalytics(req, res) {
        logger.info(`[${fileName}] Starting get analytics process`);
        try {
            const { shortenedUrl } = req.params;
            const analytics = await AnalyticsService.getAnalytics(shortenedUrl);
            res.status(200).json(analytics);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default AnalyticsController;