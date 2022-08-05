const Router = require("express");
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const postController = require('../controllers/post-controller')
const userProfileController = require('../controllers/userProfile-controller')

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:Link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/post', authMiddleware, postController.postCreate)
router.get('/getAllPosts', authMiddleware, postController.getAllPosts)
router.get('/getMyPosts', authMiddleware, postController.getMyPosts)
router.post('/userProfileCreate', authMiddleware, userProfileController.userProfileCreate)


module.exports = router