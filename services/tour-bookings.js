const { TourBookingsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return TourBookingsModel.find(filterQuery)
      .select({ __v: 0 })
      .populate({
        path: 'payment',
        select: {
          __v: 0,
          tourSchedule: 0,
        },
        populate: [{ path: 'paymentMethod', select: { _id: 1, name: 1, icon: 1 } }],
      })
      .populate({
        path: 'tourGuide',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'coordinator',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'customer',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'tourSchedule',
        select: { __v: 0 },
        populate: [
          {
            path: 'tour',
            select: {
              __v: 0,
              thumbnailPath: 0,
              details: 0,
              transports: 0,
              createdAt: 0,
              updatedAt: 0,
            },
            populate: [
              {
                path: 'category',
                select: { __v: 0, createdAt: 0, updatedAt: 0 },
              },
            ],
          },
        ],
      })
      .sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return TourBookingsModel.findOne(filterQuery)
      .select({ __v: 0 })
      .populate({
        path: 'payment',
        select: {
          __v: 0,
          tourSchedule: 0,
        },
        populate: [{ path: 'paymentMethod', select: { _id: 1, name: 1, icon: 1 } }],
      })
      .populate({
        path: 'tourGuide',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'coordinator',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'customer',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'tourSchedule',
        select: { __v: 0 },
        populate: [
          {
            path: 'tour',
            select: {
              __v: 0,
              thumbnailPath: 0,
              details: 0,
              transports: 0,
              createdAt: 0,
              updatedAt: 0,
            },
            populate: [
              {
                path: 'category',
                select: { __v: 0, createdAt: 0, updatedAt: 0 },
              },
            ],
          },
        ],
      })
      .sort({ createdAt: 'desc' });
  },
  getTourBookingsByUserId: (userId) => {
    return TourBookingsModel.find({ customer: userId })
      .select({ __v: 0 })
      .populate({
        path: 'payment',
        select: {
          __v: 0,
          tourSchedule: 0,
        },
        populate: [{ path: 'paymentMethod', select: { _id: 1, name: 1, icon: 1 } }],
      })
      .populate({
        path: 'tourGuide',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'coordinator',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'customer',
        select: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'tourSchedule',
        select: { __v: 0 },
        populate: [
          {
            path: 'tour',
            select: {
              __v: 0,
              thumbnailPath: 0,
              details: 0,
              transports: 0,
              createdAt: 0,
              updatedAt: 0,
            },
            populate: [
              {
                path: 'category',
                select: { __v: 0, createdAt: 0, updatedAt: 0 },
              },
            ],
          },
        ],
      })
      .sort({ createdAt: 'desc' });
  },
  create: (payload) => {
    return TourBookingsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return TourBookingsModel.updateOne(filterQuery, changes);
  },
};
