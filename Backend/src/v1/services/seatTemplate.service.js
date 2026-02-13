const seatTemplateRepository = require("../models/repositories/seatTemplate.repo");
const { BadRequestError } = require("../core/error.response");
const { logger } = require("../helpers/logger/myLogger");

class SeatTemplateService {
  async addSeats(layoutId, seats, requestId) {
    logger.info("Add seats to layout", { requestId, layoutId });

    if (!Array.isArray(seats) || seats.length === 0) {
      throw new BadRequestError({
        message: "Seats must be a non-empty array",
      });
    }

    return await seatTemplateRepository.addSeats({ layoutId, seats });
  }

  async updateSeat(layoutId, seatId, updateData, requestId) {
    logger.info("Update seat", { requestId, layoutId, seatId });

    return await seatTemplateRepository.updateSeat({
      layoutId,
      seatId,
      updateData,
    });
  }

  async deactivateSeat(layoutId, seatId, requestId) {
    logger.info("Deactivate seat", { requestId, layoutId, seatId });

    return await seatTemplateRepository.deactivateSeat({
      layoutId,
      seatId,
    });
  }
}

module.exports = new SeatTemplateService();
