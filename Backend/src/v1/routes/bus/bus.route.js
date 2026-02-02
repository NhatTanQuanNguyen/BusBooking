const router = require("express").Router();
const { asyncHandler } = require("../../helpers/handler/asyncHandler");
const busController = require("../../controllers/bus.controller");
const { requiredPermission } = require("../../middleware");

// ================= BUS CRUD =================
router.post("/", asyncHandler(busController.createBus));

router.get("/", asyncHandler(busController.getAllBuses));

router.get("/:busId", asyncHandler(busController.getBusById));

router.put(
  "/:busId",

  asyncHandler(busController.updateBus),
);

router.delete("/:busId", asyncHandler(busController.deleteBus));

module.exports = router;
