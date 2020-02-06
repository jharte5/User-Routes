

const logger = (req, res, next) => {
    console.log('Hello logger');
    next();
};

module.exports = {logMe: logger}
