const errorHandler = require("../utils/errorResponse");

const Bootcamp = require("../models/Bootcamp");
const asyncError = require("../middleware/async");
const Geocoder = require("../utils/geocoder");
const ErrorResponse = require("../utils/errorResponse");

// @Desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @Access Public
exports.getBootcamps = asyncError(async (req, res, next) => {
  let query = req.query;

  //make a copy of req.query
  let reqQuery = { ...req.query };

  //make a list of the fields you want to remove
  const removeFields = ["select", "sort", "limit", "page"];

  //loop for each param in remove field array and delete the properties that match the field
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryString = JSON.stringify(reqQuery);

  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  //find resource
  query = Bootcamp.find(JSON.parse(queryString));

  //check if the req.query.select exist

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 1;
  let startIndex = (page - 1) * limit;
  query = query.skip(startIndex).limit(limit);
  let endIndex = page * limit;
  let total = await Bootcamp.countDocuments();

  const bootcamp = await query;

  //pagination
  let pagination = {};

  //check if the tail index is still less than the total doc
  if (endIndex < total) {
    pagination.next = {
      page: ++page,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: --page,
      limit: limit,
    };
  }

  res.status(200).json({
    success: true,
    pagination,
    count: bootcamp.length,
    body: bootcamp,
  });
});

// @Desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @Access Public
// here we need to check if the object returned is exists because if the id 612852a373491203b6feab65 and you enter 612852a373491203b6feab60 <-{{(0 not 5)}} it will return 200
exports.getBootcamp = asyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return res.status(404).json({ success: false, error: "Object not found" });
  }
  res.status(200).json({ success: true, body: bootcamp });
});

// @Desc Create a bootcamps
// @route Post /api/v1/bootcamps
// @Access Private
exports.createBootcamp = asyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @Desc Update a bootcamps
// @route PUT /api/v1/bootcamps/:id
// @Access Private
exports.updateBootcamps = asyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return res.status(400).json({ success: false, error: "Object not found" });
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @Desc Delete a bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @Access Private
exports.deleteBootcamps = asyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return res.status(404).json({ success: false, error: "Object not found" });
  }
  res.status(201).json({
    success: true,
    data: {},
  });
});

// @Desc Get a bootcamp within a radius
// @route Get /api/v1/bootcamps/radius/:zipcode/:distance
// @Access Private
exports.getBootcampInRadius = asyncError(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //Get lat/lng from geocoder
  const loc = await Geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //Calc radius using radians
  //divide dist by radius of earth
  // earth radius 3,963 mi
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
