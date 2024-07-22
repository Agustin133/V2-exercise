import Transaction from '../models/transactionModel';

class Report{
    async generateReport(start: Date, end: Date){
        try {
            const transactions = await Transaction.aggregate([
                {
                    $match: {
                        date: { $gte: start, $lte: end },
                    },
                },
                {
                    $group: {
                        _id: { senderId: '$senderId', receiverId: '$receiverId' },
                        totalCreditsSent: { $sum: { $cond: [{ $eq: ['$_id.senderId', '$_id.senderId'] }, '$credits', 0] } },
                        totalCreditsReceived: { $sum: { $cond: [{ $eq: ['$_id.receiverId', '$_id.receiverId'] }, '$credits', 0] } },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        senderId: '$_id.senderId',
                        receiverId: '$_id.receiverId',
                        totalCreditsSent: 1,
                        totalCreditsReceived: 1,
                    },
                },
            ]);
    
            //const totalCredits = transactions.length > 0 ? transactions[0].totalCredits : 0;
        
            return transactions
    
        } catch (err) {
            throw err; 
        }
    }
}

export default new Report();