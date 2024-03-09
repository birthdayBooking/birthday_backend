const express = require('express');
const userController = require('../controllers/memberController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect); // Xác thực người dùng

router.patch('/updateAccount', accountController.updateAccount); // Route cập nhật thông tin tài khoản
router.patch('/saveAccount', accountController.saveAccount); // Route lưu thông tin tài khoản
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;