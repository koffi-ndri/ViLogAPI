'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Visit.belongsTo(models.Guest, {
        foreignKey: "visitorId",
        onDelete: "CASCADE",
      })
    }
  }
  Visit.init({
    month: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Visit',
  });
  return Visit;
};