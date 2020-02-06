const express = require('express');
const router = express.Router();
const users = require('../models/Users');
const uuid = require('uuid/v4');

router.get('/', (req, res) => {
    res.json(users);
});
router.get('/api/users', (req, res) => {
    res.json(users);
});
router.get(':id', (req, res) => {
    const userExists = users.filter(user => user.id === req.params.id);
    if(userExists.length !== 0) {
        return res.status(200).json({ userExists});
    } else {
        return res.status(400).json({ message: `User with id: ${req.params.id} does not exist`});
    };
});
router.post('/', (req, res) => {
    if(!req.body.name || !req.body.email) {
        return res.status(400).json({ message: 'Please enter both a name and an email' });
    }
    const newUser = {};
    newUser.id = uuid();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    users.push(newUser);
    return res.json(req.body);
});

module.exports = router;
