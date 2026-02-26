const { OK, Created } = require("../core/success.response");
const busMaintenanceService = require("../services/bus.maintenance.service");

class BusMaintenanceController {
  addMaintenance = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    const data = await busMaintenanceService.addMaintenance(
      busId,
      req.body,
      requestId,
    );

    return new Created({
      message: "Maintenance record added successfully",
      data,
    }).send(res);
  };

  updateMaintenance = async (req, res) => {
    const requestId = req.requestId;
    const { busId, maintenanceId } = req.params;

    const data = await busMaintenanceService.updateMaintenance(
      busId,
      maintenanceId,
      req.body,
      requestId,
    );

    return new OK({
      message: "Maintenance updated successfully",
      data,
    }).send(res);
  };

  getMaintenanceHistory = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    const data = await busMaintenanceService.getMaintenanceHistory(
      busId,
      requestId,
    );

    return new OK({ data }).send(res);
  };

  getMaintenanceSummary = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    const data = await busMaintenanceService.getMaintenanceSummary(
      busId,
      requestId,
    );
    return new OK({ data }).send(res);
  };
}

module.exports = new BusMaintenanceController();
