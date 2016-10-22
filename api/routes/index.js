var express = require('express');
var router = express.Router();
var hotelController = require('../controllers/hotels.controller');
var reviewsController = require('../controllers/reviews.controller');
var usersController = require('../controllers/users.controller');

router
    .route('/hotels')
    .get(hotelController.fetchAll)
    .post(hotelController.addOne);


router
    .route('/hotels/:hotelId')
    .get(hotelController.fetchOne)
    .put(usersController.authenticate, hotelController.update)
    .delete(usersController.authenticate, hotelController.delete);

router
    .route('/hotels/:hotelId/reviews')
    .get(reviewsController.fetchAll)
    .post(usersController.authenticate, reviewsController.addOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(reviewsController.fetchOne);

router
    .route('/users/register')
    .post(usersController.register);

router
    .route('/users/login')
    .post(usersController.login);

module.exports = router;