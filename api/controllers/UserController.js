const User = require("../models/UserSchema")

exports.addUser = (req, res) => {
    let user = new User(req.body.user)
    console.log('users in db', user)
    user.save((err, savedUser) => {
        if (err) {
            return res.status(400).json({ error: "Couldn't add user", e: err })
        }
        return res.json({ message: "user added successfully" + JSON.stringify(savedUser) })
    })
}

exports.login = (req, res) => {
    const { phone } = req.body;
    User.findOne({ phone }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "ACCOUNT DOESNOT EXIST",
            });
        }
        return res.json({
            address: user.address, user
        })
    })
}

exports.getUser = (req, res) => {
    const { viewerAddr, viewerRole, targetAddr } = req.body;
    console.log(viewerAddr, viewerRole, targetAddr, "is the body")
    User.findOne({ phone: targetAddr }, (err, user) => {
        if (err || !user) {
            console.log(err, user)
            return res.status(400).json({
                message: "ACCOUNT DOESNOT EXIST",
            });
        }
        if (viewerRole !== '2') {
            User.findOne({ phone: viewerAddr }, (err, viewer) => {
                if (err || !viewer) {
                    return res.status(400).json({
                        message: "VIEWER DOESNOT EXIST",
                    });
                }
                return res.json({
                    user: user
                })
            })
        }
        else {
            return res.status(400).json({
                message: "UNAUTHORIZED ACCESS",
            });
        }
    })
    // return res.status(401).json({
    //     message: "UNAUTHORIZED ACCESS"
    // })
}

exports.getAllDetails = (req, res) => {
    const { targetAddr } = req.body;
    console.log(targetAddr, "is the body")
    User.findOne({ phone: targetAddr }, (err, user) => {
        if (err || !user) {
            console.log(err, user)
            return res.status(400).json({
                message: "ACCOUNT DOESNOT EXIST",
            });
        }
        return res.json({
            user: user
        })
    })
    // return res.status(401).json({
    //     message: "UNAUTHORIZED ACCESS"
    // })
}