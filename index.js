const form = document.querySelector('form');

form.addEventListener('submit', registerStudent);

function registerStudent(e) {
  e.preventDefault(); // Prevent the default form submission

  // Get the input values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const id = document.getElementById('id').value.trim();
  const contact = document.getElementById('contact').value.trim();

  // check input field
  if (name === '' && email === '' && id === '' && contact === '') {
    alert('Required all input fields');
    return;
  }

  // Regular expression to check if the string contains any digits
  const regex = /\d/;
  if (regex.test(name)) {
    alert('Name should not contain number');
    return;
  }

  // adding 0 to the single digit of id
  let idValue = id < 10 ? '0' + id : id;

  // check contact is not less than 10 digit
  if (contact.length < 10) {
    alert('Number should not less than 10 digit');
    return;
  }

  // Add values to localstorage
  const student = { idValue, name, email, contact };
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));

  addStudentToTable(student);

  // Clear the form field after the submission
  form.reset();
}

// Add student to new row
function addStudentToTable(student) {
  // Create table body
  const tbody = document.querySelector('tbody');
  const tr = document.createElement('tr');

  const td1 = document.createElement('td');
  td1.textContent = student.idValue;
  const td2 = document.createElement('td');
  td2.textContent = student.name;
  const td3 = document.createElement('td');
  td3.textContent = student.email;

  const td4 = document.createElement('td');
  td4.textContent = student.contact;

  const td5 = document.createElement('td');

  const div = document.createElement('div');
  const edit = document.createElement('span');
  edit.className = 'edit';
  edit.textContent = '🖋️';
  const remove = document.createElement('span');
  remove.className = 'remove';
  remove.textContent = '❌';

  div.appendChild(edit);
  div.appendChild(remove);

  td5.appendChild(div);

  // Append each cell to the row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);

  // Append the row to the table body
  tbody.appendChild(tr);
}
// get students from localstorage when page is loaded
document.addEventListener('DOMContentLoaded', function () {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  students.forEach((student) => addStudentToTable(student));
});

const tbody = document.querySelector('tbody');
tbody.addEventListener('click', handleClick);

// function to remove and edit row
function handleClick(e) {
  if (e.target.classList.contains('remove')) {
    removeElement(e.target);
  } else if (e.target.classList.contains('edit')) {
    editElement(e.target);
  }
}

function removeElement(item) {
  const row = item.closest('tr');
  const id = row.cells[0].textContent;
  row.remove();

  let students = JSON.parse(localStorage.getItem('students')) || [];
  students = students.filter((student) => student.idValue !== id);
  localStorage.setItem('students', JSON.stringify(students));
}

function editElement(item) {
  const row = item.closest('tr');
  const id = row.cells[0].textContent;
  const name = row.cells[1].textContent;
  const email = row.cells[2].textContent;
  const contact = row.cells[3].textContent;

  document.getElementById('id').value = id;
  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
  document.getElementById('contact').value = contact;

  removeElement(item);
}
