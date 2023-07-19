const router = require('express').Router();


const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const orderDetailRoutes = require('./orderDetailRoutes');
const reviewRoutes = require('./reviewRoutes');
const categoryRoutes = require('./categoryRoutes'); 


router.use('/order', orderRoutes);
router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/order_detail', orderDetailRoutes);
router.use('/review', reviewRoutes);
router.use('/category', categoryRoutes); 


module.exports = router;