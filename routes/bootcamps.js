const express = require("express");
const {getBootcamps, getBootcamp, createBootcamp, updateBootcamps, deleteBootcamps, getBootcampInRadius } = require('../controllers/bootcamp');

const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamps).delete(deleteBootcamps);
router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);
module.exports = router;