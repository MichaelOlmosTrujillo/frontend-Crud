document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});

const addBoton = document.getElementById("add-name-btn");

addBoton.addEventListener("click", () => {
  const nameInput = document.getElementById("name-input");
  const name = nameInput.value;
  nameInput.value = "";

  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: name,
    }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data["data"]));
});

function insertRowIntoTable(data) {}

function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");

  data.forEach(element => console.log(element.id));

  if (data.length === 0) {
    table.innerHTML =
      "<tr> <td class = 'no-data' colspan = '5'> No Data </td> </tr>";
    return;
  }

  let tableHtml = "";
  data.forEach(function ({ id, Name, DateAdded }) {
      
    tableHtml += "<tr>";
    tableHtml += `<td> ${id} </td>`;
    tableHtml += `<td> ${Name} </td>`;
    tableHtml += `<td> ${new Date(DateAdded).toLocaleString()} </td>`;
    tableHtml += `<td> <button class = "delete-row-btn" data-id = ${id}>Delete </button> </td>`;
    tableHtml += `<td> <button class = "edit-row-btn" data-id = ${id}>Edit </button> </td>`;
    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}
