
class PostComments {

    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.commentForm = $(`#comment-form-${postId}`);

        this.createComment(postId);

        let self = this;
        $(' .comment-delete-button', this.postContainer).each(function () {
            self.deleteComment($(this));
        })
    }


    createComment = function (postId) {
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

                    pself.deleteComment($(' .comment-delete-button',newComment));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    };





    commentDom = function (comment) {
        return $(`
        <li id="comment-${comment._id}">
            <p>
                
                <a id="comment-delete-button" href="/comment/destroy-comment/${comment._id}">
                    Delete
                </a>
                        
                 ${comment.content}

                <br>
                <small>
                ${comment.user.name}
                </small>

            </p>
        </li>`
        );
    };


    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

}
