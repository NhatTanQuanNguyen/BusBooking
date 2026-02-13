const { BusCompanyService }= require('../services/bus.company.service');
const { OK } = require("../core/success.response");
const { logger } = require('../helpers/logger/myLogger');

class BusCompanyController {
    registerBusCompany = async (req, res, next) => {
        const requestId = req.requestId
        logger.info('Bus company register start', { 
            requestId,
            body: req.body
        })

        const data = await BusCompanyService.registerBusCompany(req.body, { requestId })

        logger.info('Bus company register done', { requestId })

        return new OK({
            message: 'Bus company registered successfully',
            data
        }).send(res);
    }

    addBranch = async (req, res, next) => {
        const requestId = req.requestId
        const { company_id, branch } = req.body

        logger.info('Bus company add branch start', { requestId, company_id, branch })

        const data = await BusCompanyService.addBranch({ company_id, branch }, { requestId })
        
        logger.info('Bus company add branch done', { requestId, company_id })

        return new OK({
            message: 'Branch added successfully',
            data
        }).send(res);
    }

    subscribePlan = async (req, res, next) => {
        const requestId = req.requestId
        const { company_id, plan_name } = req.body;

        logger.info('Bus company subscribe start', { requestId, company_id, plan_name })
        
        const data = await BusCompanyService.subscribePlan({ company_id, plan_name }, { requestId });
        
        logger.info('Bus company subscribe done', { requestId })

        return new OK({
            message: 'Bus company subscribed to plan successfully',
            data
        }).send(res);
    }

    updateProfile = async (req, res, next) => {
        const requestId = req.requestId
        const { company_id, ...payload } = req.body

        logger.info('Bus company update start', { requestId, company_id })

        const data = await BusCompanyService.updateCompany({ company_id, payload }, { requestId });
        
        logger.info('Bus company update done', { requestId })

        return new OK({
            message: 'Bus company updated successfully',
            data
        }).send(res);
    }
}

module.exports = {
    BusCompanyController: new BusCompanyController()
}