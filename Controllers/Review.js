var Review = require('../Models/Review');

exports.add = function(req, res){
    var data = {
        time: Date.now(),
        review: req.body.review
    }
    Review.create(data, function(err){
        if(err){
            res.status(500).json({Err: err, message: 'Review couldn\'t be created'})
        }else{
            res.status(201).json({message: 'Review added successfully'})
        }
    })
}

exports.getAll = function(req, res){
   Review.find(function(err, reviews){
        if(err){
            res.status(500).json({Err: err, message: 'Error occured'})
        } else if (reviews.length == 0){
            res.status(200).json({message: 'The review database is empty'})
        } else {
            res.status(200).json(reviews)
        }
    })
    .select('-__v');
}

exports.delete = function(req, res){
    var id = {_id: req.params.id};
    Review.remove(id, function(err){
        if(err){
            res.status(500).json({Err:err, message: 'Error occured while deleting'})
        } else {
            res.status(200).json({message: 'Review deleted successfully'})
        }
    })
}