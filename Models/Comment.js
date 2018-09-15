var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    time: Date,
    comment: String
})
module.exports = mongoose.model('Comment', CommentSchema);