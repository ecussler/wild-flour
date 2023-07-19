const seedOrders = require('./order-seeds');
const seedUsers = require('./userSeed'); 
const seedCategory = require('./category'); 
const seedProducts = require('./product'); 


const sequelize = require('../config/connection');
const seedOrderDetails = require('./order-details-seed');
const seedReviews = require('./review');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
 
  await seedCategory();
  console.log('\n----- CATEGORY SEEDED -----\n');
  
  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedReviews();
  console.log('\n----- REVIEWS SEEDED -----\n');

  await seedOrders();
  console.log('\n----- ORDERS SEEDED -----\n');

  await seedOrderDetails();
  console.log('\n----- ORDERS DETAILS SEEDED -----\n');
  
  process.exit(0); 
}

seedAll();
