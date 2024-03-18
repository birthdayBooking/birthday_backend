//getCartItems, addItemToCart, getOrderDetail, updateOrder, deleteOrder
const Order = require('../models/orderModel');
const Service = require('../models/serviceModel');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const data = await Order.find({});
    res.status(201).json(data || 'No Items Found');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addServiceToOrder = async (req, res) => {
  try {
      const { orderId, serviceId } = req.body;

      // Tìm đơn đặt hàng theo ID
      const order = await Order.findById(orderId);

      if (!order) {
          return res.status(404).json({
              status: 'fail',
              message: 'Order not found'
          });
      }

      // Thêm dịch vụ vào đơn đặt hàng
      order.services.push(serviceId);

      // Lưu đơn đặt hàng đã cập nhật
      await order.save();

      res.status(200).json({
          status: 'success',
          data: {
              order
          }
      });
  } catch (err) {
      res.status(400).json({
          status: 'error',
          message: err.message
      });
  }
};
exports.addItemToCart = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const  _id  = req.params.orderId;
    const data = await Order.findById(_id)
      .populate('Party')
      .populate('Service')
      .populate('Member');

      const service = await Service.find({ _id: { "$in" : data.extraService} });

    res.status(200).json({
      data, service
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
};

exports.updateOrder = async (req, res) => {
  const { itemId } = req.params;
  try {
    Order.updateOne({ _id: itemId }, req.body).then(res.status(200).json('update success'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getOrderByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  try {
    const orders = await Order.find({ customerId: customerId });
    res.status(200).json({ status: 'success', data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalBookingByDate = async (req, res, next) => {
  let { date } = req.body;
  
  if (!date) {
    date = new Date();
  } else {
    date = new Date(date)
  }

  const totalOrder = await Order.aggregate([
    {
      $match: { orderDate: { $eq: date } }
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 }
      }
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: totalOrder
  });
};
exports.updatePrepareStatus = async (req, res) => {
  const { orderId } = req.params;
  const { prepare } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.prepare = prepare;
    await order.save();

    res.json({ message: 'Prepare status updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


