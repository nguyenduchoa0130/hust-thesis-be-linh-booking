const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { HotelService, HotelImageService } = require('../../services');
const { catchAsync, fileUtil, errorsUtil } = require('../../utils');

class HotelController {
  constructFilePayloads = (req, files) => {
    return files.map((file) => ({
      path: file.path,
      name: file.filename,
      url: fileUtil.constructUrl(req, file.filename),
    }));
  };

  getHotels = catchAsync(async (req, res) => {
    const hotels = await HotelService.getAll(req.query);
    return res.status(200).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: hotels,
    });
  });

  createHotel = catchAsync(async (req, res) => {
    // Check existing
    const filterQuery = {
      name: new RegExp(req.body.name, 'i'),
      address: new RegExp(req.body.address, 'i'),
    };
    const existingHotels = await HotelService.getAll(filterQuery);
    if (existingHotels.length) {
      throw errorsUtil.createBadRequest(`Hotel with the same name and address already exists`);
    }
    // Create hotel images
    const hotel = await HotelService.create(req.body);
    const imageFiles = fileUtil.extract(req, 'images');
    if (imageFiles.length) {
      const hotelImagePayloads = this.constructFilePayloads(req, imageFiles);
      const hotelImages = await HotelImageService.create(hotelImagePayloads);
      await HotelService.update(hotel.id, { images: hotelImages.map((image) => image._id) });
    }
    // Get created hotel
    const createdHotel = await HotelService.getById(hotel._id);
    // Return response
    return res.status(201).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: createdHotel,
    });
  });

  updateHotel = catchAsync(async (req, res) => {
    const imageFiles = fileUtil.extract(req, 'images');
    if (!imageFiles.length && !Object.keys(req.body).length) {
      throw errorsUtil.createBadRequest(`No provided payload to update`);
    }
    const { id } = req.params;
    const payload = { ...req.body };
    // Check existing hotel
    const hotel = await HotelService.getById(id);
    if (!hotel) {
      throw errorsUtil.createNotFound(`Can't find hotel with id ${id}`);
    }
    // Check new name and address
    if (payload.name && payload.address) {
      const filterQuery = {
        _id: { $ne: id },
        name: new RegExp(payload.name, 'i'),
        address: new RegExp(payload.address, 'i'),
      };
      const existingHotels = await HotelService.getAll(filterQuery);
      if (existingHotels.length) {
        throw errorsUtil.createBadRequest(`Hotel with the same name and address already exists`);
      }
    }
    // Update images
    if (payload.removedImages) {
      const clonedRemovedImages = [...payload.removedImages];
      delete payload.removedImages;
      if (clonedRemovedImages.length) {
        await HotelImageService.remove(clonedRemovedImages);
        payload.images = hotel.images.filter(
          (imageId) => !clonedRemovedImages.includes(String(imageId)),
        );
      }
    }
    if (imageFiles.length) {
      const hotelImagePayloads = this.constructFilePayloads(req, imageFiles);
      const hotelImages = await HotelImageService.create(hotelImagePayloads);
      payload.images = [...hotel.images, ...hotelImages.map((image) => image._id)];
    }
    // Start updating
    await HotelService.update(id, payload);
    // Return response
    const updatedHotel = await HotelService.getById(id);
    return res.status(200).json({
      status: HttpStatusEnum.Updated,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedHotel,
    });
  });

  removeHotel = catchAsync(async (req, res) => {
    const { images } = await HotelService.getImagesById(req.params.id);
    await Promise.all([HotelImageService.remove(images), HotelService.remove(req.params.id)]);
    return res.status(204).json();
  });
}

module.exports = new HotelController();
