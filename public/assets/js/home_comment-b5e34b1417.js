class PostComments{constructor(e){this.postId=e,this.postContainer=$(`#post-${e}`),this.commentForm=$(`#comment-form-${e}`),this.createComment(e);let t=this;$(" .comment-delete-button",this.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.commentForm.submit((function(n){n.preventDefault();$.ajax({type:"post",url:"/comment/create-comment",data:$(this).serialize(),success:function(n){let o=t.commentDom(n.data.comment);$(`#post-comments-${e}`).prepend(o),t.deleteComment($(" .comment-delete-button",o)),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}commentDom(e){return $(`\n        <li id="comment-${e._id}">\n            <p>\n                \n                <a id="comment-delete-button" href="/comment/destroy-comment/${e._id}">\n                    Delete\n                </a>\n                        \n                 ${e.content}\n\n                <br>\n                <small>\n                ${e.user.name}\n                </small>\n\n                <small>\n                <a class="toggle-like-button" data-likes="0" href="/like/toggle/?id=${e._id}&type=Comment">\n                    0 Likes\n                </a>\n\n            </small>\n            </p>\n        </li>`)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}