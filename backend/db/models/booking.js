'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      );

      Booking.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      )
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Spots'} 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false, 
      validate: {
        checkStartDate(value) {
          if(value <= this.startDate) {
            throw new Error('endDate cannot be on or before startDate');
          };
       },
      //  checkCurrentDate(value) {
      //   const currentDate = new Date();
      //   if(value < currentDate) {
      //     throw new Error("Past bookings can't be modified");
      //   }
      // },
     }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};