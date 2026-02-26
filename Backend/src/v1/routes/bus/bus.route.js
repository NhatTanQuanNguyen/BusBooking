const router = require("express").Router();

const busController = require("../../controllers/bus.controller");
const { asyncHandler } = require("../../helpers/handler/asyncHandler");
const {
  validateCreateBus,
  validateUpdateBus,
  validateBusId,
  validateBusQuery,
} = require("../../validation/bus.validate");

router.post("/", validateCreateBus, asyncHandler(busController.createBus));

router.get("/", validateBusQuery, asyncHandler(busController.getAllBuses));

router.get("/:busId", validateBusId, asyncHandler(busController.getBusById));

router.patch(
  "/:busId",
  validateBusId,
  validateUpdateBus,
  asyncHandler(busController.updateBus),
);

router.delete("/:busId", validateBusId, asyncHandler(busController.deleteBus));

module.exports = router;
