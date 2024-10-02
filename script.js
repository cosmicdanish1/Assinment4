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

let selectedRowIndex = null;

function populateTable() {
  const tbody = document.querySelector('#chemicalTable tbody');
  tbody.innerHTML = ''; 
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

function addRowClickEvents() {
  const rows = document.querySelectorAll("#chemicalTable tbody tr");
  rows.forEach(row => {
    row.addEventListener('click', () => {
      if (selectedRowIndex !== null) {
        const prevSelectedRow = document.querySelector(`#chemicalTable tbody tr[data-index="${selectedRowIndex}"]`);
        if (prevSelectedRow) {
          prevSelectedRow.classList.remove('highlight');
        }
      }

      row.classList.add('highlight');
      selectedRowIndex = parseInt(row.getAttribute('data-index'));
    });
  });
}

function sortTable(columnIndex) {
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

function moveRowUp() {
  if (selectedRowIndex === null || selectedRowIndex === 0) return;

  [data[selectedRowIndex - 1], data[selectedRowIndex]] = [data[selectedRowIndex], data[selectedRowIndex - 1]];
  selectedRowIndex -= 1;
  populateTable();
}

function moveRowDown() {
  if (selectedRowIndex === null || selectedRowIndex === data.length - 1) return;

  [data[selectedRowIndex + 1], data[selectedRowIndex]] = [data[selectedRowIndex], data[selectedRowIndex + 1]];
  selectedRowIndex += 1;
  populateTable();
}

function incrementValue() {
  if (selectedRowIndex === null) return;

  data[selectedRowIndex].quantity += 1;
  populateTable();
}

function decrementValue() {
  if (selectedRowIndex === null) return;

  data[selectedRowIndex].quantity -= 1;
  populateTable();
}

function deleteRow() {
  if (selectedRowIndex === null) return;

  data.splice(selectedRowIndex, 1);
  selectedRowIndex = null;
  populateTable();
}

function saveTable() {
  localStorage.setItem('chemicalData', JSON.stringify(data));
  alert('Table saved successfully!');
}

function refreshTable() {
  const storedData = localStorage.getItem('chemicalData');
  if (storedData) {
    data = JSON.parse(storedData);
    populateTable();
    alert('Table refreshed!');
  } else {
    alert('No saved data found.');
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none"; 
}

function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block"; 
}

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

  if (!newChemical.chemicalName || !newChemical.vendor) {
    alert("Please fill in all required fields.");
    return;
  }

  data.push(newChemical);
  populateTable();

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

window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    closeModal();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Check local storage for saved data on page load
  const storedData = localStorage.getItem('chemicalData');
  if (storedData) {
    data = JSON.parse(storedData);
  }
  populateTable();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
