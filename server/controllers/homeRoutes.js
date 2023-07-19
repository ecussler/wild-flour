const router = require('express').Router();
const auth = require('../utils/Auth');
const Category = require('../models/Category');
const {Product, Order, Order_Detail, User} = require('../models');
const Review = require('../models/Review');
// router.use('/', homeRoutes);


router.get('/', async (req, res) => {
  try {
      res.render("homepage", {      
          loggedIn: req.session.loggedIn, 
          //
          loggedOnUserEmail: req.session.loggedOnUserEmail, 
          loggedOnUserID: req.session.loggedOnUserID, 
          loggedOnUserFirstName: req.session.loggedOnUserFirstName, 
          loggedOnUserLastName: req.session.loggedOnUserLastName, 
          loggedOnUserFullName: req.session.loggedOnUserFullName, 
          //
      });
  } catch(err) {
      res.status(500).json({message: "An error occurred, please try again. If problem persists, contact us"});
  }
});


router.get('/login', async (req, res) => {
    res.render('login',);
});


// GET all products, public view
router.get('/product', (req, res) => {
  Product.findAll().then((productData) => {
    const products = productData.map((product) => product.get({ plain: true }));
    console.log('these are the products hopefully', products);
    res.render('product-gallery', { products });
  })
  .catch((err => res.status(400).json(err)));
});


// GET all categories, public view
router.get('/category', async (req, res) => {
  //console.log('test')
  try {
    const categoryData = await Category.findAll({
      include: 
        { 
          model: Product,
          attributes: [
            'id',
            'product_name',
            'category_id',
            'price_per',
            'description',
            'filename'
          ] 
        }
    });
    const categories = categoryData.map((category) => category.get({ plain: true }));
    // const productDetails = categoryData.Product.map((product) => JSON.parse(product.get({ plain: true})))
    // console.log(JSON.parse(categories));
    console.table('categories', categories);
    // console.log('prods', productDetails);
    res.render('category-gallery', {categories});
  } catch(err) {
    res.status(400).json(err);
  }
})


// GET all products by specific category ID.
router.get('/product/category/:id', async (req, res) => {
  try {
    const productData = await Product.findAll({
      where: {category_id: req.params.id},
      include: 
        { 
          model: Category,
          attributes: [
            'id',
            'category_name', 
          ] 
        }
    });
    if(productData) {
      const products = productData.map((product) => product.get({plain: true}));
      res.render('product-gallery', {products});
    } else {
      res.status(400).json({message: 'There is not a product-category that has that ID.'});
      return;
    }
  } catch(err) {
    res.status(500).json(err)
  }
});


// GET a Category by specific category id and then get related products. 
// WE DID NOT USE THIS ROUTE
// router.get('/category/:category_id/:product_category_id', async (req, res) => {
//   try {
//     const categoryData = await Category.findAll({
//       attributes: ['category_name'], 
//       where: {id: req.params.category_id}, 
//       include: [{model: Product, where: {category_id: req.params.category_id}}]
//     });
//     if(categoryData) {
//       const category = categoryData.map((category) => category.get({plain: true}));
//       //const category = categoryData.get({ plain: true });
//       res.render('category', {category});
//       //res.status(200).json(categoryData);
//     } else {
//       res.status(400).json({message: 'No category-product combination with that ID!'});
//       return;
//     }
//   } catch(err) {
//     res.status(500).json(err)
//   }
// });


// GET all orders - for demonstration
router.get('/Order', (req, res) => {
  Order.findAll().then((orderData) => {
    const orders = orderData.map((order) => order.get({ plain: true }));
    //console.log('these are the Orders hopefully', orders);
    res.render('order', { orders });
  })
  .catch((err => res.status(400).json(err)));
});



// GET all orders for a specific user
router.get('/order/user/:id', async (req, res) => {
  try {
    const orderData = await Order.findAll({
      where: {user_id: req.params.id}, 
      include: [{model: Product}, {model: Order_Detail}]
      });
    if(orderData) {
      const orders = orderData.map((order) => order.get({plain: true}));
      res.render('order', {orders});
    } else {
      res.status(400).json({message: 'There is not any order information that has that user ID (' + req.params.id + ').'});
      return;
    }
  } catch(err) {
    res.status(500).json(err)
  }
});


// GET all reviews by specific product ID.
router.get('/review/product/:id', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {product_id: req.params.id}, 
      include: [{model: Product}, {model: User, attributes: {exclude: 'password'} }]
    });
    if(reviewData) {
      const reviews = reviewData.map((review) => review.get({plain: true}));
      res.render('reviews', {reviews});
    } else {
      res.status(400).json({message: 'There is not a review that is for that product ID.'});
      return;
    }
  } catch(err) {
    res.status(500).json(err)
  }
});


// GET all reviews for a product with a certain ID
router.get('/review/product/:id', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {product_id: req.params.id}
    });
    if(reviewData) {
      const reviews = reviewData.map((review) => review.get({plain: true}));
      res.render('reviews', {reviews});
    } else {
      res.status(400).json({message: 'There is not a review that is for that product ID.'});
      return;
    }
  } catch(err) {
    res.status(500).json(err)
  }
});


module.exports = router;
