var Comment = require('../Models/Comment');

exports.add = function(req, res){
    var data = {
        time: Date.now(),
        comment: req.body.comment
    }
    Comment.create(data, function(err){
        if(err){
            res.status(500).json({Err: err, message: 'Comment couldn\'t be created'})
        }else{
            res.status(201).json({message: 'Comment added successfully'})
        }
    })
}

exports.getAll = function(req, res){
    Comment.find(function(err, comments){
        if(err){
            res.status(500).json({Err: err, message: 'Error occured'})
        } else if (comments.length == 0){
            res.status(200).json({message: 'The comment database is empty'})
        } else {
            res.status(200).json(comments)
        }
    })
    .select('-__v');
}

exports.delete = function(req, res){
    var id = {_id: req.params.id};
    Comment.remove(id, function(err){
        if(err){
            res.status(500).json({Err:err, message: 'Error occured while deleting'})
        } else {
            res.status(200).json({message: 'Comment deleted successfully'})
        }
    })
}