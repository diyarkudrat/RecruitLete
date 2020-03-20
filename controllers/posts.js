const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {


    app.get('/posts/new', (req, res) => {
        const currentUser = req.user
        res.render('posts-new', { currentUser })
    });

    // CREATE
    app.post("/posts/new", (req, res) => {
      if (req.user) {
          const post = new Post(req.body);
          post.author = req.user._id;
          post.likes = [];
          post.totalLikes = 0;

          post
              .save()
              .then(post => {
                  return User.findById(req.user._id);
              })
              .then(user => {
                  user.posts.unshift(post);
                  user.save();
                  // REDIRECT TO THE NEW POST
                  res.redirect(`/posts/${post._id}`);
              })
              .catch(err => {
                  console.log(err.message);
              });
      } else {
          return res.status(401); // UNAUTHORIZED
      }
    });

    //INDEX
    app.get('/', (req, res) => {
      const currentUser = req.user;
      // res.render('home', {});
      console.log(req.cookies);
      Post.find().populate('author')
      .then(posts => {
          res.render('posts-index', { posts, currentUser });
          // res.render('home', {});
      }).catch(err => {
          console.log(err.message);
      })
    });

    //GET SINGLE POST
    app.get("/posts/:id", function (req, res) {
      const currentUser = req.user;
      Post.findById(req.params.id).populate('comments').lean()
          .then(post => {
              res.render("posts-show", { post, currentUser });  
          })
          .catch(err => {
              console.log(err.message);
          });
    });

    //DELETE SINGLE POST
    app.post("/posts/:id/delete", function(req, res) {

      Post.findByIdAndDelete(req.params.id)
        .then(
          res.redirect('/')
        )
    });

    //Like a post
    app.put("/posts/:id/like", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {
          post.likes.push(req.user._id);
          post.totalLikes = post.totalLikes + 1;
          post.save();

          console.log('!!!!!!!!')
          console.log(post.likes)
          console.log(post.totalLikes)
      
          res.status(200);
        });
      });
};