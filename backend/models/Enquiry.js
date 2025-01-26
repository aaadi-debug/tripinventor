const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    destinations: {
        type: [String],
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    // nights: {
    //     type: Number,
    //     required: true
    // },
    adults: {
        type: String,
        required: true
    },
    children: {
        type: String,
        required: true
    },
    childAge: {
        type: Number,
        default: null
    },
    hotelCategory: {
        type: String,
        required: true,
        enum: ['3-star', '4-star', '5-star']
    },
    budget: {
        type: Number,
        required: true
    },
    mealPlan: {
        type: String,
        required: true,
        enum: ['Epai', 'Cpai', 'Mapi', 'Apai']
    },
    additionalRequirements: {
        type: String,
        default: ''
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
