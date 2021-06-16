 const request = require('request');

/* GET 'home' page */
const homelist = (req, res) => {
    res.render('locations-list', { 
        title: 'Loc8r -  find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Findplaces to work with wifi near you!'
        },
        locations: [
            {
                name: 'Dumb Starbucks',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 3,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                distance: '100m'
            },
            {
                name: 'Cafe Hero',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 4,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                distance: '200m'
            },
            {
                name: 'Burger Queen',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 2,
                facilities: ['Food', 'Premium wifi'],
                distance: '250m'
            }
        ]
    });
}

/* GET 'Location info' page */
const locationInfo = (req, res) => {
    res.render('location-info', { 
        title: 'Dumb Starbucks',
        pageHeader: {title: 'Dumb Starbucks'},
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it -  or if you don\'t ¯\_(ツ)_/¯ - please leave a review to jelp other people just like you.'
        },
        location: {
            name: 'Dumb Starbucks',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            openingTimes: [
                {
                    days: 'Monday - Friday',
                    opening: '7:00am',
                    closing: '7:00pm',
                    closed: false
                },
                {
                    days: 'Saturday',
                    opening: '8:00am',
                    closing: '5:00pm',
                    closed: false
                },
                {
                    days: 'Sunday',
                    closed: true
                }
            ],
            reviews: [
                {
                    author: 'Simon Holmes',
                    rating: 5,
                    timestamp: '16 July 2013',
                    reviewText: 'What a great place. I can\'t say enough good things about it.'
                },
                {
                    author: 'Chorley Chaplin',
                    rating: 3,
                    timestamp: '16 June 2013',
                    reviewText: 'It was okay. Coffee wasn\'t great but the wifi was fast.'
                }
            ]
        }
    });
}

/* GET 'Add review' page */
const addReview = (req, res) => {
    res.render('location-review-form', { 
        title: 'Review Dumb Starbucks on Loc8r',
        pageHeader: {title: 'Review Dumb Starbucks'} 
    });
}

module.exports = {
    homelist,
    locationInfo,
    addReview
  };