function getFileExtension(fileName) {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
}

var accessToken = localStorage.getItem("Access Token");
var username = sessionStorage.getItem("Username");
var accessExpiry = sessionStorage.getItem("Access Expiry");

const date = new Date();
if (accessExpiry <= date.toISOString()) {
  alert("Unauthorized");
  window.location.href = "/HTML/Login_&_SignUp_Page/Login.html";
}

document
  .getElementById("upload-btn")
  .addEventListener("click", async function () {

    let fileInput = document.getElementById("upload");
    if (fileInput.files.length > 0) {
      let file = fileInput.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);

      const baseUrl = "http://localhost:5194/documents";
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Username": username
        },
        body: formData,
      });

      if (response.ok)
      {
        alert("Successfully Uploaded!");
      }

      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      console.error(err);
    }
  }
});
