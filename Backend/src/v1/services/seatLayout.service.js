const seatLayoutRepository = require("../models/repositories/seatLayout.repo");
const { NotFoundError } = require("../core/error.response");
const { logger } = require("../helpers/logger/myLogger");

class SeatLayoutService {
  async createLayout(layoutData, requestId) {
    logger.info("Create seat layout", {
      requestId,
      layoutId: layoutData.layoutId,
    });

    const existed = await seatLayoutRepository.findByLayoutId({
      layoutId: layoutData.layoutId,
    });

    if (existed) {
      throw new BadRequestError({
        message: "Seat layout already exists",
      });
    }

    return await seatLayoutRepository.create(layoutData);
  }

  async getLayoutById(layoutId, requestId) {
    logger.info("Get seat layout by id", { requestId, layoutId });

    const layout = await seatLayoutRepository.findByLayoutId({ layoutId });
    if (!layout) {
      throw new NotFoundError({ message: "Seat layout not found" });
    }

    return layout;
  }

  async getAllLayouts(filter = {}, page = 1, limit = 20, requestId) {
    logger.info("Get all seat layouts", { requestId, filter, page, limit });

    const skip = (page - 1) * limit;

    const layouts = await seatLayoutRepository.findAll({
      filter,
      skip,
      limit,
    });

    const total = await seatLayoutRepository.count({ filter });

    return {
      layouts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateLayout(layoutId, updateData, requestId) {
    logger.info("Update seat layout", { requestId, layoutId });

    const layout = await seatLayoutRepository.updateByLayoutId({
      layoutId,
      updateData,
    });

    if (!layout) {
      throw new NotFoundError({ message: "Seat layout not found" });
    }

    return layout;
  }

  async deleteLayout(layoutId, requestId) {
    logger.info("Soft delete seat layout", { requestId, layoutId });

    const layout = await seatLayoutRepository.softDeleteByLayoutId({
      layoutId,
    });
    if (!layout) {
      throw new NotFoundError({ message: "Seat layout not found" });
    }

    return { message: "Seat layout deleted successfully" };
  }
}

module.exports = new SeatLayoutService();
