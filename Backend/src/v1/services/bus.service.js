const { BadRequestError, NotFoundError } = require("../core/error.response");
const BusRepository = require("../models/repositories/bus.repo");

class BusService {
  async createBus({ payload, requestId }) {
    const existed = await BusRepository.findByBusId({
      busId: payload.busId,
    });

    if (existed) {
      throw new BadRequestError({
        message: "Bus already exists",
      });
    }

    const bus = await BusRepository.create(payload);
    return bus;
  }

  async getBusById({ busId, requestId }) {
    const bus = await BusRepository.findByBusId({ busId });

    if (!bus) {
      throw new NotFoundError({
        message: "Bus not found",
      });
    }

    return bus;
  }

  async getAllBuses({ filters, page, limit, requestId }) {
    const skip = (page - 1) * limit;

    const items = await BusRepository.findAll({
      filter: {
        ...filters,
        isDeleted: false,
      },
      skip,
      limit,
    });

    return {
      items,
      pagination: {
        page,
        limit,
        totalItems: items.length,
      },
    };
  }

  async updateBus({ busId, payload, requestId }) {
    const updated = await BusRepository.updateByBusId({
      busId,
      updateData: payload,
    });

    if (!updated) {
      throw new NotFoundError({
        message: "Bus not found",
      });
    }

    return updated;
  }

  async deleteBus({ busId, requestId }) {
    const deleted = await BusRepository.softDeleteByBusId({ busId });

    if (!deleted) {
      throw new NotFoundError({
        message: "Bus not found",
      });
    }

    return true;
  }
}

module.exports = new BusService();
