$("#signIntoggle").click(() => {
  $("#container").removeClass("active");
});

$("#signUptoggle").click(() => {
  $("#container").addClass("active");
});

$("#signUpBtn").click((event) => {
  let username = $("#username").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (username && email && password && emailPattern.test(email)) {
    let data = {
      username: username,
      email: email,
      password: password,
    };
    event.preventDefault();
    $.ajax({
      url: "/auth/signup",
      method: "post",
      data: data,
      success: () => {
        $("#container").removeClass("active");
        $(".success-msg").addClass("active");
        setTimeout(() => {
          $(".success-msg").removeClass("active");
        }, 2500);
        $("#username").val("");
        $("#email").val("");
        $("#password").val("");
      },
    });
  }
});
