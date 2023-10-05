// document.getElementById("logout").addEventListener("click", function () {
//   const response = confirm("Are you sure you want to logout?");
//   if (response) {
//     try {
//       localStorage.removeItem("Access Token");
//       localStorage.removeItem("Refresh Token");
//       window.location.href = "/HTML/Login_&_SignUp_Page/Signup.html";
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return [];
//     }
//   }
// });

const baseUrl = "http://localhost:5194/logout";

async function fetchData(api_url) {
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
      localStorage.removeItem("Access Token");
      localStorage.removeItem("Refresh Token");
      sessionStorage.removeItem("Username");
      sessionStorage.removeItem("Access Expiry");
      const data = await response.json();
      window.location.href = "/HTML/Login_&_SignUp_Page/Signup.html";
      console.log(data);
      return data;
    } else {
      return;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

document.getElementById("logout").addEventListener("click", function () {
  fetchData(baseUrl);
});
