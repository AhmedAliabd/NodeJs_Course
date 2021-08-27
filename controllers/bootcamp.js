const Bootcamp = require('../models/Bootcamp');

// @Desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @Access Public
exports.getBootcamps = (req, res) => {
  res.status(200).json({ success: true, data: { id: 1 } });
};

// @Desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @Access Public
exports.getBootcamp = (req, res) => {
  res
    .status(200)
    .json({ success: true, data: `Display bootcamp ${req.params.id}` });
};

// @Desc Create a bootcamps
// @route Post /api/v1/bootcamps
// @Access Private
exports.createBootcamp = async (req, res) => {
  try{
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp
    });
  }catch(err)
  {
    res.status(400).json({success: false});
  }
  
};

// @Desc Update a bootcamps
// @route PUT /api/v1/bootcamps/:id
// @Access Private
exports.updateBootcamps = (req, res) => {
  res
    .status(200)
    .json({ success: true, data: `update bootcamp ${req.params.id}` });
};

// @Desc Delete a bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @Access Private
exports.deleteBootcamps = (req, res) => {
  res
    .status(200)
    .json({ success: true, data: `delete bootcamp ${req.params.id}` });
};
