const Users = require('../models/user');
// const {v4: uuidv4} = require('uuid');

const {
    setUser
} = require('../services/auth');

async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;

    await Users.create({
        name: name,
        email: email,
        password: password
    });

    return res.redirect('/login');
}

async function handleUserLogIn(req, res){
    const {email, password} = req.body;

    const user = await Users.findOne({email, password});
    if(!user){
        return res.redirect('/login');
    }

    // const sessionId = uuidv4();
    const token = setUser(user);
    res.cookie('uid', token);

    return res.redirect('/home');
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn
}