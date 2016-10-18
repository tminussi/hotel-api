var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
    let long = parseFloat(req.query.long);
    let lat = parseFloat(req.query.lat);

    let point = {
        type: "Point",
        coordinates: [long, lat]
    };

    let geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 1
    };
        Hotel
            .geoNear(point, geoOptions, function (err, data, stats) {
                if (err) {
                    return;
                }
                res
                    .status(200)
                    .json(data);
            });
};

module.exports.fetchAll = function (req, res) {

    console.log('GET the hotels');

    let offset = 0;
    let count = 0;

    if (req.query && req.query.lat && req.query.long) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, data) {
            if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            return res
                .status(200)
                .json(data);
        });
};

module.exports.fetchOne = function (req, res) {
    let id = req.params.hotelId;
    console.log('GET hotelId', id);

    Hotel
        .findById(id)
        .exec(function (err, data) {
            if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            return res
                .status(200)
                .json(data);
        });

};

var _splitArray = function(input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

module.exports.addOne = function (req, res) {
    Hotel
        .create({
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars,10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
                address : req.body.address,
                coordinates : [parseFloat(req.body.long), parseFloat(req.body.lat)]
            }
        }, function (err, hotel) {
            if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            res
                .status(201)
                .json(hotel);
        });
};

module.exports.update = function (req, res) {
    console.log('updating');
    Hotel
        .findById(req.params.hotelId)
        .select("-reviews -rooms")
        .exec(function (err, data) {
            if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            console.log(data);
            data.name = req.body.name;
            data.description = req.body.description;
            data
                .save(function (err, hotel) {
                    return res
                        .status(200)
                        .json(data);
                });
        });
};
module.exports.delete = function (req, res) {
    Hotel
        .findByIdAndRemove(req.params.hotelId)
        .exec(function (err, data) {
            if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            res
                .status(204)
                .json({"success": "Object has been successfully deleted "})
        });
};