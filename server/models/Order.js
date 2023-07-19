const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const helpers = require('./utils/helpers');

//////// ** NEW SYSTEM TECHNOLOGY ** ////////  REFER TO THE HOOK-BEFORE-CREATE FUNCTION AT BELOW.
var moment = require('moment');
moment().format(); 
/////////////////////////////////////////////

class Order extends Model {}

Order.init(
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
      },
      product_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'product',
            key: 'id',
        }
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      order_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      special_instructions: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      hooks: {  
        beforeCreate: async (newOrderData) => {
          //
          // ** NEW SYSTEM TECHNOLOGY **:
          //
          // Use the new-to-class topic NPM "moment" module to generate a current-moment 
          // timestamp for the "order_date" field...and then use the "moment" module to
          // manipulate the "order_date" value by adding 3 processing/baking days to the 
          // involved order date to create the involved "due_date" field value.
          //

          newOrderData.order_date = moment().toDate();  // NEW SYSTEM TECHNOLOGY
          newOrderData.due_date = moment().add(3, 'days').toDate();  // NEW SYSTEM TECHNOLOGY
          //
          return newOrderData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'order',
    }
);

module.exports = Order;

// We worked on this page together.