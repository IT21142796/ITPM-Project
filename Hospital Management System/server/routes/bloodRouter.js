const express = require("express");
const router = express.Router();
const bloodController = require("../controllers/bloodController");

router.post("/addBlood", bloodController.addBlood);
router.get("/getBlood", bloodController.getAll);
router.get("/getBlood/:id", bloodController.getByID);
router.put("/updateBlood/:id", bloodController.updateBlood);
router.delete("/deleteBlood/:id", bloodController.deleteBlood);

module.exports = router;

