const { response } = require('express');
const URL = require('../models/url');

async function handleHomePage(req, res){
    if(!req.user){
        return res.redirect('/login');
    }
    const allURLs = await URL.find({createdBy: req.user._id});
    return res.render('home', {
        urls: allURLs
    });
}

async function handleSignUpPage(req, res){
    return res.render('signup');
}

async function handleLogInPage(req, res){
    return res.render('login');
}

async function handleGetUrlByShortId(req, res){
    const shortId = req.params.shortId;

    const result = await URL.findOneAndUpdate({shortId}, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });

    if(!result){
        return res.redirect('/');
    }
    
    return res.redirect(result.redirectURL);
}

module.exports = {
    handleHomePage,
    handleSignUpPage,
    handleLogInPage,
    handleGetUrlByShortId
}