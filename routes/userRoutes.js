// import express from "express";
const express = require('express');

const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/:id', userController.getUser);

module.exports = router;
