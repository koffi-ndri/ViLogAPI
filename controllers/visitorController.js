const { Op } = require("sequelize");

const Guest = require("../models").Guest;
const Employee = require("../models").Employee;
const { VisitService } = require("../services/visitService");
const { MailService } = require("../services/mailService");
const APIError = require("../helpers/apiError");

module.exports.visitorLogin = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        company,
        phone,
        profession,
        hostId } = req.body;

    const validHostId = await Employee.findOne({
        where: {id: hostId}
    })

    if(!validHostId){
        return next(APIError.sendBadRequestResponse("Invalid hostId"));
    }

    const host = validHostId;

    const hasVisitedBefore = await Guest.findOne({
        where: {
            [Op.and]: [{ firstName }, { lastName }, { email }, { company }, { phone }, { profession }]
        }
    })

    const data = {
        firstName,
        lastName,
        email,
        company,
        phone,
        profession,
        hostId,
        time_in: Date.now(),
        time_out: null,
        isSignedIn: true
    };
    const visitorId = hasVisitedBefore?.id;
    if (hasVisitedBefore?.isSignedIn) {
        return next(APIError.sendBadRequestResponse("User already logged in"));
    }

    if (hasVisitedBefore) {
        await Guest.update(data, {
            where: { id: visitorId }
        })
        VisitService.createVisit(visitorId);
        MailService.notifyHostOfVisit(host, data);
    } else {
        await Guest.create(data);
        VisitService.createVisit(visitorId);
        MailService.notifyHostOfVisit(host, data);
    }
    res.status(200).json({
        message: "Visitor logged successfully"
    })
}


module.exports.getAllVisitors = async (req, res) => {
    const visitors = await Guest.findAll({
        attributes: [
            'firstName',
            'lastName',
            'email',
            'company',
            'phone',
            'profession',
            'time_in',
            'time_out',
            'isSignedIn'],

        include: [{
            model: Employee,
            attributes: ['firstname']
        }]
    });

    const structuredVisitorsList = visitors.map(visitor => {
        const hostFirstName = visitor.Employee?.firstname;
        const {
            firstName,
            lastName,
            email,
            company,
            phone,
            profession,
            time_in,
            time_out,
            isSignedIn } = visitor
        return {
            firstName,
            lastName,
            email,
            company,
            phone,
            profession,
            time_in,
            time_out,
            isSignedIn,
            hostFirstName
        }
    })
    res.status(200).json(structuredVisitorsList);
}

module.exports.visitorLogout = async (req, res, next) => {
    const { visitorId } = req.params;

    const visitorExists = await Guest.findByPk(visitorId);
    if (!visitorExists) {
        return next(APIError.sendBadRequestResponse("Invalid visitor id"));
    }

    if (!visitorExists.isSignedIn) {
        return res.status(200).json({
            message: "Visitor already signed out"
        })
    }
    const data = {
        time_out: Date.now(),
        isSignedIn: false
    }

    Guest.update(data, {
        where: { id: visitorId }
    }).then(() => {
        res.status(200).json({
            message: "Successfully logged out"
        })
    })
}