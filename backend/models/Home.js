// models/HomePage.js
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
    question: String,
    answer: String
});

const featuredSchema = new mongoose.Schema({
    iconClass: String,
    title: String,
    description: String,
    link: String
});

const aboutUsSchema = new mongoose.Schema({
    title: String,
    headline: String,
    description: String,
    imageList: [String],
    mainImage: String
});

const instagramSchema = new mongoose.Schema({
    followLink: String,
    images: [String]
});

const destinationSchema = new mongoose.Schema({
    image: String,
    title: String,
    rating: Number,
    link: String
});

const trendingSchema = new mongoose.Schema({
    image: String,
    country: String,
    title: String,
    description: String,
    duration: String,
    price: String
});

const articleSchema = new mongoose.Schema({
    image: String,
    date: String,
    comments: Number,
    tags: [String],
    title: String,
    description: String,
    authorImage: String,
    authorName: String
});

const testimonialSchema = new mongoose.Schema({
    name: String,
    image: String,
    review: String,
    rating: Number
});

const homeSchema = new mongoose.Schema({
    faqSection: {
        title: String,
        description: String,
        faqItems: [faqSchema]
    },
    featuredUs: [featuredSchema],
    aboutUs: aboutUsSchema,
    instagramSection: instagramSchema,
    topDestinations: [destinationSchema],
    trending: [trendingSchema],
    mainArticle: articleSchema,
    subArticles: [articleSchema],
    testimonials: [testimonialSchema]
});

module.exports = mongoose.model("Home", homeSchema);
