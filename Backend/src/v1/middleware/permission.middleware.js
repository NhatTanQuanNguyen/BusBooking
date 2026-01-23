const permission = (permissionRequired) => {
    return (req, res, next) => {
        if (!req.objKey || !req.objKey.permissions) {
            return res.status(403).json({
                message: 'Forbidden Error: Permission denied'
            });
        }

        const validPermission = req.objKey.permissions.includes(permissionRequired);
        
        if (!validPermission) {
            return res.status(403).json({
                message: 'Forbidden Error: Permission denied'
            });
        }

        return next();
    };
};

module.exports = permission;