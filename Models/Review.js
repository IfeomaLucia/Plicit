var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    time: Date,
    review: String
})
module.exports = mongoose.model('Review', reviewSchema);