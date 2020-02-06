const moment = require('moment');

const displayMoment = (req, res, next)=> {
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    next();
};

module.exports = {displayMoment}