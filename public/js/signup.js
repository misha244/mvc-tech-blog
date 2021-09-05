const onSubmit = async (event) => {
  event.preventDefault();

  const first_name = $("#firstName").val();
  const last_name = $("#lastName").val();
  const email = $("#email").val();
  const username = $("#username").val();
  const password = $("#password").val();
  const confirm_password = $("#confirmPassword").val();

  if (
    !first_name ||
    !last_name ||
    !email ||
    !username ||
    !password ||
    !confirm_password
  ) {
    $("#alert-div").empty();
    $("#alert-div")
      .append(`<div id="error-alert" class="alert alert-danger d-flex align-items-center" role="alert">
    <i class="fas fa-exclamation-triangle me-4"></i>
    <div class="text-center">
      Please complete all fields!
    </div>
  </div>`);
    return;
  }

  if (password === confirm_password) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        username,
        password,
      }),
    };

    const response = await fetch("/auth/signup", options);

    if (response.status !== 200) {
      console.error("Signup unsuccessful");
    } else {
      window.location.href = "/login";
    }
  } else {
    $("#alert-div").empty();
    $("#alert-div")
      .append(`<div id="error-alert" class="alert alert-warning d-flex align-items-center" role="alert">
    <i class="fas fa-exclamation-triangle me-4"></i>
    <div class="text-center">
      Passwords don't match. Please try again.
    </div>
  </div>`);
  }
};

$("#sign-up-form").submit(onSubmit);
