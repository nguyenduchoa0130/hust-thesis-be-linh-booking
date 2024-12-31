const { TourDetailImagesService, TourDetailsService } = require('../../services');
const { catchAsync, fileUtil } = require('../../utils');
const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');

const constructFilePayloads = (req, files) => {
  return files.map((file) => ({
    path: file.path,
    name: file.filename,
    url: fileUtil.constructUrl(req, file.filename),
  }));
};

module.exports = {
  // GET
  getTourDetailById: catchAsync(async (req, res) => {
    const tourDetail = await TourDetailsService.getOne({ _id: req.params.tourDetailId });
    if (!tourDetail) {
      throw errorsUtil.createNotFound(`Tour detail not found`);
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourDetail,
    });
  }),
  // POST
  createTourDetail: catchAsync(async (req, res) => {
    const payload = {
      ...req.body,
      images: [],
    };
    const imageFiles = fileUtil.extract(req, 'images');
    if (imageFiles.length) {
      const imagePayloads = constructFilePayloads(req, imageFiles);
      const tourDetailImages = await TourDetailImagesService.create(imagePayloads);
      payload.images = tourDetailImages.map((image) => image._id);
    }
    const newTourDetail = await TourDetailsService.create(payload);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: newTourDetail,
    });
  }),
  // PATCH
  updateTourDetail: catchAsync(async (req, res) => {
    const imageFiles = fileUtil.extract(req, 'images');
    if (!imageFiles.length && !Object.keys(req.body).length) {
      throw errorsUtil.createBadRequest(`No provided payload to update`);
    }
    const payload = { ...req.body };
    // Check existing tour detail
    const tourDetail = await TourDetailsService.getOne({ _id: req.params.tourDetailId });
    if (!tourDetail) {
      throw errorsUtil.createNotFound(`Can't find tour detail with id ${req.params.tourDetailId}`);
    }
    // Update images
    if (payload.removedImages) {
      const clonedRemovedImages = [...payload.removedImages];
      delete payload.removedImages;
      if (clonedRemovedImages.length) {
        await TourDetailImagesService.remove(clonedRemovedImages);
        payload.images = tourDetail.images.filter(
          (imageId) => !clonedRemovedImages.includes(String(imageId)),
        );
      }
    }
    if (imageFiles.length) {
      const tourDetailImagePayloads = constructFilePayloads(req, imageFiles);
      const tourDetailImages = await TourDetailImagesService.create(tourDetailImagePayloads);
      payload.images = [...tourDetail.images, ...tourDetailImages.map((image) => image._id)];
    }
    // Start updating
    await TourDetailsService.update({ _id: req.params.tourDetailId }, payload);
    // Return response
    const updatedTourDetail = await TourDetailsService.getOne({ _id: req.params.tourDetailId });
    return res.status(200).json({
      status: HttpStatusEnum.Updated,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedTourDetail,
    });
  }),
  // DELETE
  deleteTourDetail: catchAsync(async (req, res) => {
    const tourDetail = await TourDetailsService.getOne({ _id: req.params.tourDetailId });
    if (!tourDetail) {
      throw errorsUtil.createNotFound(`Tour detail not found`);
    }
    await TourDetailImagesService.remove(tourDetail.images.map((img) => img._id.toString()));
    await TourDetailsService.remove({ _id: req.params.tourDetailId });
    return res.status(HttpStatusCodeEnum.Ok).send();
  }),
};
