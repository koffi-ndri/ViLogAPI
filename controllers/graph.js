const { sequelize } = require("../models");

const Visit = require("../models").Visit;

module.exports.graph = async (req, res) => {
    const result = await Visit.findAll({
        attributes: ["month", [sequelize.fn("count", sequelize.col("id")), "number_of_visit"]],
        group: ["month"]
    })

    if (result.lenght === 0){
        return res.status(404).json({
            message: "There are no visits"
        })
    }

    res.status(200).json(result)
}