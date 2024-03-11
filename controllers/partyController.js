//createParty, getAllParties, getPartyInfo, updateParty, deleteParty
const Party = require('../models/partyModel')
exports.createParty = async (req, res) => {
    try {
        const nameExist = await Party.find({ name: req.body.name });

        if (nameExist.length > 0) {
            res.status(400).json({ message: `There are already exist Party named : ${req.body.name}` });
        } else {
            const newParty = await Party.create(req.body);
            res.status(201).json(newParty);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllParties = async (req, res) => {
    try {
        const data = await Party.find({}).populate('category').populate('hostId');
        res.status(200).json(data || []); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPartyInfo = async (req, res) => {
    const id = req.params.partyId;
    try {
        const data = await Party.findById(id).populate('category').populate('hostId');
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json('Not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateParty = async (req, res) => {
    const updateData = req.body;
    const { partyId } = req.params;

    try {
        const existingParty = await Party.findOne({ name: updateData.name });

        if (existingParty) {
            res.status(400).json({ message: 'Name already exists' });
        } else {
            await Party.findOneAndUpdate({ _id: partyId }, updateData);
            res.status(200).json({ message: 'Update OK' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteParty = async (req, res) => {
    const partyId = req.params.partyId;

    try {
        const result = await Party.deleteOne({ _id: partyId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Done' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};