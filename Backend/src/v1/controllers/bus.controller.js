const { OK, Created } = require("../core/success.response");
const { logger } = require("../helpers/logger/myLogger");
const busService = require("../services/bus.service");

class BusController {
  // =======================
  // CREATE
  // =======================
  createBus = async (req, res) => {
    const requestId = req.requestId;
    const payload = req.body;

    logger.info("Create bus request", {
      requestId,
      busId: payload?.busId,
      companyId: payload?.companyId,
    });

    const bus = await busService.createBus({
      payload,
      requestId,
    });

    logger.info("Create bus success", {
      requestId,
      busId: bus.busId,
    });

    return new OK({
      message: "Bus created successfully",
      data: bus,
    }).send(res);
  };

  getBusById = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    logger.info("Get bus by id request", {
      requestId,
      busId,
    });

    const bus = await busService.getBusById({
      busId,
      requestId,
    });

    logger.info("Get bus by id success", {
      requestId,
      busId,
    });

    return new OK({ data: bus }).send(res);
  };

  getAllBuses = async (req, res) => {
    const requestId = req.requestId;

    logger.info("Get all buses request", {
      requestId,
      query: req.query,
    });

    const filters = {};

    if (req.query.status) filters.status = req.query.status;
    if (req.query.type) filters.type = req.query.type;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await busService.getAllBuses({
      filters,
      page,
      limit,
      requestId,
    });

    logger.info("Get all buses success", {
      requestId,
      total: result.pagination.totalItems,
    });

    return new OK({
      data: result.items,
      meta: result.pagination,
    }).send(res);
  };

  updateBus = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;
    const payload = req.body;

    logger.info("Update bus request", {
      requestId,
      busId,
    });

    const bus = await busService.updateBus({
      busId,
      payload,
      requestId,
    });

    logger.info("Update bus success", {
      requestId,
      busId,
    });

    return new OK({
      message: "Bus updated successfully",
      data: bus,
    }).send(res);
  };

  deleteBus = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    logger.info("Delete bus request", {
      requestId,
      busId,
    });

    await busService.deleteBus({
      busId,
      requestId,
    });

    logger.info("Delete bus success", {
      requestId,
      busId,
    });

    return new OK({
      message: "Bus deleted successfully",
    }).send(res);
  };
}

module.exports = new BusController();
