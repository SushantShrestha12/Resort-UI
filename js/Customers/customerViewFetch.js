const baseUrl = "http://localhost:5194/customers";

const token = localStorage.getItem("Access Token");
const username = sessionStorage.getItem("Username");
const accessExpiry = sessionStorage.getItem("Access Expiry");

async function fetchData(api_url) {
  try {

    const response = await fetch(api_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Username": username
      },
    });
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
const currentUTC = new Date();
    if(accessExpiry <= currentUTC.toISOString()){
      alert("Unauthorized");
      window.location.href = "/HTML/Login_&_SignUp_Page/Login.html";
    }

    // console.log(response);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function populateTable() {
  const customerTable = document
    .getElementById("customerTable")
    .getElementsByTagName("tbody")[0];

  const customers = await fetchData(baseUrl);

  customers.forEach((customer) => {
    customerTable.insertAdjacentHTML("beforeend", CreateRow(customer));
  });
}

function CreateRow(customer) {
  return (
    "<tr>" +
    "<td><a href='customerDetail.html'>" +
    customer.name +
    "</a></td>" +
    "<td>" +
    customer.contact.email +
    "</td>"
  );
}

populateTable();


