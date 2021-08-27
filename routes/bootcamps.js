const express = require("express");
const {getBootcamps, getBootcamp, createBootcamp, updateBootcamps, deleteBootcamps } = require('../controllers/bootcamp');

const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamps).delete(deleteBootcamps);

module.exports = router;