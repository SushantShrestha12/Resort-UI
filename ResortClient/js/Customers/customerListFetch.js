const baseUrl = "http://localhost:5194/customers";

const token = localStorage.getItem("Access Token");
const accessExpiry = sessionStorage.getItem("Access Expiry");
const username = sessionStorage.getItem("Username");

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

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const currentUTC = new Date();
    if(accessExpiry <= currentUTC.toISOString()){
      alert("Unauthorized");
      window.location.href = "/HTML/Login_&_SignUp_Page/Login.html";
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
populateTable();

function CreateRow(customer) {
  return (
    "<tr>" +
    "<td>" +
    customer.name +
    "</td>" +
    "<td>" +
    customer.address.province +
    "</td>" +
    "<td>" +
    customer.address.city +
    "</td>" +
    "<td>" +
    customer.address.addressLine +
    "</td>" +
    "<td>" +
    customer.address.municipality +
    "</td>" +
    "<td>" +
    customer.address.wardNo +
    "</td>" +
    "<td>" +
    customer.contact.mobileNumber +
    "</td>" +
    "<td>" +
    customer.contact.email +
    "</td>" +
    "</tr>"
  );
}

// const baseUrl = "http://localhost:5194/customers";

// async function fetchData(api_url) {
//   try {
//     const response = await fetch(api_url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.text();
//     console.log(data);

//     const customerText = `
//             Name: ${data.name}<br>
//             Province: ${data.province}<br>
//             City: ${data.city}<br>
//             Municipality: ${data.municipality}<br>
//             Address Line: ${data.addressLine}<br>
//             Ward No: ${data.wardNo}<br>
//             Mobile No.: ${data.mobileNo}<br>
//             Email: ${data.email}<br>
//           `;

//     document.querySelector(".customer-text").innerHTML = customerText;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// fetchData(baseUrl);
