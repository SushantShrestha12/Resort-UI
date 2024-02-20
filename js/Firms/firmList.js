const baseUrl = "http://localhost:5194/firms";
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
        "Username": username,
      },
    });

    const currentUTC = new Date();
    if (accessExpiry <= currentUTC.toISOString()) {
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
  const firmTable = document
    .getElementById("firmTable")
    .getElementsByTagName("tbody")[0];

  const firms = await fetchData(baseUrl);

  firms.forEach((firm) => {
    const row = firmTable.insertRow();
    row.insertCell(0).innerHTML = firm.name;
    row.insertCell(1).innerHTML = firm.address.province;
    row.insertCell(2).innerHTML = firm.address.city;
    row.insertCell(3).innerHTML = firm.address.municipality;
    row.insertCell(4).innerHTML = firm.address.addressLine;
    row.insertCell(5).innerHTML = firm.address.wardNo;
    row.insertCell(6).innerHTML = firm.contact.contactPerson;
    row.insertCell(7).innerHTML = firm.contact.mobileNumber;
    row.insertCell(8).innerHTML = firm.contact.telephoneNumber;
    row.insertCell(9).innerHTML = firm.contact.email;
    row.insertCell(10).innerHTML = firm.contact.website;
  });
}
populateTable();
