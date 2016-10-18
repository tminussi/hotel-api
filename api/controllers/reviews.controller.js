var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
module.exports.fetchAll = function (req, res) {
    Hotel
        .findById(req.params.hotelId)
        .select('reviews')
        .exec(function (err, data) {
            if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            return res
                .status(200)
                .json(data.reviews);
        });
};

module.exports.fetchOne = function (req, res) {
    let hotelId = req.params.hotelId;
    let reviewId = req.params.reviewId;

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function (err, hotel) {
            let review = hotel.reviews.id(reviewId);
            if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            return res
                .status(200)
                .json(review);
        });

};

var _addReview = function (req, res, hotel) {

    hotel.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating, 10),
        review : req.body.review
    });

    hotel.save(function(err, hotelUpdated) {
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(200)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
        }
    });

};

module.exports.addOne = function(req, res) {

    var id = req.params.hotelId;

    console.log('POST review to hotelId', id);

    Hotel
        .findById(id)
        .select('reviews')
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                console.log("HotelId not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            }
            if (doc) {
                _addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });


};
