const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const COOKIE_MAX_AGE = 4 * 24 * 60 * 60; // 4 days
const HASH_ROUNDS = 12;

const createAuthCookie = (res, username, id) => {
    return res.cookie("radLoginCookie",
        JSON.stringify({ username, id }), {
            httpOnly: true, // You can't access these tokens in the client's javascript
            secure: global.env === "production",
            maxAge: COOKIE_MAX_AGE,
            sameSite: "Lax"
        }
    );
};

// Get user ... if user exist, verify password and return login cookie
module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username)
        return res.status(400).send({ msg: "Missing username" });

    if (!password)
        return res.status(400).send({ msg: "Missing password" });

    User.findOne({ username }, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }
        if (!user)
            return res.status(404).send({ msg: "User not found" });

        try {
            if (bcrypt.compareSync(password, user.password)) { // verify password
                // send back a cookie for user to use to get the jwt token
                createAuthCookie(res, user.username, user._id)
                    .status(200)
                    .send({ msg: "User logged in successfully as " + user.username });
            } else return res.status(403).send({ msg: "Incorrect password" });
        } catch (e) {
            return res.status(500).send({ msg: "Error verifying password" });
        }
    });
};

// create user
module.exports.createUser = (req, res) => {
    const { username, password } = req.body;

    User.find({ username }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: err });
        }

        if (user?.length < 1) {
            try {
                // this can only hash 72 bytes
                const hash = bcrypt.hashSync(password, HASH_ROUNDS); // this can throw an exception

                const newUser = new User({ username, password: hash });
                newUser.save().then(savedUser => {
                    if (savedUser === newUser) { // if savedUser returned is the same as newUser then saved successfully
                        // send back a cookie for user to use to get the jwt token
                        createAuthCookie(res, savedUser.username, savedUser._id)
                            .status(201)
                            .send({ msg: "User created successfully" });
                    } else res.status(500).send({ msg: "User creation failed" });
                });
            } catch (e) {
                res.status(500).send({ msg: "Error securing your password" });
            }
        } else res.status(409).send({ msg: "User with that username already exists" });
    });
};

module.exports.getToken = (req, res) => {
    // If the login cookie exists within the request, create jwt and return to user.
    if (req.cookies.radLoginCookie) {
        // Extract user info from the cookie
        const userInfo = JSON.parse(req.cookies.radLoginCookie);

        // Create an access jwt token using the user info.
        const token = jwt.sign({ ...userInfo }, global.TOKEN_SECRET);

        // Returns the jwt access token and user information.
        return res.status(200).send({ msg: "User Authenticated", token, userInfo });
    }

    // If the cookie with the users login information does not exist
    // return status forbidden
    return res.status(401).send({ msg: "You need to login" });
};

module.exports.logout = (_, res) => {
    // Delete the cookie containing the users login information.
    // effectively logging the user out
    res.clearCookie("radLoginCookie").status(200).json({ msg: "Logged Out" });
};