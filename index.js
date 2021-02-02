document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});

document.querySelector('table tbody').addEventListener('click', function (event){
if(event.target.className === "delete-row-btn"){
  deleteRowById(event.target.dataset.id);
}
if(event.target.className === "edit-row-btn"){
  handleEditRow(event.target.dataset.id);
}
})

const updateBtn = document.querySelector("#update-row-btn");

function deleteRowById(id){
  fetch('http://localhost:5000/delete/' + id, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    if(data.success){
      location.reload();
    }
  });
}

function handleEditRow(id){
  const updateSection = document.querySelector('#update-row')
  updateSection.hidden = false;
}

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

function insertRowIntoTable(data) {
  console.log(data['id']['insertId']);
  const table = document.querySelector('table tbody');
  const isTableData = table.querySelector('.no-data');

  let tableHtml = "<tr>";

 for(var key in data){
   if(data.hasOwnProperty(key)){
     if(key === 'DateAdded'){
       data[key] = new Date(data[key]).toLocaleString();
     }
     if(key === 'id'){
       data[key] = data['id']['insertId'];
     }
     tableHtml += `<td> ${data[key]} </td>`;
   }
 }

  tableHtml += `<td> <button class = "delete-row-btn" data-id = ${data.id}>Delete </button> </td>`;
    tableHtml += `<td> <button class = "edit-row-btn" data-id = ${data.id}>Edit </button> </td>`;

  tableHtml += "</tr>"; 

  if(isTableData){
    table.innerHTML = tableHtml;
  } else{
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}

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
