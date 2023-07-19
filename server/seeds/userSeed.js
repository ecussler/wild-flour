const User = require('../models/User');
const userSeedData = require('./userSeedData.json');

const seedUsers = () => User.bulkCreate(userSeedData, {individualHooks: true})
  // The user seed data is contained in an external file for the conceivable situation of it
  // becoming a very-long list that would reduce the simplicity/organization of this related 
  // processing file.
  .then(() => {
    console.log('The database is seeded with user data.');
    //res.send('The database is seeded with user data.');
  })
  .catch((err) => {
    console.log(`ERROR: The database was not seeded with user data because of a database or 
      interface processing error.`);
    //res.json(err);
  });

module.exports = seedUsers; 