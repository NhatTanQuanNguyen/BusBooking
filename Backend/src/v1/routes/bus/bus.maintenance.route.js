const router = require('express').Router()
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const maintenanceController = require('../../controllers/bus.maintenance.controller')

// ================= MAINTENANCE =================
router.post(
    '/:busId/maintenance',
    asyncHandler(maintenanceController.addMaintenance)
)

router.put(
    '/:busId/maintenance/:maintenanceId',
    asyncHandler(maintenanceController.updateMaintenance)
)

router.get(
    '/:busId/maintenance/history',
    asyncHandler(maintenanceController.getMaintenanceHistory)
)

router.get(
    '/:busId/maintenance/summary',
    asyncHandler(maintenanceController.getMaintenanceSummary)
)

module.exports = router
