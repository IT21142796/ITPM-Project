const express = require("express");
const router = express.Router();
const stationaryController = require("../controllers/stationaryController");

router.post("/addStationary", stationaryController.addStationary);
router.get("/getStationary", stationaryController.getAll);
router.get("/getStationary/:id", stationaryController.getByID);
router.put("/updateStationary/:id", stationaryController.updateStationary);
router.delete("/deleteStationary/:id", stationaryController.deleteStationary);

module.exports = router;
