const router = require('express').Router();
const Order_Detail = require('../../models/Order_Detail');
const auth = require('../../utils/Auth');


// GET all order details records.
router.get('/', async (req, res) => {
  try {
    const Order_DetailData = await Order_Detail.findAll();
    res.status(200).json(Order_DetailData);
  } catch(err) {
    res.status(500).json(err);
  };
});


// GET an order details record by specific ID.
router.get('/:id', async (req, res) => {
  try {
    const Order_DetailData = await Order_Detail.findByPk(req.params.id);
    if (!Order_DetailData){
      res.status(404).json({message: 'There is not an order details record that has that id.'});
      return;
    }

    res.status(200).json(Order_DetailData);  
  } catch(err) {
    res.status(500).json(err);
  }
})


// POST create a new order details record.
router.post('/', async (req, res) => {  // TO-DO: Re-add "auth,".
  try {
    const Order_DetailData = await Order_Detail.create({
      order_id: req.body.order_id, 
      product_id: req.body.product_id, 
      quantity: req.body.quantity
    });
    res.status(200).json(Order_DetailData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// PUT update an order details record.
router.put('/:id', async (req, res) => {  // TO-DO: Re-add "auth,".
  try {
    const Order_DetailData = await Order_Detail.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!Order_DetailData[0]) {
      res.status(404).json({message: 'There is not an order details record that has that ID.'});
      return;
    }
    res.status(200).json({message: 'The selected order details record was updated.'});
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE an order details record.
router.delete('/:id', async (req, res) => {  // TO-DO: Re-add "auth,".
  try {
    const Order_DetailData = await Order_Detail.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!Order_DetailData) {
      res.status(404).json({message: 'There is not an order details record that has that ID.'});
      return;
    }
    res.status(200).json({message: 'The selected order details record was deleted.'});
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;