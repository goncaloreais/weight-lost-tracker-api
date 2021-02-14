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

    let user = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        initialWeight: req.body.initialWeight,
        weightUnit: req.body.weightUnit,
        height: req.body.height,
    };

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
    const requestUser = await usersQueries.getUserById(req.userId);
    if(requestUser.role === 'admin') {
        const user = await usersQueries.getUserById(req.params.userId);
        user.role = 'admin';
    
        user.save((userError, updatedUser) => {
            res.json({
                status: "success",
                message: "User successfully set to admin!",
                data: updatedUser
            });
        });
    } else {
        res.json({
            status: "error",
            message: "You do not have permissions to set a user to admin!",
        });
    }
};

module.exports = { 
    get,
    post,
    getAdmin,
    setAdmin,
};