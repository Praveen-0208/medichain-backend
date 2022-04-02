const User = require("../models/UserSchema")

exports.addUser = (req, res) => {
    let user = new User(req.body.user)
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
            address: user.address
        })
    })
}

exports.getUser = (req, res) => {
    const { address } = req.params;
    console.log(req.params)
    User.findOne({ address }, (err, user) => {
        if (err || !user) {
            console.log(err, user)
            return res.status(400).json({
                error: "ACCOUNT DOESNOT EXIST",
            });
        }
        delete user['mnemonic']
        delete user['privateKey']
        return res.json({
            user
        })
    })
}