const mongoose = require('mongoose');
const Loc = mongoose.model('Location');


//Routes
const locationsListByDistance = async(req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const  near = {
        type: "Point",
        coordinates: [lng, lat]
    };
    const geoOptions = {
        distanceField: "distance.calculated",
        spherical: true,
        maxDistance: 20000,
        $limit: 10
    };
    try {
        const results = await Loc.aggregate([
            {
                $geoNear : {
                    near,
                    ...geoOptions
                }
            }
        ]);
        const locations = results.map(result => {
            return {
                id: result._id,
                name: result.name,
                address: result.address,
                rating: result.rating,
                facilities: result.facilities,
                distance: `${result.distance.calculated.toFixed()}m`
            }
        });
        return res
            .status(200)
            .json(locations);
    } catch (err) {
        res
            .status(404)
            .json(err)
    }
};

const locationsCreate = (req, res) => {
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: {
            type: "Point",
            coordinates: [
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)
            ]
        },
        openingTimes: [
            {
              days: req.body.days1,
              opening: req.body.opening1,
              closing: req.body.closing1,
              closed: req.body.closed1
            },
            {
              days: req.body.days2,
              opening: req.body.opening2,
              closing: req.body.closing2,
              closed: req.body.closed2
            },
            {
              days: req.body.days3,
              opening: req.body.opening3,
              closing: req.body.closing3,
              closed: req.body.closed3
              },
        ]
    }, (err, location) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(location)
        }
    });
};

const locationsReadOne = (req, res) => {
    Loc
        .findById(req.params.locationid)
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({
                        "message": "location not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            res
                .status(200)
                .json(location);
        });
};

const locationsUpdateOne = (req, res) => {
    if (!req.params.locationid) {
        return res
            .status(404)
            .json({
                "message": "Not found, locationid is required"
            });
    }
    Loc
        .findById(req.params.locationid)
        .select('-reviews -rating')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .status({
                        "message": "locationid not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(',');
            location.coords = {
                type: "Point",
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            };
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }, {
                days: req.body.days3,
                opening: req.body.opening3,
                closing: req.body.closing3,
                closed: req.body.closed3
            }];
            location.save((err, loc) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(loc);
                }
            });
        });
};

const locationsDeleteOne = (req, res) => {};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
}