var express = require('express');
var router = express.Router();
var hotelController = require('../controllers/hotels.controller');
var reviewsController = require('../controllers/reviews.controller');

router
    .route('/hotels')
    .get(hotelController.fetchAll)
    .post(hotelController.addOne);


router
    .route('/hotels/:hotelId')
    .get(hotelController.fetchOne)
    .put(hotelController.update)
    .delete(hotelController.delete);

router
    .route('/hotels/:hotelId/reviews')
    .get(reviewsController.fetchAll)
    .post(reviewsController.addOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(reviewsController.fetchOne);

module.exports = router;