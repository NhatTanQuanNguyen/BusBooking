const { BusCompanyService }= require('../services/bus.company.service');
const { OK } = require("../core/success.response");
const { logger } = require('../helpers/logger/myLogger');
const { BadRequestError } = require('../core/error.response');

class BusCompanyController {
    registerBusCompany = async (req, res, next) => {
        logger.info('Bus company registration request received', { 
            body: req.body 
        })

        const data = await BusCompanyService.registerBusCompany(req.body)

        if (!data) {
            logger.error('Bus company registration failed', { 
                body: req.body 
            });
            
            throw new Error('Bus company registration failed');
        }

        return new OK({
            message: 'Bus company registered successfully',
            data
        }).send(res);
    }

    subscribePlan = async (req, res, next) => {
        const {company_id, plan_name} = req.body;
        if (!company_id || !plan_name) {
            throw new BadRequestError({ message: 'Missing company_id or plan_name' });
        }

        logger.info('Bus company subscription request received', { 
            company_id, 
            plan_name 
        })
        
        const data = await BusCompanyService.subscribePlan({ company_id, plan_name: plan_name });
        if (!data) {
            logger.error('Bus company subscription failed', { 
                company_id, 
                plan_name 
            });
            throw new BadRequestError({ message: 'Bus company subscription failed' });
        }

        return new OK({
            message: 'Bus company subscribed to plan successfully',
            data
        }).send(res);
    }

    updateProfile = async (req, res, next) => {
        const company_id = req.params?.company_id || req.body?.company_id || req.query?.company_id;

        if (!company_id) {
            throw new BadRequestError({ message: 'Missing company_id' });
        }

        logger.info('Bus company update request received', { 
            company_id,
            body: req.body 
        })

        const data = await BusCompanyService.updateCompany({
            company_id,
            payload: req.body
        });
        
        if (!data) {
            logger.error('Bus company update failed', { 
                company_id, 
                payload: req.body 
            });

            throw new BadRequestError({ message: 'Bus company update failed' });
        }

        return new OK({
            message: 'Bus company updated successfully',
            data
        }).send(res);
    }
}

module.exports = {
    BusCompanyController: new BusCompanyController()
}