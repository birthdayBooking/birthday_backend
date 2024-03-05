//getCartItems, addItemToCart, getOrderDetail, updateOrder, deleteOrder
const Order = require('../models/orderModel')

exports.getCartItems = async (req, res) => {
    try {
        const data = await Order.find({});
        res.status(201).json(data || "No Items Found");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.addItemToCart = async (req, res) => {
    try {
        const newOrder = await Order.create(req.body)
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getOrderDetail = async (req, res) => {
    try {
        const { _id } = req.params
        const data = await Order.findById({ _id }).populate('Party').populate('Service').populate('Member')
        res.status(200).json(data || "Not found")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.deleteOrder = async (req, res) => {
    const { itemId } = req.params;

    try {
        const result = await Order.deleteOne({ _id: itemId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Done' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.updateOrder = async (req, res) => {
    const {itemId} = req.params
    try {
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   