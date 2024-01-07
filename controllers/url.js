const URL = require('../models/url');
const shortid = require('shortid');

async function handleCreateNewUrl(req, res){
    const body = req.body;

    if(!body.url){
        return res.status(400).json({error: 'Url is required'});
    }

    const shortUrlId = shortid.generate();

    await URL.create({
        shortId: shortUrlId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });

    return res.render('home', {
        shortId: shortUrlId
    });
}

// async function handleGetUrlByShortId(req, res){
//     const shortId = req.params.shortId;

//     const result = await URL.findOneAndUpdate({shortId}, {
//         $push: {
//             visitHistory: {
//                 timestamp: Date.now()
//             }
//         }
//     });
    
//     return res.redirect(result.redirectURL);
// }

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});
    if(!result){
        return res.status(400).json({msg: 'Bad Request'});
    }

    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = {
    handleCreateNewUrl,
    handleGetAnalytics,
}