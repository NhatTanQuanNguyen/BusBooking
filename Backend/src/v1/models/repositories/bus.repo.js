const BusModel = require("../bus.model");
class BusRepository {
  async create(busData) {
    return BusModel.create(busData);
  }

  async findByBusId({ busId }) {
    return BusModel.findOne({ busId, isDeleted: false }).lean();
  }

  async findByBusIdForUpdate({ busId }) {
    return BusModel.findOne({ busId, isDeleted: false });
  }

  async existsByBusId({ busId }) {
    return BusModel.exists({ busId, isDeleted: false });
  }

  async findAll({ filter = {}, skip = 0, limit = 10 }) {
    return BusModel.find({ ...filter, isDeleted: false })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
  }

  async updateByBusId({ busId, updateData }) {
    return BusModel.findOneAndUpdate(
      { busId, isDeleted: false },
      { $set: updateData },
      { new: true },
    ).lean();
  }

  async softDeleteByBusId({ busId }) {
    return BusModel.findOneAndUpdate(
      { busId, isDeleted: false },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
      { new: true },
    ).lean();
  }
}
module.exports = new BusRepository();
