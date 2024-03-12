// import express from "express";
const express = require('express');

const messageController = require('../controllers/message.controller.js');

const router = express.Router();

router.post('/:id', messageController.getMessages);
router.post('/send/:id', messageController.sendMessage);
router.get('/usermessage/:id', messageController.getMessagesOfUser);
router.get('/last/:id', messageController.getLastMessage);

module.exports = router;
