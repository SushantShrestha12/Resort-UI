document
  .getElementById("btn-AddCustomer")
  .addEventListener("click", async function () {
    const token = localStorage.getItem("Access Token");
    const username = sessionStorage.getItem("Username");
    const accessExpiry = sessionStorage.getItem("Access Expiry");

    let customerName = document.getElementById("customerName").value;
    let province = document.getElementById("province").value;
    let city = document.getElementById("city").value;
    let mobile = document.getElementById("mobileNo").value;
    let wardNo = document.getElementById("wardNo").value;
    let municipality = document.getElementById("municipality").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    const customer = {
      name: customerName,
      province: province,
      city: city,
      municipality: municipality,
      addressLine: address,
      wardNumber: wardNo,
      mobileNumber: mobile,
      email: email,
    };

    try {
      const baseUrl = "http://localhost:5194/customers";
      const res = await fetch(baseUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Username": username
        },
        body: JSON.stringify(customer),
      });

      if (res.ok) {
        window.location.href = "customerView.html";
      }
      
      const currentUTC = new Date();
      if(accessExpiry <= currentUTC.toISOString()){
        alert("Unauthorized");
        window.location.href = "/HTML/Login_&_SignUp_Page/Login.html";
        return[];
      }

      const resData = await res.json();
      console.log(resData);
    } catch (err) {
      console.error(err);
    }
  });
