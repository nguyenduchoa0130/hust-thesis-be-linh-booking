const mongoose = require('mongoose');
const { TourScheduleStatusEnum } = require('../enums');

const tourScheduleSchema = new mongoose.Schema(
  {
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'tours' },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    status: { type: String, default: TourScheduleStatusEnum.Active },
  },
  { timestamps: true },
);

const TourSchedules = mongoose.model('tourSchedules', tourScheduleSchema);
module.exports = TourSchedules;
