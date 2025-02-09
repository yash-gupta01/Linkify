import UrlService from '../../services/urlService.js';
import AnalyticsService from '../../services/analyticsService.js';
import logger from '../../util/logger.js';

const fileName = 'urlController.js';

class URLController {
    
    static async shorten(req, res) {
        logger.info(`[${fileName}] Starting shorten URL process`);
        try {
            const { url } = req.body;
            const shortenedUrl = await UrlService.shortenUrl(url);
            res.status(201).json({ shortenedUrl });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async expand(req, res) {
        try {
            const { shortenedUrl } = req.params;
            logger.info(`[${fileName}] Starting expand URL process`);
            const originalUrl = await UrlService.expandUrl(shortenedUrl);
            // Log analytics
            await AnalyticsService.logRequest(shortenedUrl);
            res.status(200).json({ originalUrl });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default URLController;
