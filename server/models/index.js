
// Table data model associations
const Category = require('./Category');  // for the "Categories" table data model association
const Product = require('./Product');   // for the "Products" table data model association
const User = require('./User');  // for the "Users" table data model association
const Order = require('./Order');  // for the "Orders" table data model association
const Review = require('./Review');  // for the "Reviews" table data model association
const Order_Detail = require('./Order_Detail');

// "Categories" data/table relationships:

// for the one-to-many relationship with the "Products" table
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// "Products" data/table relationships:

Product.belongsTo(Category, {
  foreignKey: 'category_id', 
})

// for the one-to-many relationship with the "Reviews" table
Product.hasMany(Review, {
  foreignKey: 'product_id'
  // other options?
});

// for the many-to-many relationship with the "Orders" table
Product.belongsToMany(Order, {
  through: Order_Detail,
  foreignKey: 'product_id'
});  

// "Users" data/table relationships:

// for the one-to-many relationship with the "Orders" table
User.hasMany(Order, {
  foreignKey: 'user_id'
  // No delete should occur; only set "Cancelled" status.
  // other options?
});
  
// for the one-to-many relationship with the "Reviews" table
User.hasMany(Review, {
  foreignKey: 'user_id'
  // No delete should occur; only set "Cancelled" status.
  // other options?
});

// "Orders" data/table relationships:

Order.hasMany(Order_Detail, {
  foreignKey: 'order_id'
})

// for the many-to-one relationship with the "Users" table
Order.belongsTo(User, {
  foreignKey: 'user_id'
  // other options?
});

// for the many-to-many relationship with the "Products" table
Order.belongsToMany(Product, {
  through: Order_Detail,
  foreignKey: 'order_id',
});

//Order_Detail.belongsTo(Order, {
//  foreignKey: 'order_id'
//});

//Order_Detail.hasMany(Order, {
//  foreignKey: 'order_id'
//});
  


//
// "Reviews" data/table relationships:

// for the many-to-one relationship with the "Users" table
Review.belongsTo(User, {
  foreignKey: 'user_id'
  // other options?
});

// for the many-to-one relationship with the "Products" table
Review.belongsTo(Product, {
  foreignKey: 'product_id'
  // other options?
});

// data models exports

module.exports = { User, Category, Order, Order_Detail, Product, Review };
