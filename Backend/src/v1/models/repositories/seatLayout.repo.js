const SeatLayout = require("../seatLayout.model");

class SeatLayoutRepository {
  async create(layoutData) {
    return await SeatLayout.create(layoutData);
  }

  async findByLayoutId({ layoutId }) {
    return await SeatLayout.findOne({ layoutId, isDeleted: false }).lean();
  }

  async updateByLayoutId({ layoutId, updateData }) {
    return await SeatLayout.findOneAndUpdate(
      { layoutId, isDeleted: false },
      { $set: updateData },
      { new: true },
    ).lean();
  }

  async findAll({ filter = {}, skip = 0, limit = 20 }) {
    return await SeatLayout.find({ ...filter, isDeleted: false })
      .select("layoutId name column row floors totalSeats layoutVersion info")
      .sort({ totalSeats: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async count({ filter = {} }) {
    return await SeatLayout.countDocuments({
      ...filter,
      isDeleted: false,
    });
  }

  async softDeleteByLayoutId({ layoutId }) {
    return await SeatLayout.findOneAndUpdate(
      { layoutId, isDeleted: false },
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

module.exports = new SeatLayoutRepository();
