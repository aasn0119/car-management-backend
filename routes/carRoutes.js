const express = require("express");
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} = require("../controller/carController");
const upload = require("../middleware/multerHandler");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addCar", authMiddleware, upload, createCar);
router.get("/getCars", authMiddleware, getCars);
router.get("/getCarDetails/:id", authMiddleware, getCar);
router.put("/updateCarDetails/:id", authMiddleware, upload, updateCar);
router.delete("/removeCarDetails/:id", authMiddleware, deleteCar);

module.exports = router;
