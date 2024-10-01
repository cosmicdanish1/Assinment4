// Sample Data
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

// Selected Row Index
let selectedRowIndex = null;

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

  addRowClickEvents();
}

// Add click events to table rows for selection
function addRowClickEvents() {
  const rows = document.querySelectorAll("#chemicalTable tbody tr");
  rows.forEach(row => {
    row.addEventListener('click', () => {
      // Remove highlight from previously selected row
      if (selectedRowIndex !== null) {
        const prevSelectedRow = document.querySelector(`#chemicalTable tbody tr[data-index="${selectedRowIndex}"]`);
        if (prevSelectedRow) {
          prevSelectedRow.classList.remove('highlight');
        }
      }

      // Highlight the clicked row
      row.classList.add('highlight');
      selectedRowIndex = parseInt(row.getAttribute('data-index'));
    });
  });
}

// Sort the table based on column index
function sortTable(columnIndex) {
  // Sort data array
  data.sort((a, b) => {
    let aValue = Object.values(a)[columnIndex];
    let bValue = Object.values(b)[columnIndex];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    } else {
      return aValue.toString().localeCompare(bValue.toString());
    }
  });

  populateTable();
}

// Move the selected row up
function moveRowUp() {
  if (selectedRowIndex === null || selectedRowIndex === 0) return;

  // Swap the selected row with the one above it
  [data[selectedRowIndex - 1], data[selectedRowIndex]] = [data[selectedRowIndex], data[selectedRowIndex - 1]];
  selectedRowIndex -= 1;
  populateTable();
}

// Move the selected row down
function moveRowDown() {
  if (selectedRowIndex === null || selectedRowIndex === data.length - 1) return;

  // Swap the selected row with the one below it
  [data[selectedRowIndex + 1], data[selectedRowIndex]] = [data[selectedRowIndex], data[selectedRowIndex + 1]];
  selectedRowIndex += 1;
  populateTable();
}

// Increment the quantity in the selected row
function incrementValue() {
  if (selectedRowIndex === null) return;

  data[selectedRowIndex].quantity += 1;
  populateTable();
}

// Decrement the quantity in the selected row
function decrementValue() {
  if (selectedRowIndex === null) return;

  data[selectedRowIndex].quantity -= 1;
  populateTable();
}

// Delete the selected row
function deleteRow() {
  if (selectedRowIndex === null) return;

  data.splice(selectedRowIndex, 1);
  selectedRowIndex = null;
  populateTable();
}

// Save the table (you can implement this as needed)
function saveTable() {
  // Example: Save data to localStorage
  localStorage.setItem('chemicalData', JSON.stringify(data));
  alert('Table saved successfully!');
}

// Refresh the table (reload data)
function refreshTable() {
  // Example: Reload data from localStorage
  const storedData = localStorage.getItem('chemicalData');
  if (storedData) {
    data = JSON.parse(storedData);
    populateTable();
    alert('Table refreshed!');
  } else {
    alert('No saved data found.');
  }
}

// Close modal function
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none"; // Hide modal
}

// Show modal function
function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block"; // Show modal
}

// Add a new chemical
function addNewChemical() {
  const newChemical = {
    id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
    chemicalName: document.getElementById("chemicalName").value,
    vendor: document.getElementById("vendor").value,
    density: parseFloat(document.getElementById("density").value),
    viscosity: parseFloat(document.getElementById("viscosity").value),
    packaging: document.getElementById("packaging").value,
    packSize: parseFloat(document.getElementById("packSize").value),
    unit: document.getElementById("unit").value,
    quantity: parseFloat(document.getElementById("quantity").value),
  };

  // Validate input
  if (!newChemical.chemicalName || !newChemical.vendor) {
    alert("Please fill in all required fields.");
    return;
  }

  // Add new chemical to data and re-populate the table
  data.push(newChemical);
  populateTable();

  // Clear input fields and close the modal
  closeModal();
  document.getElementById("chemicalName").value = '';
  document.getElementById("vendor").value = '';
  document.getElementById("density").value = '';
  document.getElementById("viscosity").value = '';
  document.getElementById("packaging").value = '';
  document.getElementById("packSize").value = '';
  document.getElementById("unit").value = '';
  document.getElementById("quantity").value = '';
}

// Prevent clicking outside the modal to close it
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    closeModal();
  }
};

// Initial Call to Populate Table
document.addEventListener('DOMContentLoaded', populateTable);
