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
      .populate('partyId')
      .populate('extraService')
      .populate('customerId');

    res.status(200).json({
      data
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
const MAX_ORDERS_PER_TIME_SLOT = 5; // Số lượng tối đa các đơn hàng cho mỗi khung giờ

exports.checkAvailability = async (req, res) => {
    const { orderDate, time } = req.query;

    try {
        console.log("orderDate:", orderDate);
        console.log("time:", time);
        // Kiểm tra xem orderDate và time có hợp lệ không
        if (!orderDate || !time) {
            return res.status(400).json({ message: "Vui lòng cung cấp orderDate và time" });
        }

        // Kiểm tra định dạng của orderDate
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(orderDate);
        if (!isValidDate) {
            return res.status(400).json({ message: "Định dạng của orderDate không hợp lệ. Vui lòng sử dụng định dạng YYYY-MM-DD" });
        }

        const orders = await Order.find({ time });

        const orderCount = await Order.countDocuments({ 
            time: time // Thời gian muốn kiểm tra
        });

        if (orderCount >= MAX_ORDERS_PER_TIME_SLOT) {
            res.status(200).json({ available: false, message: "Không có chỗ trống" });
        } else {
            res.status(200).json({ available: true, message: "Còn chỗ trống" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


