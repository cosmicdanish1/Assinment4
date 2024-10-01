let data = [
  {
    id: 1,
    chemicalName: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: 3525.92,
    viscosity: 60.63,
    packaging: "Bag",
    packSize: 100.00,
    unit: "kg",
    quantity: 6495.18
  },
  {
    id: 2,
    chemicalName: "Sodium Chloride",
    vendor: "BASF",
    density: 2160.50,
    viscosity: 45.80,
    packaging: "Box",
    packSize: 50.00,
    unit: "kg",
    quantity: 3200.25
  }
];


// Populate the table with initial data
function populateTable() {
  const tbody = document.querySelector('#chemicalTable tbody');
  tbody.innerHTML = ''; // Clear table before re-rendering
  
  data.forEach((item, index) => {
    let row = `<tr data-index="${index}">
      <td>${item.id}</td>
      <td>${item.chemicalName}</td>
      <td>${item.vendor}</td>
      <td>${item.density}</td>
      <td>${item.viscosity}</td>
      <td>${item.packaging}</td>
      <td>${item.packSize}</td>
      <td>${item.unit}</td>
      <td>${item.quantity}</td>
    </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

populateTable();


function sortTable(columnIndex) {
  let rows = Array.from(document.querySelectorAll("#chemicalTable tbody tr"));
  let sortedRows = rows.sort((rowA, rowB) => {
    let cellA = rowA.cells[columnIndex].innerText.toLowerCase();
    let cellB = rowB.cells[columnIndex].innerText.toLowerCase();

    return cellA.localeCompare(cellB);
  });

  // Clear and re-add sorted rows
  const tbody = document.querySelector("#chemicalTable tbody");
  tbody.innerHTML = "";
  sortedRows.forEach(row => tbody.appendChild(row));
}



function addRow() {
  const newRow = {
    id: data.length + 1,
    chemicalName: "New Chemical",
    vendor: "New Vendor",
    density: 0,
    viscosity: 0,
    packaging: "Bag",
    packSize: 0,
    unit: "kg",
    quantity: 0
  };
  
  data.push(newRow);
  populateTable();
}

function deleteRow() {
  let selectedRow = document.querySelector("#chemicalTable tbody tr.selected");
  if (selectedRow) {
    let index = selectedRow.getAttribute("data-index");
    data.splice(index, 1);
    populateTable();
  }
}

function moveRowUp() {
  let selectedRow = document.querySelector("#chemicalTable tbody tr.selected");
  if (selectedRow) {
    let index = parseInt(selectedRow.getAttribute("data-index"));
    if (index > 0) {
      [data[index - 1], data[index]] = [data[index], data[index - 1]];
      populateTable();
    }
  }
}

function moveRowDown() {
  let selectedRow = document.querySelector("#chemicalTable tbody tr.selected");
  if (selectedRow) {
    let index = parseInt(selectedRow.getAttribute("data-index"));
    if (index < data.length - 1) {
      [data[index + 1], data[index]] = [data[index], data[index + 1]];
      populateTable();
    }
  }
}

function refreshTable() {
  populateTable(); // Reloads initial data
}

function saveTable() {
  localStorage.setItem("tableData", JSON.stringify(data));
  alert("Table saved!");
}

// Restore table from saved state if available
if (localStorage.getItem("tableData")) {
  data = JSON.parse(localStorage.getItem("tableData"));
  populateTable();
}




document.querySelector("#chemicalTable tbody").addEventListener("click", function(event) {
  let rows = document.querySelectorAll("#chemicalTable tbody tr");
  rows.forEach(row => row.classList.remove("selected"));

  event.target.parentNode.classList.add("selected"); // Highlight selected row
});



