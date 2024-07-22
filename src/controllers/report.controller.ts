import {Response, Request} from 'express';
import handleError from '../utils/errorHandler';
import reportService from '../services/report.service';

class Report {

    async generateReport(_req: Request, res: Response): Promise<void>{
        try {

            const { startDate, endDate } = _req.query;

            if (!startDate || !endDate) {
                throw new Error('Please provide both startDate and endDate');
            }

            const start = new Date(startDate as string);
            const end = new Date(endDate as string);

            const transaction = await reportService.generateReport(start, end);
            res.status(200).json(transaction);

        } catch (err) {
            handleError(err, res);
        }
    }
}

export default new Report();
