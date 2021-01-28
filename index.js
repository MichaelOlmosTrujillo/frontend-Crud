document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

const addBoton = document.getElementById('add-name-btn');

addBoton.addEventListener('click', () => {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value;
    nameInput.value = "";

    fetch('http://localhost:5000/insert', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: name
            })
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
})

function insertRowIntoTable(data){
    
}


function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    let tableHtml = "";

    console.log(data)

    if (data.length === 0) {
        table.innerHTML = "<tr> <td class = 'no-data' colspan = '5'> No Data </td> </tr>"
    }

}