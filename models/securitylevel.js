'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SecurityLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SecurityLevel.belongsTo(models.Employee, {
        foreignKey: "security_level",
        onDelete: "CASCADE",
      })
    }
  }
  SecurityLevel.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SecurityLevel',
  });
  return SecurityLevel;
};