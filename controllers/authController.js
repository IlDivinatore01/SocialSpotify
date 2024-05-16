const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// Controller for registering a new user
exports.registerUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Validate email
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long" });
        }

        // Check if password contains parts of the email
        const emailParts = email.split("@")[0].split(".");
        for (let part of emailParts) {
            if (password.includes(part)) {
                return res.status(400).json({ message: "Password should not contain parts of the email" });
            }
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.render('profile', { user: newUser });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Error during user registration" });
    }
};

// Controller for user login
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "An error occurred during authentication" });
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: "An error occurred during login" });
            }
            res.status(200).json({ message: "Successfully logged in", user });
        });
    })(req, res, next);
};

// Controller for user logout
exports.logoutUser = (req, res) => {
    try {
        req.logout();
        res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during logout" });
    }
};