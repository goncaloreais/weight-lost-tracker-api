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

async function getAdmin(req, res) {
    const admins = await usersQueries.getAdmin();
    
    res.json({
        status: "success",
        message: "Admin users retrieved successfully",
        data: admins
    });
};

async function setAdmin(req, res) {
    const user = await usersQueries.getUserById(req.params.userId);
    user.role = 'admin';

    // create
    console.log(user);

    user.save((userError, updatedUser) => {
        res.json({
            status: "success",
            message: "User successfully set to admin!",
            data: updatedUser
        });
    });
};

module.exports = { 
    get,
    post,
    getAdmin,
    setAdmin,
};