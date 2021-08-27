const Bootcamp = require('../models/Bootcamp');

// @Desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @Access Public
exports.getBootcamps = async (req, res) => {
  try
  {
      const bootcamp = await Bootcamp.find();
      res.status(200).json({success: true, count: bootcamp.length, body: bootcamp});
  }catch(err)
  {
    res.status(401).json({success: false, erorr: err.message});
  }
};

// @Desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @Access Public
// here we need to check if the object returned is exists because if the id 612852a373491203b6feab65 and you enter 612852a373491203b6feab60 <-{{(0 not 5)}} it will return 200  
exports.getBootcamp = async(req, res) => {
  try
  {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp)
    {
      return res.status(404).json({success: false, error: 'Object not found'});
    }
    res.status(200).json({success: true, body: bootcamp});
  }catch(err)
  {
    res.status(401).json({success: false, error: err.message});
  }

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
exports.updateBootcamps = async (req, res) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
    runValidators: true
  });
  if(!bootcamp)
  {
    return res.status(400).json({success: false, error: 'Object not found'});
  }
  res.status(200).json({
    success: true,
    data: bootcamp
  });
};

// @Desc Delete a bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @Access Private
exports.deleteBootcamps = async(req, res) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootcamp)
    {
      return res.status(404).json({success: false, error: 'Object not found'});
    }
    res.status(201).json({
      success: true,
      data: {}
    });
  }catch(err)
  {
    res.status(400).json({success: false});
  }
};
