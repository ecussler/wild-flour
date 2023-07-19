const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order_Detail extends Model {}

Order_Detail.init(
    {
      id: {
          type: DataTypes.INTEGER, 
          allowNull: false, 
          primaryKey: true, 
          autoIncrement: true, 
      }, 
      order_id: {
          type: DataTypes.INTEGER, 
          allowNull: false, 
          references: {
              model: 'order', 
              key: 'id', 
          }, 
      }, 
      product_id: {
          type: DataTypes.INTEGER, 
          allowNull: true, 
          references: {
              model: 'product', 
              key: 'id', 
          },
          defaultValue: 100 
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, 
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'order_detail',
    }
);

module.exports = Order_Detail; 

// We worked on this page together.