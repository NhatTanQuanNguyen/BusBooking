import { ApiKeyModel } from "../models/repositories/index.js";
import { generateApiKey, hashApiKey } from "../services/apiKey.service.js";
import { SuccessResponse } from "../core/success.response.js";

export const createApiKey = async (req, res) => {
  const { service_name, permissions } = req.body;

  const apiKey = generateApiKey();
  const keyHash = hashApiKey(apiKey);

  await ApiKeyModel.create({
    key_hash: keyHash,
    service_name,
    permissions
  });

  return new SuccessResponse({
    message: "Create API key success",
    metadata: { apiKey }
  }).send(res);
};

export const updateApiKey = async (req, res) => {
  const { permissions, status } = req.body;

  await ApiKeyModel.findByIdAndUpdate(req.params.id, {
    permissions,
    status
  });

  return new SuccessResponse({
    message: "Update API key success"
  }).send(res);
};
