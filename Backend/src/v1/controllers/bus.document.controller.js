const { OK, Created } = require("../core/success.response");
const busDocumentService = require("../services/bus.document.service");

class BusDocumentController {
  addDocument = async (req, res) => {
    const requestId = req.requestId;
    const { busId } = req.params;

    const data = await busDocumentService.addDocument(
      busId,
      req.body,
      requestId,
    );

    return new Created({
      message: "Document added successfully",
      data,
    }).send(res);
  };

  updateDocument = async (req, res) => {
    const requestId = req.requestId;
    const { busId, documentId } = req.params;

    const data = await busDocumentService.updateDocument(
      busId,
      documentId,
      req.body,
      requestId,
    );

    return new OK({
      message: "Document updated successfully",
      data,
    }).send(res);
  };

  deleteDocument = async (req, res) => {
    const requestId = req.requestId;
    const { busId, documentId } = req.params;

    const data = await busDocumentService.deleteDocument(
      busId,
      documentId,
      requestId,
    );

    return new OK({
      message: "Document deleted successfully",
      data,
    }).send(res);
  };

  getExpiringDocuments = async (req, res) => {
    const requestId = req.requestId;
    const days = parseInt(req.query.days) || 30;

    const data = await busDocumentService.getExpiringDocuments(days, requestId);

    return new OK({ data }).send(res);
  };
}

module.exports = new BusDocumentController();
