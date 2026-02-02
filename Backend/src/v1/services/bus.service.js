// services/bus.service.js
const { BadRequestError, NotFoundError } = require("../core/error.response");
const BusRepository = require("../models/repositories/bus.repo");
const { logger } = require("../helpers/logger/myLogger");

class BusService {
  // ================= CREATE =================
  async createBus(payload, requestId) {
    logger.info("Create bus started", { requestId });

    const existed = await BusRepository.findByLicense({
      license: payload.license,
    });

    if (existed) {
      throw new BadRequestError({
        message: "Bus license already exists",
      });
    }

    const bus = await BusRepository.create(payload);

    logger.info("Create bus success", {
      requestId,
      busId: bus.busId,
    });

    return bus;
  }

  // ================= GET ONE =================
  async getBusById(busId, requestId) {
    logger.info("Get bus by id", { requestId, busId });

    const bus = await BusRepository.findByBusId({ busId });
    if (!bus) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    return bus;
  }

  // ================= GET LIST =================
  async getAllBuses(filters, page, limit, requestId) {
    logger.info("Get all buses", { requestId });

    const skip = (page - 1) * limit;

    const buses = await BusRepository.findAll({
      filter: {
        ...filters,
        isDeleted: false,
      },
      skip,
      limit,
    });

    const total = await BusRepository.count({
      filter: {
        ...filters,
        isDeleted: false,
      },
    });

    return {
      buses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ================= UPDATE =================
  async updateBus(busId, updateData, requestId) {
    logger.info("Update bus started", { requestId, busId });

    const updated = await BusRepository.updateByBusId({
      busId,
      updateData,
    });

    if (!updated) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    return updated;
  }

  // ================= DELETE (SOFT) =================
  async deleteBus(busId, requestId) {
    logger.info("Delete bus started", { requestId, busId });

    const deleted = await BusRepository.softDeleteByBusId({ busId });

    if (!deleted) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    return { message: "Bus deleted successfully" };
  }
}

module.exports = new BusService();
