const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true, 
        }, 
        product_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references: {
                model: 'product', 
                key: 'id', 
            }, 
        }, 
        user_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references: {
                model: 'user', 
                key: 'id', 
            }, 
        }, 
        review_content: {
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
    }, 
);

module.exports = Review; 

// We worked on this page together.