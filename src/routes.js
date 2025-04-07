const express = require('express');
const router = express.Router();
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');
const userAuth = require('./auth/auth');

// post
router.get('/', userAuth.isLogedIn, postController.homePage);
router.post('/add-post', postController.addPost);
router.get('/delete-post/:id', postController.deletePost);
//comment

router.post('/add-comment/:postId', postController.addComment);

//user

router.get(
  '/user/signup-login',
  userAuth.isNotLogedIn,
  userController.signUpPage,
);
router.post('/user/signup-login', userController.signup);
router.post('/user/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
