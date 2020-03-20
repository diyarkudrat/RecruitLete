$(document).ready(function() {
    $(".post-like").submit(function(e) {
      e.preventDefault();
  
      var postId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "posts/" + postId + "/like",
        success: function(data) {
          console.log("liked!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  });