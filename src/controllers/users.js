// imports required queries
const usersQueries = require('../queries/users');

// gets every User
async function get(req, res) {
    // @TODO: adds validation
    const users = await usersQueries.getUsers();
    
    res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: users
    });
};

// creates a new User
async function post(req, res) {

    let user = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        initialWeight: req.body.initialWeight,
        weightUnit: req.body.weightUnit,
        height: req.body.height,
    });

    const newUser = await usersQueries.createUser(user);
    res.json({
        message: 'New User created!',
        data: newUser
    }); 
};

module.exports = { get, post };