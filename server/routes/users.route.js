const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/users.controller")
const postController = require('../controllers/posts.controller')
const authMiddleware = require("../middlewares/auth.middleware")
const { followUser, unFollowUser } = require("../controllers/follow.controller")

router.post("/register", userControllers.register)
router.post('/create_post', authMiddleware, postController.createPost);
router.get('/get_posts', authMiddleware, postController.getPosts);
router.post('/:post_id/like', authMiddleware, postController.likePost);
router.post('/:post_id/un_like', authMiddleware, postController.unLikePost);
router.post('/:user_id/follow', authMiddleware, followUser);
router.post('/:user_id/un_follow', authMiddleware, unFollowUser);
router.get("/search", authMiddleware, postController.searchPosts);

module.exports = router