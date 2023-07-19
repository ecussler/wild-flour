const { Review } = require('../models'); 

const reviewData = [
    {
        product_id: 1, 
        user_id: 1, 
        review_content: 'The best chocolate chip cookie ever! So chewy and soft.'
    }, 
    {
        product_id: 1, 
        user_id: 1, 
        review_content: 'THIS IS THE WORST COOKIE EVER.'
    },  
    {
        product_id: 4, 
        user_id: 2, 
        review_content: 'Key lime pie is one of my favorite pies and Sweet Solutions does it best!'
    }, 
    {
        product_id: 7, 
        user_id: 3, 
        review_content: 'Even my son (who is not a fan of coconut) loved these cupcakes. Rich chocolate cake packed with flavor.'
    }, 
    {
        product_id: 10, 
        user_id: 4, 
        review_content: 'The classic New York cheesecake is to die for. Got our with a fresh strawberry topping which took it over the top!'
    }, 
    {
        product_id: 13, 
        user_id: 5, 
        review_content: 'Fresh scones are my weakness and the chocolate chip scone from Sweet Solutions is incredible.'
    }, 
    {
        product_id: 18, 
        user_id: 1, 
        review_content: 'The basic sourdough loaf is a great addition to any meal. They have mastered the flavor you hardly need anything else!'
    }, 
    {
        product_id: 23, 
        user_id: 2, 
        review_content: 'Got the gluten-free banana bread for a friend and they loved it! It can be difficult to get the texture right in gluten-free baked goods but they nailed this one.'
    },
    {
        product_id: 26, 
        user_id: 3, 
        review_content: 'Coffee and chocolate together AND it is vegan? Sign me up!'
    },  
]

const seedReviews = () => Review.bulkCreate(reviewData); 

module.exports = seedReviews; 