const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Post = mongoose.model('Post');
const User = mongoose.model('User');

module.exports.post = (req, res, next) =>{
        var post = new Post();
        //post.userId = req.User._id;
        post.postTitle = req.body.postTitle;
        post.postText = req.body.postText;
        post.postLocation = req.body.postLocation;
        //Note for those looking at the document inside of the DB
        //Java Date returns the number of Milliseconds ellasped since Jan 1st, 1970
        //to now.
        post.postTime = Date.now();
        post.save((err, doc) =>{
            if(!err){
                res.send(doc);
            }
            else{
                return next(err);
            }
        }); 
}

module.exports.postDashboard = (req, res, next) => {

    //This is going to select the user location from the user object 
    // in the mongo db
    var userLocation;
    User.findOne({ _id: req._id},
        (err, user) => {
                this.userLocation = user.userLocation
                if(err){
                    console.log(err)
                }
        });

    // This is ogin to select the posts from the Post document in the mongoDB
    //      This is going to select all the posts that matches the user location
    Post.find({postLocation: this.userLocation.toString()})
    .exec(function(err, post){
            if(!post){
                return res.status(404).json({ status: false, message: 'No Posts found...'});
            }
            else{
                console.log(post)
                return res.status(200).json({status: true, post});
            }
        });
}