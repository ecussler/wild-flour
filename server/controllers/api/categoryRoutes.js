const router = require('express').Router();
const Category = require('../../models/Category');
const Product = require('../../models/Product'); 
const bcrypt = require('bcrypt');
const auth = require('../../utils/Auth');


// GET all categories.
router.get('/', async (req, res) => {
  try {
      const categoryData = await Category.findAll({ 
        include: { model: Product }
      });
      res.status(200).json(categoryData);
      // const category = categoryData.map((category) => category.get({ plain: true }));
      // res.render('category-gallery', {categories}); 
  } catch(err) {
    res.status(500).json(err);
  };
});


// GET a Category by specific ID.
router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: { model: Product }, 
      });
      if(!categoryData) {
        res.status(400).json({message: 'No category with that ID!'});
        return;
      }
      res.status(200).json(categoryData);   
    } catch(err) {
      res.status(500).json(err)
    }
  });


// GET a Category by specific category id and then get related products.
router.get('/:category_id/:product_category_id', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ['category_name'], 
      where: {id: req.params.category_id}, 
      include: [
      {model: Product, where: {category_id: req.params.category_id}}]
    });
    if(!categoryData) {
      res.status(400).json({message: 'No category-product combination with that ID!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err)
  }
});


// POST create a new category.
router.post('/', async (req, res) => {
    try {
      const categoryData = await Category.create({
       category_name: req.body.category_name, 
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
});


// PUT update a category.
router.put('/:id', async (req, res) => {
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!categoryData[0]) {
        res.status(404).json({message: 'No category with this ID!'});
        return;
      }
      res.status(200).json({message: 'The selected category was updated.'});
    } catch (err) {
      res.status(500).json(err);
    }
  });


// DELETE a category.
router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!categoryData) {
        res.status(404).json({message: 'No category with this ID!'});
        return;
      }
      res.status(200).json( {message: 'Category deleted.'});
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router; 