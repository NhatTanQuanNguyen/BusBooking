const { BadRequestError, NotFoundError } = require("../core/error.response");
const BusRepository = require("../models/repositories/bus.repo");
const BusMaintenanceRepository = require("../models/repositories/bus.maintenance");
const { logger } = require("../helpers/logger/myLogger");

class BusMaintenanceService {
  // ================= ADD MAINTENANCE =================
  async addMaintenance(busId, payload, requestId) {
    logger.info("Add maintenance started", { requestId, busId });

    const bus = await BusRepository.findByBusId({ busId });
    if (!bus) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    const updated = await BusMaintenanceRepository.addMaintenance({
      busId,
      maintenance: payload,
    });

    logger.info("Add maintenance success", { requestId, busId });

    return updated.maintenanceHistory;
  }

  // ================= UPDATE MAINTENANCE =================
  async updateMaintenance(busId, maintenanceId, updateData, requestId) {
    logger.info("Update maintenance started", {
      requestId,
      busId,
      maintenanceId,
    });

    const bus = await BusRepository.findByBusId({ busId });
    if (!bus) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    const updated = await BusMaintenanceRepository.updateMaintenance({
      busId,
      maintenanceId,
      updateData,
    });

    if (!updated) {
      throw new NotFoundError({ message: "Maintenance record not found" });
    }

    logger.info("Update maintenance success", {
      requestId,
      busId,
      maintenanceId,
    });

    return updated.maintenanceHistory;
  }

  // ================= GET MAINTENANCE HISTORY =================
  async getMaintenanceHistory(busId, requestId) {
    logger.info("Get maintenance history", { requestId, busId });

    const bus = await BusRepository.findByBusId({ busId });
    if (!bus) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    return await BusMaintenanceRepository.getHistory({ busId });
  }

  // ================= MAINTENANCE SUMMARY =================
  async getMaintenanceSummary(busId, requestId) {
    logger.info("Get maintenance summary", { requestId, busId });

    const history = await this.getMaintenanceHistory(busId, requestId);

    const summary = {
      totalRecords: history.length,
      totalCost: 0,
      byStatus: {},
      byType: {},
    };

    history.forEach((item) => {
      summary.totalCost += item.cost || 0;

      summary.byStatus[item.status] = (summary.byStatus[item.status] || 0) + 1;

      summary.byType[item.maintainType] =
        (summary.byType[item.maintainType] || 0) + 1;
    });

    return summary;
  }
}

module.exports = new BusMaintenanceService();
