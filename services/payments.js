const { PaymentsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return PaymentsModel.find(filterQuery)
      .select({ __v: 0 })
      .populate({ path: 'paymentMethod', select: { __id: 1, name: 1, icon: 1 } })
      .sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return PaymentsModel.findOne(filterQuery)
      .select({ __v: 0 })
      .populate({ path: 'paymentMethod', select: { __id: 1, name: 1, icon: 1 } });
  },
  create: (payload) => {
    return PaymentsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return PaymentsModel.updateOne(filterQuery, changes);
  },
  getStatistics: async () => {
    const stats = await PaymentsModel.aggregate([
      {
        $match: { status: { $ne: 'Pending' } },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            status: '$status',
          },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: { year: '$_id.year', month: '$_id.month' },
          statuses: {
            $push: {
              status: '$_id.status',
              totalAmount: '$totalAmount',
            },
          },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);
    return stats;
  },
};
