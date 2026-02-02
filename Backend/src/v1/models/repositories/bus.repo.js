// models/repositories/bus.repository.js
const BusModel = require("../bus.model");

class BusRepository {
  async create(busData) {
    return await BusModel.create(busData);
  }

  async findByBusId({ busId }) {
    return await BusModel.findOne({
      busId,
      isDeleted: false,
    }).lean();
  }

  async findByBusIdForUpdate({ busId }) {
    return await BusModel.findOne({
      busId,
      isDeleted: false,
    });
  }

  async updateByBusId({ busId, updateData }) {
    return await BusModel.findOneAndUpdate(
      { busId, isDeleted: false },
      { $set: updateData },
      { new: true },
    ).lean();
  }

  async softDeleteByBusId({ busId }) {
    return await BusModel.findOneAndUpdate(
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
  async findByLicense({ license }) {
    return await BusModel.findOne({
      license,
      isDeleted: false,
    }).lean();
  }
  async findAll({ filter, skip, limit }) {
    return await BusModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
  }

  async count({ filter }) {
    return await BusModel.countDocuments(filter);
  }

  async findExpiringDocuments(days = 30) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);

    return await BusModel.find({
      isDeleted: false,
      documents: {
        $elemMatch: {
          expiryDate: { $lte: targetDate },
        },
      },
    })
      .select("busId license documents")
      .lean();
  }
}

module.exports = new BusRepository();
