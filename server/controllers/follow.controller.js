const { User } = require("../models/user.model");

const followUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const logged_in_user = req.userId;

        const userToFollow = await User.findById(user_id);

        if (!userToFollow) return res.status(404).json({ message: "User not found" });

        if (userToFollow.followers.includes(logged_in_user)) return res.status(400).json({ message: "already following" });

        await User.findByIdAndUpdate(logged_in_user, {
            $addToSet: { following: user_id },
        });

        await User.findByIdAndUpdate(user_id, {
            $addToSet: { followers: logged_in_user },
        });

        res.status(201).json({ message: "followed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to follow" });
    }
};

const unFollowUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const logged_in_user = req.userId;

        const user_to_un_follow = await User.findById(user_id);
        if (!user_to_un_follow) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndUpdate(logged_in_user, {
            $pull: { following: user_id },
        });
        await User.findByIdAndUpdate(user_id, {
            $pull: { followers: logged_in_user },
        });

        res.status(201).json({ message: "unFollowed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to unFollow user" });
    }
};

module.exports = {
    followUser,
    unFollowUser,
};
