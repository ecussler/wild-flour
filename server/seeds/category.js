const { Category } = require('../models'); 

const categoryData = [
    {
        category_name: "Cookies",
        filename: "cookies-thumb.jpg", 
    },
    {
        category_name: "Pies",
        filename: "pies-thumb.jpg", 
    },
    {
        category_name: "Cakes",
        filename: "cakes-thumb.jpg", 
    },
    {
        category_name: "Cheesecakes",
        filename: "cheesecakes-thumb.jpg", 
    },
    {
        category_name: "Pastries",
        filename: "pastries-thumb.jpg", 
    },
    {
        category_name: "Bread",
        filename: "bread-thumb.jpg", 
    },
    {
        category_name: "Gluten-Free",
        filename: "gf-thumb.jpg", 
    },
    {
        category_name: "Vegan",
        filename: "vegan-thumb.jpg", 
    }
]; 

const seedCategory = () => Category.bulkCreate(categoryData); 

module.exports = seedCategory; 