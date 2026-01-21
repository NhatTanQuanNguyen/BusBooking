import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    key_hash: { type: String, required: true, index: true },
    service_name: { type: String },
    permissions: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["ACTIVE", "REVOKED"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

export default mongoose.model("ApiKey", apiKeySchema);
