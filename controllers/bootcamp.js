const errorHandler = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const asyncError = require('../middleware/async');
const ErrorResponse = require("../utils/errorResponse");

// @Desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @Access Public
exports.getBootcamps =asyncError( async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamp.length, body: bootcamp });
  } catch (err) {
    next(err);
  }
});

// @Desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @Access Public
// here we need to check if the object returned is exists because if the id 612852a373491203b6feab65 and you enter 612852a373491203b6feab60 <-{{(0 not 5)}} it will return 200
exports.getBootcamp = asyncError(async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, error: "Object not found" });
    }
    res.status(200).json({ success: true, body: bootcamp });
  } catch (err) {
    next(err);
  }
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
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, error: "Object not found" });
    }
    res.status(201).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
});
