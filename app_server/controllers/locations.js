 const request = require('request');
 const apiOptions = {
    server: 'http://localhost:3000'
 };

 if (process.env.NODE_ENV === 'production') {
     apiOptions.server = 'https://shrouded-woodland-18552.herokuapp.com/'
 }

const formatDistance = (distance) => {
    let thisDistance = 0;
    let unit = 'm';
    if (distance > 1000) {
        thisDistance = parseFloat(distance / 1000).toFixed();
        unit = 'km';
    } else {
        thisDistance = Math.floor(distance);
    }
    return thisDistance + unit;
}

const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No places found nearby"
        }
    }
    res.render('locations-list', {
        title: 'Loc8r -  find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Findplaces to work with wifi near you!'
        },
        locations: responseBody,
        message
    });
}

const renderDetailPage = (req, res, location) => {
    res.render('location-info', {
        title: location.name,
        pageHeader: {
            title: location.name
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
        },
        location
    });
}

const renderReviewForm = (req, res, {name}) => {
    res.render('location-review-form', {
        title: `Review ${name} on Loc8r`,
        pageHeader: {title: `Review ${name}`}
    });
}

/* GET 'home' page */
const homelist = (req, res) => {
    const path = '/api/locations';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {
            lng: -0.7992599,
            lat: 51.378091,
            maxDistance: 20
        }
    };
    request(
        requestOptions, (err, {statusCode}, body) => {
            let data = [];
            if (statusCode === 200 && body.length) {
                data = body.map( (item) => {
                    item.distance = formatDistance(item.distance);
                    return item;
                });
            }
            renderHomepage(req, res, data);
        }
    );
}

/* GET 'Location info' page */
const locationInfo = (req, res) => {
    getLocationInfo(req, res, 
        (req, res, responseData) => renderDetailPage(req, res, responseData)
    );
}

/* GET 'Add review' page */
const addReview = (req, res) => {
    getLocationInfo(req, res, 
        (req, res, responseData) => renderReviewForm(req, res, responseData)
    );
}

const doAddReview = (req, res) => {
    const locationid = req.params.locationid;
    const path = `/api/locations/${locationid}/reviews`;
    const postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            if (statusCode === 201) {
                res.redirect(`/location/${locationid}`);
            } else {
                showError(req, res, statusCode);
            }
        }
    );
}

const showError = (req, res, status) => {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404, page not found';
        content = 'Oh dear. Looks like you can\'t find this page. Sowwy.';
    } else {
        title = `${status}, something's gone wrong`;
        content = 'Something, somwhere, has gone just a wittle bit wrong.';
    }
    res.status(status);
    res.render('generic-text', {
        title,
        content
    });
}

const getLocationInfo = (req, res, callback) => {
    const path = `/api/locations/${req.params.locationid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
            (err, {statusCode}, body) => {
                let data = body;
                if (statusCode === 200) {
                    data.coords = {
                        lng : body.coords[0],
                        lat : body.coords[1]
                    };
                    callback(req, res, data);
                } else {
                    showError(req, res, statusCode);
                }
            }
    );
}

module.exports = {
    homelist,
    locationInfo,
    addReview,
    doAddReview
  };