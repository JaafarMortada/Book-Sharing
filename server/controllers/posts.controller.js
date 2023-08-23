const { User, Post } = require("../models/user.model")

const createPost = async (req, res) => {
    try {
        const { title, author, genre, review, pic_url } = req.body
        const userId = req.userId
        const user = await User.findById(userId)

        if (!user) return res.status(404).json({ message: 'User not found' })

        const post = new Post({
            title,
            author,
            genre,
            review,
            pic_url,
        })

        user.posts.push(post)

        await user.save()
        await post.save()

        res.status(201).json({ message: 'Post created successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post' })
    }
};

module.exports = {
    createPost,
};