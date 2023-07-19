const router = require('express').Router();
const { Order, User, Product, Order_Detail } = require('../../models');
const auth = require('../../utils/Auth');


// Route to get all orders.
router.get('/', async (req, res) => {
  try {
    const OrderData = await Order.findAll({
      include: [
        {
          model: Order_Detail
        },
        {
          model: User,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone_number'
          ]
        },
        {
          model: Product
        }
      ]
    });
    if(!OrderData) {
      res.status(400).json({ message: 'No Order found'})
      return;
    }
    // const Orders = OrderData.map((Order) => Order.get({ plain: true }));
    res.status(200).json(OrderData);
  } catch (err) {
    res.status(500).json(err)
  }
});


// Route to get an order by specific ID.
router.get('/:id', async (req, res) => {
  try {
    const orderData = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Order_Detail
        },
        {
          model: User,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone_number'
          ]
        },
        {
          model: Product
        }
      ]
    });
    if(!orderData) {
      res.status(400).json({ message: 'No order with that id!'});
      return;
    }
    const order = orderData.get({ plain: true });
    res.status(200).json(order);
  } catch(err) {
    res.status(500).json(err);
  }
});


// POST create a new order.
router.post('/', async (req, res) => {  // TO-DO: Re-add "auth,".
    try {
      const orderData = await Order.create({
        user_id: req.body.user_id, 
        product_id: req.body.product_id, 
        special_instructions: req.body.special_instructions,
        total_price: req.body.total_price,
      });
      res.status(200).json(orderData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// PUT update a order.
router.put('/:id',  async (req, res) => { 
  try {
    const OrderData = await Order.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!OrderData[0]) {
      res.status(404).json({message: 'There is not a Order that has that ID.'});
      return;
    }
    res.status(200).json({message: 'The selected Order was updated.'});
  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete remove an order.
router.delete('/:id', async (req, res) => {
  try {
    const OrderData = await Order.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!OrderData) {
      res.status(404).json({message: 'There is not a Order that has that ID.'});
      return;
    }
    res.status(200).json({message: 'The selected Order was deleted.'});
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;