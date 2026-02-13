const BusModel = require("../bus.model");

class BusMaintenanceRepository {
  async addMaintenance({ busId, maintenance }) {
    return await BusModel.findOneAndUpdate(
      { busId },
      { $push: { maintenanceHistory: maintenance } },
      { new: true },
    ).lean();
  }

  async updateMaintenance({ busId, maintenanceId, updateData }) {
    return await BusModel.findOneAndUpdate(
      {
        busId,
        "maintenanceHistory._id": maintenanceId,
      },
      {
        $set: {
          "maintenanceHistory.$": updateData,
        },
      },
      { new: true },
    ).lean();
  }

  async getHistory({ busId }) {
    const bus = await BusModel.findOne({ busId })
      .select("maintenanceHistory")
      .lean();

    return bus?.maintenanceHistory || [];
  }
}

module.exports = new BusMaintenanceRepository();
