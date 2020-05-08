document.addEventListener("DOMContentLoaded", () => {
  let comments = [];
  // Target DOM Elements
  let comment_box = document.querySelector("#comment_box");
  let comment_btn = document.querySelector("#add_comment");
  let comment_wrapper = document.querySelector("#comment-listing");
  let reply_textbox = document.querySelector("#reply_comment");
  let nestedCommentForm = document.querySelector(
    "#comment_list_inner .comment-area"
  );

  //initialize loacl stroge if not
  if (localStorage.getItem("comments") === null)
    localStorage.setItem("comments", JSON.stringify(comments));

  //Add comment object in localStorge
  let addComment = (comment) => {
    let all_comments = getAllComments();
    all_comments.push(comment);
    updateStroge(all_comments);
  };

  //update local stroge with new data
  let updateStroge = (newData) => {
    localStorage.setItem("comments", JSON.stringify(newData));
    renderComments();
  };

  //Add reply on the same index
  let addReply = (reply, index) => {
    let all_comments = getAllComments();
    all_comments.forEach((element, i) => {
      if (i == index) {
        if (element.children) {
          element.children.push(reply);
        } else {
          element.children = [];
          element.children.push(reply);
        }
      }
    });
    updateStroge(all_comments);
  };

  //Delete parent comment
  let deleteComment = (index) => {
    let get_all_comments = getAllComments();
    get_all_comments.splice(index, 1);
    updateStroge(get_all_comments);
  };

  // Delete child comment
  let deleteChild = (id) => {
    let get_all_comments = getAllComments();
    get_all_comments.map((comment) => {
      if (comment.children) {
        comment.children.splice(id, 1);
      }
    });
    updateStroge(get_all_comments);
  };

  //get all existing comments from localStroge
  let getAllComments = () => JSON.parse(localStorage.getItem("comments"));

  // Reply on any parent comment
  let reply = (index) => {
    //show comment reply form
    nestedCommentForm.style.display = "flex";
    reply_textbox.addEventListener("click", () => {
      let message = document.querySelector("#reply-box").value;
      let comment_obj = {
        name: "Ankit",
        src: "http://facebook.com/",
        message: message,
      };
      addReply(comment_obj, index); //adding reply in local stroge
      document.querySelector("#reply-box").value = "";
      nestedCommentForm.style.display = "none";
    });
  };

  let renderComments = () => {
    let get_all_comments = getAllComments();
    let comment_list = get_all_comments.map((comment, index) => {
      return `<li class="comment_list">
        <div class="parent-comment">
            <div class="user_avtar">
                <img
                    src="https://instagram.fdel18-1.fna.fbcdn.net/v/t51.2885-15/e35/95168755_1188313104848732_7163586086101228730_n.jpg?_nc_ht=instagram.fdel18-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=E04Bpx3IeJYAX8m_BP-&oh=3486a37e1f6b0807382ed237660dc258&oe=5EDC7BFF">
            </div>
            <div class="user-comments">
                <h3>Amir Sohel</h3>
                <p>${comment.message}</p>
                <a onclick="reply(${index})" class="reply">Reply</a>
                <a onclick="deleteComment(${index})" class="delete">Delete</a>
            </div>
        </div>
        ${
          comment && comment.children
            ? comment.children.map(
                (children, childIndex) => `<div class="sub-comment">
        <div class="user_avtar">
            <img
                src="https://instagram.fdel18-1.fna.fbcdn.net/v/t51.2885-15/e35/95168755_1188313104848732_7163586086101228730_n.jpg?_nc_ht=instagram.fdel18-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=E04Bpx3IeJYAX8m_BP-&oh=3486a37e1f6b0807382ed237660dc258&oe=5EDC7BFF">
        </div>
        <div class="user-comments">
            <h3>Shreya Kalyan</h3>
            <p>${children.message}</p>
            <a onclick="reply(${index})" class="reply">Reply</a>
            <a onclick="deleteChild(${childIndex})" class="delete">Delete</a>
        </div>
    </div>`
              )
            : ""
        }
    </li>`;
    });

    //Bind wiht html
    comment_wrapper.innerHTML = comment_list;
    //get list from bottom
    comment_wrapper.scrollTo({
      top: comment_wrapper.scrollHeight,
      behavior: "smooth",
    });
  };

  window.reply = reply;
  window.deleteComment = deleteComment;
  window.deleteChild = deleteChild;

  //adding new comment
  comment_btn.addEventListener("click", () => {
    let message = comment_box.value;
    let comment_obj = {
      name: "Amir Sohel",
      src: "http://google.com/",
      message: message,
    };
    comment_box.value = "";
    addComment(comment_obj);
    renderComments();
  });
  //on load get all comments
  renderComments();
});




