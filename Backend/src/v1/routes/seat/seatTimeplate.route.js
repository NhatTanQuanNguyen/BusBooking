const router = require("express").Router();
const { asyncHandler } = require("../../helpers/handler/asyncHandler");
const seatTemplateController = require("../../controllers/seatTemplate.controller");
const { requiredPermission } = require("../../middleware");

router.post(
  "/layouts/:layoutId/seats",
  asyncHandler(seatTemplateController.addSeats),
);

router.put(
  "/layouts/:layoutId/seats/:seatId",
  asyncHandler(seatTemplateController.updateSeat),
);

router.put(
  "/layouts/:layoutId/seats/:seatId/deactivate",
  asyncHandler(seatTemplateController.deactivateSeat),
);

module.exports = router;
