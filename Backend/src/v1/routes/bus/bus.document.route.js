const router = require('express').Router()
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const documentController = require('../../controllers/bus.document.controller')

// ================= DOCUMENT =================
router.post(
    '/:busId/documents',
    asyncHandler(documentController.addDocument)
)

router.put(
    '/:busId/documents/:documentId',
    asyncHandler(documentController.updateDocument)
)

router.delete(
    '/:busId/documents/:documentId',
    asyncHandler(documentController.deleteDocument)
)

router.get(
    '/documents/expiring',
    asyncHandler(documentController.getExpiringDocuments)
)

module.exports = router
