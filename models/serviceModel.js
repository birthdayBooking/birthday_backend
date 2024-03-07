const mongoose = require('mongoose');
const validator = require('validator');
//name, category, perks, address, shortDetail, mainDetail, images, maxCustomers, price, rating 
const ServiceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
