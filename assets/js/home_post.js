{
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();


            $.ajax({
                type: 'post',
                url: '/post/create-post',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostdom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    new PostComments(data.data.post._id);
                    deletePost($(' .delete-button', newPost));

                    new ToggleLike($(' .toggle-like-button', newPost));
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();


                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    };


    let newPostdom = function (post) {

        return $(`
            <li id="post-${post._id}">
            <p>
                <a class="delete-button" href="/post/destroy/${post._id}">
                    Delete
                </a>
            ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>

            <small>
                <a class="toggle-like-button" data-likes="0" href="/like/toggle/?id=${post._id}&type=Post">
                    0 Likes
                </a>
            </small>

            </p>
            <div class="post-comments">
                <form action="/comment/create-comment" method="post">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}" >
                    <input type="submit" value="Add Comment">
                </form>

                
            <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
            </div>

            </li>`
        );
    };



    let deletePost = function (deletelink) {
        $(deletelink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        });
    }


    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();

}