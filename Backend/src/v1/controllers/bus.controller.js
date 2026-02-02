const { OK, Created } = require("../core/success.response");
const { logger } = require("../helpers/logger/myLogger");
const busService = require("../services/bus.service");

class BusController {
  createBus = async (req, res) => {
    const requestId = req.requestId;

    logger.info("Create bus request", { requestId });

    const data = await busService.createBus(req.body, requestId);

    logger.info("Create bus success", { requestId });

    return new OK({
      message: "Bus created successfully",
      data,
    }).send(res);
  };

  getBusById = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    const data = await busService.getBusById(busId, requestId);

    return new OK({ data }).send(res);
  };

  getAllBuses = async (req, res) => {
    const requestId = req.requestId;

    const filters = {
      companyId: req.query.companyId,
      status: req.query.status,
      type: req.query.type,
    };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await busService.getAllBuses(filters, page, limit, requestId);

    return new OK({
      data: data.buses,
      meta: data.pagination,
    }).send(res);
  };

  updateBus = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    const data = await busService.updateBus(busId, req.body, requestId);

    return new OK({
      message: "Bus updated successfully",
      data,
    }).send(res);
  };

  deleteBus = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    await busService.deleteBus(busId, requestId);

    return new OK({
      message: "Bus deleted successfully",
    }).send(res);
  };
}

module.exports = new BusController();
