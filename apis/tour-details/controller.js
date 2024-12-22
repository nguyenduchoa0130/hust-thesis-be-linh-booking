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
};
