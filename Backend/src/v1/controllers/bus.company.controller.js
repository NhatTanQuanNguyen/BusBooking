const { BusCompanyService }= require('../services/bus.company.service')
const { OK } = require("../core/success.response")
const { logger } = require('../helpers/logger/myLogger')

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
        const { company_id, branches } = req.body

        logger.info('Bus company add branch start', { requestId, company_id, branches })

        const data = await BusCompanyService.addBranch({ company_id, branches }, { requestId })
        
        logger.info('Bus company add branch done', { requestId, company_id })

        return new OK({
            message: 'Branch added successfully',
            data
        }).send(res);
    }

    deleteBranch = async (req, res, next) => {
        const requestId = req.requestId
        const { company_id, branch_id } = req.body // Nhận branch_id

        logger.info('Bus company delete branch start', { requestId, company_id, branch_id })

        const data = await BusCompanyService.deleteBranch({ company_id, branch_id }, { requestId })

        logger.info('Bus company delete branch done', { requestId, company_id })

        return new OK({
            message: 'Branch deleted successfully',
            data
        }).send(res);
    }

    updateBranch = async (req, res, next) => {
        const requestId = req.requestId
        const { company_id, branch_id, update_data } = req.body

        logger.info('Bus company update branch start', { requestId, company_id, branch_id })

        const data = await BusCompanyService.updateBranch({ company_id, branch_id, update_data }, { requestId })

        logger.info('Bus company update branch done', { requestId, company_id })

        return new OK({
            message: 'Branch updated successfully',
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

    getById = async (req, res, next) => {
        const requestId = req.requestId
        const { company_id } = req.params

        logger.info('Bus company get by ID start', { requestId, company_id })

        const data = await BusCompanyService.getById({ company_id }, { requestId })

        logger.info('Bus company get by ID done', { requestId })

        return new OK({
            message: 'Bus company retrieved successfully',
            data
        }).send(res);
    }

    getList = async (req, res, next) => {
        const requestId = req.requestId
        const skip = parseInt(req.query.skip || 0, 10)
        const limit = parseInt(req.query.limit || 10, 10)

        logger.info('Bus company get list start', { requestId, skip, limit })

        const data = await BusCompanyService.getList({ skip, limit }, { requestId })

        logger.info('Bus company get list done', { requestId })

        return new OK({
            message: 'Bus company list retrieved successfully',
            data
        }).send(res);
    }
}

module.exports = {
    BusCompanyController: new BusCompanyController()
}