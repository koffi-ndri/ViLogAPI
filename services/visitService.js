const Visit = require("../models").Visit;
const moment = require("moment");

module.exports.VisitService = {
    async createVisit(visitorId){
        await Visit.create({
            visitorId,
            month: moment(Date.now()).format("MMMM")
        })
    }
}