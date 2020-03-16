const Post = require('../models/post');

module.exports = (app) => {

    // CREATE
    app.post('/posts/new', (req, res) => {
      const post = new Post(req.body);
  
      post.save((err, post) => {
        return res.redirect(`/`);
      })
    });

    //INDEX
    app.get('/', (req, res) => {
        Post.find({})
            .then( posts => {
                res.render("posts-index", { posts });
            })
            .catch(err => {
                console.log(err.message)
            })
    });

    //GET SINGLE POST
    app.get("/posts/:id", function(req, res) {
        
        Post.findById(req.params.id)
          .then(post => {
            res.render("posts-show", { post });
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
      })
};