const baseUrl = "http://localhost:5194/orders";
const accessToken = localStorage.getItem("Access Token");
const username = sessionStorage.getItem("Username");
const accessExpiry = sessionStorage.getItem("Access Expiry");

async function fetchData(api_url) {
  try {
    const response = await fetch(api_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Username": username
      },
    });

    const currentUTC = new Date(); 
    if(accessExpiry <= currentUTC.toISOString()){
      alert("Unauthorized");
      window.location.href = "/HTML/Login_&_SignUp_Page/Login.html";
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function populateTable() {
  const orderTable = document.getElementById("orderTable").getElementsByTagName("tbody")[0];

  const orders = await fetchData(baseUrl);

  orders.forEach((order) => {
    const row = orderTable.insertRow();
    row.insertCell(0).innerHTML = order.date;
    row.insertCell(1).innerHTML = order.customerId;
  });
}
populateTable();
