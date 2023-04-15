'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.hasMany(models.Guest, {
        foreignKey: "hostId",
        onDelete: "CASCADE",
      })

      Employee.hasOne(models.SecurityLevel, {
        foreignKey: "security_level",
        onDelete: "CASCADE",
      })
    }
  }
  Employee.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    profession: DataTypes.STRING,
    security_level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};