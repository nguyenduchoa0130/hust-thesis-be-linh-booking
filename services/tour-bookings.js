const mongoose = require('mongoose');
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
        path: 'tourGuides',
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
        path: 'tourGuides',
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
        path: 'tourGuides',
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
  getAssignments: (tourGuideId) => {
    return TourBookingsModel.aggregate([
      {
        $match: {
          tourGuides: new mongoose.Types.ObjectId(tourGuideId),
        },
      },
      {
        $lookup: {
          from: 'tourschedules', // Assuming the tourSchedule is in the 'tourSchedules' collection
          localField: 'tourSchedule',
          foreignField: '_id',
          as: 'tourScheduleDetails',
        },
      },
      {
        $lookup: {
          from: 'tours', // Collection name for tours
          localField: 'tourScheduleDetails.tour',
          foreignField: '_id',
          as: 'tourDetails',
        },
      },
      {
        $lookup: {
          from: 'users', // Replace with your actual collection name
          localField: 'customer',
          foreignField: '_id',
          as: 'customerDetails',
        },
      },
      {
        $lookup: {
          from: 'tourparticipants', // Replace with your actual collection name
          localField: '_id',
          foreignField: 'tourBooking',
          as: 'participants',
        },
      },
      {
        $project: {
          _id: 1,
          customer: {
            _id: { $arrayElemAt: ['$customerDetails._id', 0] },
            fullName: { $arrayElemAt: ['$customerDetails.fullName', 0] },
            email: { $arrayElemAt: ['$customerDetails.email', 0] },
            phone: { $arrayElemAt: ['$customerDetails.phone', 0] },
          },
          tourSchedule: {
            _id: { $arrayElemAt: ['$tourScheduleDetails._id', 0] },
            tour: { $arrayElemAt: ['$tourScheduleDetails.tour', 0] },
            startAt: { $arrayElemAt: ['$tourScheduleDetails.startAt', 0] },
            endAt: { $arrayElemAt: ['$tourScheduleDetails.endAt', 0] },
            tour: {
              _id: { $arrayElemAt: ['$tourDetails._id', 0] },
              name: { $arrayElemAt: ['$tourDetails.name', 0] },
              dayCount: { $arrayElemAt: ['$tourDetails.dayCount', 0] },
              nightCount: { $arrayElemAt: ['$tourDetails.nightCount', 0] },
            },
          },
          participants: {
            name: { $arrayElemAt: ['$participants.name', 0] },
            phone: { $arrayElemAt: ['$participants.phone', 0] },
            email: { $arrayElemAt: ['$participants.email', 0] },
            gender: { $arrayElemAt: ['$participants.gender', 0] },
          },
        },
      },
    ]);
  },
  create: (payload) => {
    return TourBookingsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return TourBookingsModel.updateOne(filterQuery, changes);
  },
  remove: (filterQuery) => {
    return TourBookingsModel.deleteOne(filterQuery);
  },
};
