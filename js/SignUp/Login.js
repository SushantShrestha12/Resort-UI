const baseUrl = "http://localhost:5194/login";
async function fetchData(api_url, loginData) {
  try {
 
    console.log(loginData);
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });


    const data = await response.json();

    console.log(data);

    if (data.isAuthenticated == true) {
      localStorage.setItem("Access Token", data.accessToken);
      localStorage.setItem("Refresh Token", data.refreshToken);

      sessionStorage.setItem("Username", data.username);
      sessionStorage.setItem("Access Expiry", data.accExpires);

      window.location.href = "/HTML/index.html";
    } else {
      alert("Invalid Username or Password");
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

document
  .getElementById("login_btn")
  .addEventListener("click", async function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginData = { username, password };

    if (username == "" || password == "") {
      alert("Please fill all the fields");
      return;
    }

    await fetchData(baseUrl, loginData);
  });

