const User = require("../models/user");

// Get user ... if user exist, login (return 200) else
// login fail
module.exports.getUser = (req, res) => {
    User.findOne({ username: req.params.name }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        if (!user)
            res.status(404).send("User not found");
        else res.status(200).send({
            msg: "User logged in successfully as " + user.username,
            username: user.username,
            id: user._id
        });
    });
};

// Get user
module.exports.createUser = (req, res) => {
    const username = req.params.name;
    User.find({ username }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        if (user?.length < 1) {
            const newUser = new User({ username });
            newUser.save().then(savedUser => {
                if (savedUser === newUser) // if savedUser returned is the same as newUser the saved successfully
                    res.status(201).send({
                        username: user.username,
                        id: user._id,
                        msg: "User created successfully",
                    });
                else res.status(500).send("User created failed");
            });
        }
        else res.status(409).send("User with that username already exists");
    });
};