const router = require('express').Router();
const { Review, Product, User } = require('../../models');


// Get all reviews.
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [{ model: Product }, {model: User, attributes: ['last_name', 'first_name', 'email']}]
    });
    if(!reviewData) {
      res.status(400).json({ message: 'No review found'})
      return;
    }
    // const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.status(200).json(reviewData)
  } catch (err) {
    res.status(500).json(err)
  }
  
});


// Get review by ID.
router.get('/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [{ model: Product }, { model: User, attributes: {exclude: 'password'} }]
    });
    res.status(200).json(reviewData)
  } catch (err) {
    res.status(500).json(err)
  }
});


// GET all reviews by specific product ID.
router.get('/product/:id', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {product_id: req.params.id}, 
    });
    if(reviewData) {
      res.status(200).json(reviewData);
      const reviews = reviewData.map((review) => review.get({plain: true}));
      //res.render('reviews', {reviews});
    } else {
      res.status(400).json({message: 'There is not a review that is for that product ID.'});
      return;
    }
  } catch(err) {
    res.status(500).json(err)
  }
});


// create a new review / review body
// {
//    "product_id": 1,   
//    "user_id": 1,
//    "review_content": "This is a good item!",
//  }


router.post('/', async (req, res) => {
  try {
    const reviewData = await Review.create({
      product_id: req.body.product_id,
      user_id: req.body.user_id,
      review_content: req.body.review_content
    });
    res.status(200).json({ message: 'New review created!', reviewData})
  } catch (err) {
    res.status(400).json(err)
  }
});


router.put('/:id', async (req, res) => {
  try {
    const reviewData = await Review.update(
      {
        review_content: req.body.review_content,
      },
      {
        where: {
          id: req.params.id,
        }
      });
      if (!reviewData[0]) {
        res.status(404).json({message: 'There is not a review that has that ID.'});
        return;
      }
      res.status(200).json({message: 'The selected review was updated.'});
    } catch (err) {
      res.status(500).json(err);
    }
});


// Delete a review by ID.
router.delete('/:id', async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!reviewData){
      res.status(400).json({ message: 'No review with that id!'});
      return;
    }
    res.status(200).json({ message: 'Review deleted successfully!'})
  } catch(err) {
    res.status(400).json(err)
  }
});


module.exports = router;