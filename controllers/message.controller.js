const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');
const Account = require('../models/account');

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, message } = req.body;
    const { id: receiverId } = req.params;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save both conversation and message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    console.log(newMessage);

    // Send a response if needed
    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const { senderId } = req.body;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate('messages'); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messagesForChat = conversation.messages;

    res.status(200).json(messagesForChat);
  } catch (error) {
    console.log('Error in getMessages controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMessagesOfUser = async (req, res) => {
  try {
    const { id: senderId } = req.params;
    //find conversation
    const conversations = await Conversation.find({
      participants: { $in: [senderId] }
    });

    if (!conversations) return res.status(200).json([]);

    //find the latest message and the the user in the conversation
    const participantsInfoPromises = conversations.map(async conversation => {
      const otherParticipantId = conversation.participants.find(participantId => !participantId.equals(senderId));

      const otherParticipantPromise = Account.findById(otherParticipantId);

      const latestMessage = conversation.messages[conversation.messages.length - 1];

      const newMessagePromise = Message.findById(latestMessage);

      const [otherParticipant, newMessage] = await Promise.all([otherParticipantPromise, newMessagePromise]);
      return {
        conversationId: conversation._id,
        participants: conversation.participants,
        otherParticipant,
        newMessage
      };
    });

    // Wait for all promises to resolve
    const participantsInfo = await Promise.all(participantsInfoPromises);

    res.status(200).json(participantsInfo);
  } catch (error) {
    console.log('Error in getMessages controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLastMessage = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    //find conversation
    const conversation = await Conversation.findById(chatId).populate('messages');

    res.status(200).json(conversation);
    console.log(conversation);
  } catch (error) {
    console.log('Error in getMessages controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
