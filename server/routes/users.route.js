const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/users.controller")
const postController = require('../controllers/posts.controller')
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/register", userControllers.register)
router.post('/create_post', authMiddleware, postController.createPost);
router.get('/get_posts', authMiddleware, postController.getPosts);
router.post('/:post_id/like', authMiddleware, postController.likePost);

module.exports = router