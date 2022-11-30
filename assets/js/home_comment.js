
class PostComments {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.commentForm = $(`#comment-form-${postId}`);

    this.createComment(postId);

    let self = this;
    $(' .comment-delete-button', this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pself = this;
    this.commentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: 'post',
        url: '/comment/create-comment',
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pself.commentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);

          pself.deleteComment($(' .comment-delete-button', newComment));

          new ToggleLike($(' .toggle-like-button', newComment));
          new Noty({
            theme: 'relax',
            text: 'Comment published!',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  commentDom(comment) {
    return $(`
        <li id="comment-${comment._id}">
            
            <div id="first">
                <div id="photo">
                    <img src="${comment.user.avatar}" alt="">
                </div>


                <div id="content">
                    <small>
                    ${comment.user.name}
                    </small>
                    ${comment.content}
                </div>
            </div>

            <div id="button">
                <div id="love">
                    <a class="toggle-like-button" data-likes="0" href="/like/toggle/?id=${comment._id}&type=Comment">
                        <span style="color: black;">
                            <i class="fa-solid fa-thumbs-up fa-1x"></i>
                        </span>
                        0 Likes
                    </a>
                </div>

                <div id="delete">
                    <a class="comment-delete-button" style="color: red; text-decoration: none;" href="/comment/destroy-comment/${comment._id}">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </div>
            </div>
            
        </li>`);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: 'relax',
            text: 'Comment Deleted',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}
