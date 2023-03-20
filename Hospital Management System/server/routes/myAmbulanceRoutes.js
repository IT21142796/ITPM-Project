const express = require('express');
const router = express.Router();
const {
  getMyAmbulances,
  setMyAmbulance,
  updateMyAmbulance,
  deleteMyAmbulance,
} = require("../controllers/myAmbulanceController");

router.route("/").get(getMyAmbulances).post(setMyAmbulance);
router.route("/:id").delete(deleteMyAmbulance).put(updateMyAmbulance);

module.exports = router;
