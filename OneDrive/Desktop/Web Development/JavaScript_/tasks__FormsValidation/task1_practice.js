let array = [];
let editingIndex = -1;

function submitdata(event) {
    event.preventDefault();
  

    let nameinput = document.getElementById("name1").value;
    let ageinput = document.getElementById("age1").value;
    let contactinput = document.getElementById("contact1").value;
    let emailinput = document.getElementById("email1").value;
    let degreeinput = document.getElementById("dropid").value;
    let agreechk = document.getElementById("agree").checked;
    let malecheck = document.getElementById("rdmale").checked;
    let femalecheck = document.getElementById("rdfemale").checked;

    let genderinput = malecheck ? "Male" : femalecheck ? "Female" : "";

    if (!nameinput || !ageinput || !contactinput || !emailinput || !genderinput || !degreeinput) {
        alert("Please fill in all required fields before submitting.");
        return;
    }
    if (/\d/.test(nameinput)) {
        document.getElementById("demo1").innerText = "Name can't have numbers.";
        return;
    }
    if (parseInt(ageinput) <= 15 || parseInt(ageinput) > 80) {
        document.getElementById("demo2").innerText = "Invalid age.";
        return;
    }
    if (contactinput.length !== 11 || /[a-zA-Z]/.test(contactinput)) {
        document.getElementById("demo3").innerText = "Contact must be 11 digits.";
        return;
    }
    if (!emailinput.includes("@") || !emailinput.includes(".")) {
        document.getElementById("demo4").innerText = "Invalid email format.";
        return;
    }

    const userdata = {
        name: nameinput,
        age: ageinput,
        contact: contactinput,
        email: emailinput,
        gender1: genderinput,
        degree: degreeinput,
        agree1: agreechk
    };

    if (editingIndex === -1) {
  
        array.push(userdata);
        addToTable(userdata);
    } else {
        array[editingIndex] = userdata;
        updateTableRow(editingIndex, userdata);
        editingIndex = -1;
    }

    document.querySelector("form").reset();
    console.log(array);
}

function addToTable(user) {
    let table = document.querySelector("table");
    let newRow = table.insertRow();

    newRow.insertCell(0).innerText = user.name;
    newRow.insertCell(1).innerText = user.age;
    newRow.insertCell(2).innerText = user.contact;
    newRow.insertCell(3).innerText = user.email;
    newRow.insertCell(4).innerText = user.gender1;
    newRow.insertCell(5).innerText = user.degree;
    newRow.insertCell(6).innerText = user.agree1;
    newRow.insertCell(7).innerHTML = `
        <button onclick="editrow(this)" class="btneditdel">Edit</button>
        <button onclick="deleterow(this)" class="btneditdel">Delete</button>`;
}

function updateTableRow(index, user) {
    let table = document.querySelector("table");
    let row = table.rows[index + 1]; 

    row.cells[0].innerText = user.name;
    row.cells[1].innerText = user.age;
    row.cells[2].innerText = user.contact;
    row.cells[3].innerText = user.email;
    row.cells[4].innerText = user.gender1;
    row.cells[5].innerText = user.degree;
    row.cells[6].innerText = user.agree1;

}

function deleterow(button) {
    let row = button.closest("tr");
    let index = row.rowIndex - 1; 
    row.remove();
    array.splice(index, 1);
    editingIndex = -1;
    console.log(array);
}
function editrow(button) {
    let row = button.closest("tr");
    editingIndex = row.rowIndex - 1;

    let cells = row.cells;
    document.getElementById("name1").value = cells[0].innerText;
    document.getElementById("age1").value = cells[1].innerText;
    document.getElementById("contact1").value = cells[2].innerText;
    document.getElementById("email1").value = cells[3].innerText;
    document.getElementById("dropid").value = cells[5].innerText;
    document.getElementById("agree").checked = (cells[6].innerText === "true");
    if (cells[4].innerText === "Male") {
        document.getElementById("rdmale").checked = true;
    } else if (cells[4].innerText === "Female") {
        document.getElementById("rdfemale").checked = true;
    }
}

function filterData() {
    const nameValue = document.getElementById("namefilter").value.toLowerCase();
    const selectedDegree = document.getElementById("dropidfilter").value;
    const selectedGender = document.getElementById("genderfilter").value;
    const resultChecked = document.getElementById("resultFilter").checked;

    const table = document.querySelector("table");

   
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    const filteredArray = array.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(nameValue) || user.email.toLowerCase().includes(nameValue);
        const degreeMatch = selectedDegree === "" || user.degree === selectedDegree;
        const genderMatch = selectedGender === "" || user.gender1 === selectedGender;
      const resultMatch = !resultChecked || user.agree1 === true;

        return nameMatch && degreeMatch && genderMatch && resultMatch;
    });

    filteredArray.forEach(user => addToTable(user));
}