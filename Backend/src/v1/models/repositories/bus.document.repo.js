const BusModel = require("../bus.model");

class BusDocumentRepository {
  async addDocument({ busId, document }) {
    return await BusModel.findOneAndUpdate(
      { busId },
      { $push: { documents: document } },
      { new: true },
    ).lean();
  }

  async updateDocument({ busId, documentId, updateData }) {
    return await BusModel.findOneAndUpdate(
      { busId, "documents._id": documentId },
      { $set: { "documents.$": updateData } },
      { new: true },
    ).lean();
  }

  async removeDocument({ busId, documentId }) {
    return await BusModel.findOneAndUpdate(
      { busId },
      { $pull: { documents: { _id: documentId } } },
      { new: true },
    ).lean();
  }
}

module.exports = new BusDocumentRepository();
