document
  .getElementById("signup_btn")
  .addEventListener("click", async function () {
    let username = document.getElementById("username").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    const user = {
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const baseUrl = "http://localhost:5194/SignUp";
      const res = await fetch(baseUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        window.location.href = "/HTML/Login_&_SignUp_Page/Login.html";
      }

      const resData = await res.text();
      console.log(resData);
    } catch (err) {
      console.error(err);
    }
  });
