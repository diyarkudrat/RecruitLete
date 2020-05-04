const User = require("../models/user");
const Post = require('../models/post');


module.exports = (app) => {

    //GET profile information
    app.get('/profile/:id', (req, res) => {
        const currentUser = req.user;
        User.findById(req.params.id).populate('posts')
            .then((user) => {

                if (currentUser._id == user._id) {
                    res.render('profile', { user, currentUser })
                } else {
                    res.render('profile', { user })
                }
            }).catch((err) => {
                console.log(err.message)
            })
    })
    
    app.get('/profile/:id/manage', (req, res) => {
        const currentUser = req.user;
    
        User.findById(req.params.id).then((user) => {
            res.render('edit-profile', { user, currentUser })
          }).catch((err) => {
            console.log(err.message)
          })
    })
    
    
    //Edit profile information
    app.post('/profile/:id/manage', (req, res) => {

        const user = req.user

        // const videoFile = req.files.videoFile

        // videoFile.mv("public/highlights/" + videoFile.name, function(error) {
        //     if (error) {
        //         console.log("failed to upload file")
        //         console.log(error)
        //     } else {
        //         console.log("file successfully uploaded")
        //     }
        // })
    
        User.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, result) {
            if(err) {
                console.log(err);
            }
            console.log("RESULT: " + result);
            res.redirect(`/profile/${user._id}`);
        })
    })
    
    //Get all users

    // ELASTIC SEARCH FOR SEARCHING FOR MULTIPLE FIELDS!!!!!!!!!!!!
    app.get('/users', (req, res) => {
        const currentUser = req.user;

      console.log(req.cookies);
      if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        User.find({username: regex}, function(err, allUsers) {
            if(err) {
                console.log(err.message)
            } else {
                res.render('users-index', {users: allUsers, currentUser });
            }
        })
      } else {
        User.find({})
        .then(users => {
            res.render('users-index', { users, currentUser });
        }).catch(err => {
            console.log(err.message);
        })
      }
        
    })

    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

}