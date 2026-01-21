import { ApiKeyModel } from "../models/repositories/index.js";
import { hashApiKey } from "../services/apiKey.service.js";

export const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "API Key required" });
  }

  const keyHash = hashApiKey(apiKey);

  const keyData = await ApiKeyModel.findOne({
    key_hash: keyHash,
    status: "ACTIVE"
  });

  if (!keyData) {
    return res.status(403).json({ message: "Invalid API Key" });
  }

  req.apiKey = keyData;
  next();
};
