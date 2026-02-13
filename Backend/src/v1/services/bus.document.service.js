const busRepository = require("../models/repositories/bus.repo");
const { NotFoundError } = require("../core/error.response");
const { logger } = require("../helpers/logger/myLogger");

class BusDocumentService {
  async addDocument(busId, documentData, requestId) {
    logger.info("Add bus document", { requestId, busId });

    const bus = await busRepository.findByBusIdForUpdate({ busId });
    if (!bus) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    bus.documents.push(documentData);
    await bus.save();

    return bus.documents;
  }

  async updateDocument(busId, documentId, updateData, requestId) {
    logger.info("Update bus document", { requestId, busId, documentId });

    const bus = await busRepository.findByBusIdForUpdate({ busId });
    if (!bus) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    const document = bus.documents.id(documentId);
    if (!document) {
      throw new NotFoundError({ message: "Document not found" });
    }

    Object.assign(document, updateData);
    await bus.save();

    return document;
  }

  async deleteDocument(busId, documentId, requestId) {
    logger.info("Delete bus document", { requestId, busId, documentId });

    const bus = await busRepository.findByBusIdForUpdate({ busId });
    if (!bus) {
      throw new NotFoundError({ message: "Bus not found" });
    }

    bus.documents.pull(documentId);
    await bus.save();

    return true;
  }

  async getExpiringDocuments(days = 30, requestId) {
    logger.info("Get expiring documents", { requestId, days });

    return await busRepository.findExpiringDocuments(days);
  }
}

module.exports = new BusDocumentService();
