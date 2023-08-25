const { User, Post, Like } = require("../models/user.model")

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


const getPosts = async (req, res) => {
    try {
        const userId = req.userId;
        const users = await User.find();
        const Posts = [];

        for (const user of users) {
            for (const post of user.posts) {
                const is_following = user.followers.includes(userId);

                const the_post = await Post.findById(post._id);
                const is_liked = the_post.likes.some(
                    (like) => like.user.toString() === userId
                );
                const likes_count = the_post.likes.length
                const updated_post = {
                    ...post.toObject(),
                    user_id: user._id,
                    is_following,
                    is_liked,
                    likes_count
                };

                Posts.push({
                    user_name: user.name,
                    post: updated_post,
                });
            }
        }

        res.status(201).json({ posts: Posts });
    } catch (error) {
        res.status(500).json({ message: "Failed to get posts" });
    }
};

const likePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const userId = req.userId;

        const like = new Like({ user: userId })
        const post = await Post.findByIdAndUpdate(
            post_id,
            { $push: { likes: like } },
            { new: true }
        ).populate('likes.user');

        await like.save()

        if (!post) return res.status(404).json({ message: "Post not found" });

        res.status(201).json({ message: "liked successfully" });
    } catch (error) {
        res.status(500).json({ message: "failed to like post" });
    }
};

const searchPosts = async (req, res) => {
    const { query } = req.query;
    const handled_query = query.replace(/-/g, ' ');
    const user_id = req.userId;
    try {
        const regexQuery = new RegExp(handled_query, "i");

        const users = await User.find();

        if (users.length > 0) {
            const matchingPosts = [];

            for (const user of users) {
                for (const post of user.posts) {
                    if (
                        (post.title && post.title.match(regexQuery)) ||
                        (post.author && post.author.match(regexQuery)) ||
                        (post.genre && post.genre.match(regexQuery)) ||
                        (post.review && post.review.match(regexQuery))
                    ) {
                        const the_post = await Post.findById(post._id);
                        const is_liked = the_post.likes.some(
                            (like) => like.user.toString() === user_id
                        );
                        const likes_count = the_post.likes.length

                        const is_following = user.followers.includes(user_id);
                        const postInfo = {
                            _id: post._id,
                            title: post.title,
                            author: post.author,
                            genre: post.genre,
                            review: post.review,
                            likes: post.likes,
                            pic_url: post.pic_url,
                            is_liked,
                            is_following,
                            likes_count,
                            user_name: user.name,
                            
                        };
                        matchingPosts.push({
                            user_name: user.name,
                            post: postInfo
                        });
                    }
                }
            }

            return res.status(200).json({ posts: matchingPosts });
            
        } else return res.json({ message: "no posts found" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createPost,
    getPosts,
    likePost,
    searchPosts
};