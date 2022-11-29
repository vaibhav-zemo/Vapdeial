class ToggleLike {
    constructor(toggleElement) {
      this.toggler = toggleElement;
      this.toggleLike();
    }
  
    toggleLike() {
      $(this.toggler).click(function (e) {
        e.preventDefault();
        let self = this;
  
        $.ajax({
          type: "POST",
          url: $(self).attr("href"),
        })
  
          .done(function (data) {
            let likesCount = parseInt($(self).attr("data-likes"));
            console.log(likesCount);
            if (data.data.deleted == true) {
              likesCount -= 1;
            } else {
              likesCount += 1;
            }
  
            $(self).attr("data-likes", likesCount);
            if(likesCount==1){
              $(self).html(`<a class="toggle-like-button" data-likes="<%=post.likes.length %>"
                  href="/like/toggle/?id=<%=post._id%>&type=Post">
                  <span style="color: blue">
                          <i class="fa-solid fa-thumbs-up fa-1x"></i>
                  </span>
              </a> ${likesCount} Likes`);
            }
            else{
              $(self).html(`<a class="toggle-like-button" data-likes="<%=post.likes.length %>"
                  href="/like/toggle/?id=<%=post._id%>&type=Post">
                  <span style="color: black">
                          <i class="fa-solid fa-thumbs-up fa-1x"></i>
                  </span>
              </a> ${likesCount} Likes`);
            }
            
          })
          .fail(function (errData) {
            console.log("Error in completing the request");
          });
      });
    }
  }
  