const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid/v4');
const logger = require('morgan');
const port = process.env.PORT || '3000';

// import userRoutes file from routes folder
const userRoutes = require('./routes/userRoutes');

// used for collecting information in .post route
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use('/api/users', userRoutes);
// const {displayMoment} = require('./middleware/momentCW')

const users = require('./models/Users')
// const logger = (req, res, next) => {
//     console.log('Hello logger');
//     next();
// };
// app.use(displayMoment);

// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res)=> {
//     return res.send('Hello Express')
// });
// get all users
// app.get('/api/users', (req, res) => {
//     res.json(users);
// });
// get a single user
app.get('/api/users/:id', (req, res) => {
    const userExists = users.filter(user => user.id ===parseInt(req.params.id));
    if(userExists.length !== 0) {
        return res.status(200).json({ userExists});
    } else {
        return res.status(400).json({ message: `User with id: ${req.params.id} does not exist`});
    }
    // console.log(userExists)
    // if(userExists.length === 0) {
    //     console.log('not found');
    // } else {
    //     console.log('userExists')
    // }
});


// app.get('/', (req, res) => {
//     res.send(path.join(__dirname, 'public'));
// });
// app.get('/about', (req, res) => {
//     res.send(path.join(__dirname, 'public', ''))
// })

//* create user
app.post('/', (req, res) => {
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


app.listen(port, () => {
    console.log(`Listening on ${port}`)
});




