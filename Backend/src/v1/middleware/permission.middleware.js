export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.apiKey.permissions.includes(permission)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};
