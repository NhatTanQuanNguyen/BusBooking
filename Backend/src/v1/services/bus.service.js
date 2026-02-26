const { BadRequestError, NotFoundError } = require("../core/error.response");
const BusRepository = require("../models/repositories/bus.repo");
const { redisCacheService } = require("./cache.service");

const CACHE_KEYS = {
  BUS: "BUS",
  BUS_LIST: "BUS:LIST",
};

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

    const result = await BusRepository.create(payload);

    return result;
  }

  async getBusById({ busId, requestId }) {
    const cacheKey = `${CACHE_KEYS.BUS}:${busId}`;

    const cached = await redisCacheService.getCache({ key: cacheKey });
    if (cached) return cached;

    const bus = await BusRepository.findByBusId({ busId });

    if (!bus) {
      throw new NotFoundError({
        message: "Bus not found",
      });
    }

    await redisCacheService.setCacheTTL({
      key: cacheKey,
      value: bus,
      ttl: 300,
    });

    return bus;
  }

  async getAllBuses({ filters = {}, page = 1, limit = 10, requestId }) {
    const cacheKey = `${CACHE_KEYS.BUS_LIST}:${JSON.stringify({
      filters,
      page,
      limit,
    })}`;

    const cached = await redisCacheService.getCache({ key: cacheKey });
    if (cached) return cached;

    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      BusRepository.findAll({
        filter: filters,
        skip,
        limit,
      }),
      BusRepository.countDocuments({
        filter: filters,
      }),
    ]);

    const result = {
      items,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };

    await redisCacheService.setCacheTTL({
      key: cacheKey,
      value: result,
      ttl: 30,
    });

    return result;
  }

  async updateBus({ busId, payload, requestId }) {
    await redisCacheService.deleteCache({ key: `${CACHE_KEYS.BUS}:${busId}` });

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
    await redisCacheService.deleteCache({ key: `${CACHE_KEYS.BUS}:${busId}` });

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
