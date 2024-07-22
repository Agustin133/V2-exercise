import Transaction from '../models/transactionModel';
import moment from 'moment';

class Report {
    async generateReport(start: Date, end: Date) {
        try {
            // Validate start and end dates
            if (!(start instanceof Date) || isNaN(start.getTime())) {
                throw new Error('Invalid start date');
            }
            if (!(end instanceof Date) || isNaN(end.getTime())) {
                throw new Error('Invalid end date');
            }
            if (start > end) {
                throw new Error('Start date must be before or equal to end date');
            }

            // Total credits
            const totalCreditsResult = await Transaction.aggregate([
                {
                    $match: {
                        date: { $gte: start, $lte: end },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalCredits: { $sum: '$credits' },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        totalCredits: 1,
                    },
                },
            ]);

            // Detailed transactions
            const transactions = await Transaction.aggregate([
                {
                    $match: {
                        date: { $gte: start, $lte: end },
                    },
                },
                {
                    $group: {
                        _id: { senderId: '$senderId', receiverId: '$receiverId' },
                        totalCreditsSent: { $sum: '$credits' },  // Correct summation
                        totalCreditsReceived: { $sum: '$credits' },  // Correct summation
                    },
                },
                {
                    $project: {
                        _id: 0,
                        senderId: '$_id.senderId',
                        totalCreditsSent: 1,
                        receiverId: '$_id.receiverId',
                        totalCreditsReceived: 1,
                    },
                },
            ]);

            const totalCredits = totalCreditsResult.length > 0 ? totalCreditsResult[0].totalCredits : 0;
            const formattedStart = moment(start).format('MMMM Do YYYY');
            const formattedEnd = moment(end).format('MMMM Do YYYY');

            return {
                totalCredits,
                from: formattedStart,
                to: formattedEnd,
                transactions
            };

        } catch (err) {
            throw err;
        }
    }
}

export default new Report();
