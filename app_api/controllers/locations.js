const mongoose = require('mongoose');
const Loc = mongoose.model('Location')

const locationsListByDistance = (req, res) => {};

const locationsCreate = (req, res) => {};

const locationsReadOne = (req, res) => {
    Loc
        .findById(req.params.locationid)
        .exec((err, location) => {
            res
                .status(200)
                .json(location);
        });
};

const locationsUpdateOne = (req, res) => {};

const locationsDeleteOne = (req, res) => {};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
}