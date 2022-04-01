const User = require("../models/UserSchema")

exports.addUser = (req, res) => {
    let user = new User(req.body.user)
    user.save((err, savedUser) => {
        if (err) {
            return res.status(400).json({ error: "Couldn't add patient", e: err })
        }
        return res.json({ message: "user added successfully" + JSON.stringify(savedUser) })
    })
}