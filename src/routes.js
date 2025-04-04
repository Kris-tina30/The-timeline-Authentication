const express = require('express');
const router = express.Router();
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');

// post
router.get('/', postController.homePage);
router.post('/add-post', postController.addPost);
router.get('/delete-post/:id', postController.deletePost);
//comment

router.post('/add-comment/:postId', postController.addComment);

//user

router.get('/user/signup-login', userController.signUpPage);

module.exports = router;
