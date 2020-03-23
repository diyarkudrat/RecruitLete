$(document).ready(function() {
    $(".post-like").submit(function(e) {
      e.preventDefault();
      const postId = $(this).data("id");

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
      
      let currentLikes = +$(this).next().text();
      currentLikes++;

      $(this).next().text(currentLikes);
    });

    // $(".user-follow").submit(function(e) {
    //   e.preventDefault();
    //   const userId = $(this).data("id");

    //   $.ajax({
    //     type: "PUT",
    //     url: "users/" + userId + "/favorite",
    //     success: function(data) {
    //       console.log("followed!");
    //     },
    //     error: function(err) {
    //       console.log(err.messsage);
    //     }
    //   });
    // });
  });