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


const getPosts = async(req, res) => {
  
    const Posts = [];
    const users = await User.find();
    users.forEach(user => {
        user.posts.forEach(post => {
          Posts.push({
            user_name: user.name,
            post: post
          });
        });
      });

    res.status(201).json({ posts: Posts })

}


module.exports = {
    createPost,
    getPosts
};