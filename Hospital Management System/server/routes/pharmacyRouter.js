const express = require("express");
const router = express.Router();
const pharmacyController = require("../controllers/pharmacyController");

router.post("/addPharmacy", pharmacyController.addPharmacy);
router.get("/getPharmacy", pharmacyController.getAll);
router.get("/getPharmacy/:id", pharmacyController.getByID);
router.put("/updatePharmacy/:id", pharmacyController.updatePharmacy);
router.delete("/deletePharmacy/:id", pharmacyController.deletePharmacy);

module.exports = router;