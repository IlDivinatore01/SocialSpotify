const User = require('../models/user');

// Controller for viewing the user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Get the ID of the logged-in user
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error during user profile viewing:", error);
        res.status(500).json({ message: "Error during user profile viewing" });
    }
};

// Controller for modifying user preferences
exports.modifyUserPreferences = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({ message: "User preferences successfully updated", user });
    } catch (error) {
        console.error("Error during user preferences modification:", error);
        res.status(500).json({ message: "Error during user preferences modification" });
    }
};

// Controller for deleting the account
exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.remove();

        res.status(200).json({ message: "Account successfully deleted" });
    } catch (error) {
        console.error("Error during account deletion:", error);
        res.status(500).json({ message: "Error during account deletion" });
    }
};