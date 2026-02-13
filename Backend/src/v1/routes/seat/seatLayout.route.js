const router = require("express").Router();
const { asyncHandler } = require("../../helpers/handler/asyncHandler");
const seatLayoutController = require("../../controllers/seatLayout.controller");
const { requiredPermission } = require("../../middleware");

router.post("/layouts", asyncHandler(seatLayoutController.createLayout));

router.get("/layouts", asyncHandler(seatLayoutController.getAllLayouts));

router.get(
  "/layouts/:layoutId",
  asyncHandler(seatLayoutController.getLayoutById),
);

router.put(
  "/layouts/:layoutId",
  asyncHandler(seatLayoutController.updateLayout),
);

router.delete(
  "/layouts/:layoutId",
  asyncHandler(seatLayoutController.deleteLayout),
);

module.exports = router;
