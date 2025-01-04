const {
  HttpStatusCodeEnum,
  HttpStatusEnum,
  TourRequestStatusEnum,
  TourStatusEnum,
} = require('../../enums');
const {
  ToursService,
  TourRequestsService,
  TourTemplatesService,
  TourCategoriesService,
  TourDestinationsService,
  TourDetailsService,
} = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  // GET
  getTourTemplates: catchAsync(async (req, res) => {
    const tourTemplates = await TourTemplatesService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourTemplates,
    });
  }),
  // POST
  createTourTemplate: catchAsync(async (req, res) => {
    const tourRequest = await TourRequestsService.getOne({ _id: req.body.tourRequestId });
    if (!tourRequest) {
      throw errorsUtil.createNotFound('Tour request not found');
    }
    await TourTemplatesService.remove({ tourRequest: tourRequest._id.toString() });
    const customCategory = await TourCategoriesService.getOne({ name: new RegExp('custom', 'i') });
    // Create tour details
    const detailPromises = [];
    if (tourRequest.requirements.length) {
      for (const requirement of tourRequest.requirements) {
        if (requirement.status !== TourRequestStatusEnum.Accepted) {
          continue;
        }
        const destination = await TourDestinationsService.getOne({
          name: new RegExp(requirement.destination, 'gi'),
        });
        if (destination) {
          detailPromises.push(
            TourDetailsService.create({
              title: destination.name,
              destination: destination._id.toString(),
            }),
          );
        } else {
          const newDestination = await TourDestinationsService.create({
            name: requirement.destination,
          });
          detailPromises.push(
            TourDetailsService.create({
              title: newDestination.name,
              destination: newDestination._id.toString(),
            }),
          );
        }
      }
    }
    const createdDetails = await Promise.all(detailPromises);
    // Create tour
    const requestTitle = `[Template] Req - #${tourRequest._id.toString().slice(-5)}`;
    const tourPayload = {
      name: `${requestTitle} - ${tourRequest.title}`,
      introduction: '',
      price: tourRequest.price,
      dayCount: tourRequest.dayCount,
      nightCount: tourRequest.nightCount,
      category: customCategory?._id,
      transports: [],
      details: createdDetails.map((detail) => detail._id.toString()),
      owner: tourRequest?.customer?._id.toString(),
      status: TourStatusEnum.Inactive,
    };
    const newTour = await ToursService.create(tourPayload);
    // Create tour template
    const tourTemplate = await TourTemplatesService.create({
      title: `${requestTitle} - ${tourRequest.title}`,
      tourRequest: tourRequest._id.toString(),
      tour: newTour._id.toString(),
      owner: tourRequest?.customer?._id.toString(),
    });
    // Return response
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: tourTemplate,
    });
  }),
};
