const Service = require('../models/serviceModel')
exports.createService = async (req, res) => {
    try {
        const nameExist = await Service.find({ name: req.body.name });

        if (nameExist.length > 0) {
            res.status(400).json({ message: `There are already exist Service named : ${req.body.name}` });
        } else {
            const newService = await Service.create(req.body);
            res.status(201).json(newService);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllServices = async (req, res) => {
    try {
        const data = await Service.find({});
        res.status(200).json(data || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getServiceInfo = async (req, res) => {
    const id = req.params.serviceId;
    try {
        const data = await Service.findById(id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json('Not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateService = async (req, res) => {
    const updateData = req.body;
    const { serviceId } = req.params;

    try {
        const existingService = await Service.findOne({ name: updateData.name });

        if (existingService) {
            res.status(400).json({ message: 'Name already exists' });
        } else {
            await Service.findOneAndUpdate({ _id: serviceId }, updateData);
            res.status(200).json({ message: 'Update OK' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteService = async (req, res) => {
    const serviceId = req.params.serviceId;

    try {
        const result = await Service.deleteOne({ _id: serviceId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Done' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
