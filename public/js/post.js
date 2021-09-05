const handleDelete = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.id;

  const options = {
    method: "DELETE",
    redirect: "follow",
  };

  const response = await fetch(`/api/posts/${id}`, options);

  if (response.status !== 200) {
    console.log("FAILED TO DELETE");
  } else {
    window.location.replace("/dashboard");
  }
};

const handleEdit = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.id;

  const title = $("#post-title").val();
  const body = $("#post-body").val();

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({ title, body }),
  };

  const response = await fetch(`/api/posts/${id}`, options);

  if (response.status !== 200) {
    console.error("Failed to add post");
  } else {
    window.location.replace("/dashboard");
  }
};

const handleCreate = async (event) => {
  event.preventDefault();

  const title = $("#post-title").val();
  const body = $("#post-body").val();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({ title, body }),
  };

  const response = await fetch("/api/posts", options);

  if (response.status !== 200) {
    console.error("Failed to add post");
  } else {
    window.location.replace("/dashboard");
  }
};

$("#create-post-form").submit(handleCreate);
$('[name="edit-post-form"]').submit(handleEdit);
$('[name="delete-btn"]').click(handleDelete);
