const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

    app.post("/healthcheck", (req, res) => {
      res.sendStatus(200);
    });

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
    // app.get('/', (req, res) => {
    //   const currentUser = req.user;

    //   console.log(req.cookies);
    //   Post.find().populate('author')
    //   .then(posts => {
    //       res.render('posts-index', { posts, currentUser });
    //   }).catch(err => {
    //       console.log(err.message);
    //   })
    // });
    app.get('/', async(req,res) => {
      const currentUser = req.user;
      try {
        const posts = await Post.find({}).sort({createdAt: -1})
        res.render('posts-index', { posts, currentUser })
      } catch(e) {
        console.log(e)
      }
    })

    //GET SINGLE POST
    app.get("/posts/:id", (req, res) => {
      const currentUser = req.user;
      Post.findById(req.params.id).populate('comments').lean()
          .then(post => {
              res.render("posts-show", { post, currentUser });  
          })
          .catch(err => {
              console.log(err.message);
          });
    });

    app.get('/posts/:id/edit', (req, res) => {
      const currentUser = req.user;

      Post.findById(req.params.id).then((post) => {
          res.render('edit-post', { post, currentUser })
        }).catch((err) => {
          console.log(err.message)
      })

  })

    //Edit Single Post
    app.post('/posts/:id/edit', (req, res) => {
      const currentUser = req.user

      Post.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, result) {
        if(err) {
            console.log(err);
        }
        console.log("RESULT: " + result);
        res.redirect(`/`);
      })
    })

    app.get('/posts/:id/delete', (req, res) => {
      const currentUser = req.user;
      
      Post.findById(req.params.id).then((post) => {
        res.render('delete-post', { post, currentUser })
      }).catch((err) => {
        console.log(err.message)
    })

    })

    //DELETE SINGLE POST
    app.post("/posts/:id/delete", function(req, res) {

      Post.findByIdAndDelete(req.params.id, (err, post) => {
        if(err) {
          console.log(err)
        } else {
          res.status(200);
          res.redirect(`/`)
        }
      })
        
    });

    //Like a post
    app.put("/posts/:id/like", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {

          console.log('!!!!!!!')
          console.log(post.likes)

          // for (i = 0; i < post.likes.length; i++) {
          //   if (req.user._id == i) {
          //     console.log("already liked post")
          //   } else {
            //   }
            // }
          post.likes.push(req.user._id);
          post.totalLikes = post.totalLikes + 1;
          post.save();

          console.log(post.totalLikes)
            
          res.status(200);
        });
      });
};