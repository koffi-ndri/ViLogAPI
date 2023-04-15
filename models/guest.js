'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Guest.belongsTo(models.Employee, {
        foreignKey: "hostId",
        onDelete: "CASCADE",
      })

      Guest.hasMany(models.Visit, {
        foreignKey: "visitorId",
        onDelete: "CASCADE",
      })
    }
  }
  Guest.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    company: DataTypes.STRING,
    phone: DataTypes.STRING,
    profession: DataTypes.STRING,
    time_in: DataTypes.DATE,
    time_out: DataTypes.DATE,
    isSignedIn: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};