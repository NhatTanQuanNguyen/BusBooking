const { ForbiddenError } = require('../core/error.response');
const { logger } = require('../helpers/logger/myLogger');

const permissionMiddleware = (permissionRequired) => {
    return (req, res, next) => {
        const requestId = req.headers['x-request-id'] || 'no-id';

        if (!req.objKey || !req.objKey.permissions) {
            const errorMsg = 'Forbidden Error: No permissions found for this key';
            
            logger.error(errorMsg, requestId, {
                url: req.originalUrl,
                method: req.method
            });

            throw new ForbiddenError({ message: errorMsg });
        }

        const validPermission = req.objKey.permissions.includes(permissionRequired);
        
        if (!validPermission) {
            const errorMsg = 'Forbidden Error: Permission denied';
            
            logger.error(errorMsg, requestId, {
                url: req.originalUrl,
                required: permissionRequired,
                actual: req.objKey.permissions, 
                keyId: req.objKey._id 
            });

            throw new ForbiddenError({ message: errorMsg });
        }

        logger.info(`Permission granted: [${permissionRequired}]`, requestId, {
            url: req.originalUrl,
            method: req.method
        });

        return next();
    };
};

module.exports = permissionMiddleware;