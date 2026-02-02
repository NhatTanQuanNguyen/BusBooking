const { OK, Created } = require("../core/success.response");
const seatTemplateService = require("../services/seatTemplate.service");

class SeatTemplateController {
  addSeats = async (req, res) => {
    const requestId = req.requestId;
    const { layoutId } = req.params;

    const data = await seatTemplateService.addSeats(
      layoutId,
      req.body.seats,
      requestId,
    );

    return new OK({
      message: "Seats added successfully",
      data,
    }).send(res);
  };

  updateSeat = async (req, res) => {
    const requestId = req.requestId;
    const { layoutId, seatId } = req.params;

    const data = await seatTemplateService.updateSeat(
      layoutId,
      seatId,
      req.body,
      requestId,
    );

    return new OK({
      message: "Seat updated successfully",
      data,
    }).send(res);
  };

  deactivateSeat = async (req, res) => {
    const requestId = req.requestId;
    const { layoutId, seatId } = req.params;

    const data = await seatTemplateService.deactivateSeat(
      layoutId,
      seatId,
      requestId,
    );

    return new OK({
      message: "Seat deactivated successfully",
      data,
    }).send(res);
  };
}

module.exports = new SeatTemplateController();
