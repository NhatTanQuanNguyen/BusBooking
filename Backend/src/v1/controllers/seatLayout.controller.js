const { OK } = require("../core/success.response");
const seatLayoutService = require("../services/seatLayout.service");

class SeatLayoutController {
  createLayout = async (req, res) => {
    const requestId = req.requestId;

    const data = await seatLayoutService.createLayout(req.body, requestId);

    return new OK({
      message: "Seat layout created successfully",
      data,
    }).send(res);
  };

  getAllLayouts = async (req, res) => {
    const requestId = req.requestId;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const filter = { ...req.query };
    delete filter.page;
    delete filter.limit;

    const data = await seatLayoutService.getAllLayouts(
      filter,
      page,
      limit,
      requestId,
    );

    return new OK({ data }).send(res);
  };

  getLayoutById = async (req, res) => {
    const requestId = req.requestId;
    const { layoutId } = req.params;

    const data = await seatLayoutService.getLayoutById(layoutId, requestId);

    return new OK({ data }).send(res);
  };

  updateLayout = async (req, res) => {
    const requestId = req.requestId;
    const { layoutId } = req.params;

    const data = await seatLayoutService.updateLayout(
      layoutId,
      req.body,
      requestId,
    );

    return new OK({
      message: "Seat layout updated successfully",
      data,
    }).send(res);
  };

  deleteLayout = async (req, res) => {
    const requestId = req.requestId;
    const { layoutId } = req.params;

    await seatLayoutService.deleteLayout(layoutId, requestId);

    return new OK({
      message: "Seat layout deleted successfully",
    }).send(res);
  };
}

module.exports = new SeatLayoutController();
