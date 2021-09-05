const handleComment = async (event) => {
  event.preventDefault();

  const post_id = event.currentTarget.id;

  const message = $("#commentData").val();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({ message, post_id }),
  };

  const response = await fetch("/api/comments", options);

  if (response.status !== 200) {
    console.error("Failed to add comment");
  } else {
    window.location.replace(`/posts/${post_id}`);
  }
};

const handleEditComment = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.id;
  const post_id = event.currentTarget.getAttribute("data-post");

  const message = $("#comment-message").val();

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({ message }),
  };

  const response = await fetch(`/api/comments/${id}`, options);

  if (response.status !== 200) {
    console.error("Failed to update comment");
  } else {
    window.location.replace(`/posts/${post_id}`);
  }
};

const handleDeleteComment = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.id;
  const post_id = event.currentTarget.getAttribute("data-post");

  const options = {
    method: "DELETE",
    redirect: "follow",
  };

  const response = await fetch(`/api/comments/${id}`, options);

  if (response.status !== 200) {
    console.log("FAILED TO DELETE");
  } else {
    window.location.replace(`/posts/${post_id}`);
  }
};

$('[name="delete-btn"]').click(handleDeleteComment);
$('[name="edit-comment-form"]').submit(handleEditComment);
$('[name="comment-form"]').submit(handleComment);
