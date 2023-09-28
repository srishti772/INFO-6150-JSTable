//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
  var insertTitle = document.getElementsByTagName("body")[0];
  var title = document.createElement("p");
  title.innerHTML = "<h1 align='center'>" + t1 + "</h1>";
  insertTitle.prepend(title);

  var submit = document.getElementById("button");
  submit.disabled = true;
  submit.style.backgroundColor = "grey";
}

Title.prototype.getName = function () {
  return (this.mytitle);
}

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};


window.onload = Title("Srishti Ahirwar\tNUID:002692397");

function showRow(downArrow) {
  var selectedRows = document.getElementsByClassName("dropDownTextArea");
  var expandColumn = downArrow.parentElement.parentElement.nextElementSibling;
   if (expandColumn.style.display == 'none')
    expandColumn.style.display = 'table-row';
  else
    expandColumn.style.display = 'none'

}

function ontick(row) {
  //console.log(row);
  var selectedRow = row.parentElement.parentElement;
  var tbody = document.getElementsByTagName('tbody')[0];
  var headerRow = tbody.firstElementChild;
  var table = document.getElementById("myTable");
  var DeleteHeader = document.createElement("th");
  var EditHeader = document.createElement("th");
  DeleteHeader.innerHTML = "DELETE";
  EditHeader.innerHTML = "EDIT";


  if (row.checked == true) {
    selectedRow.style.backgroundColor = "yellow";
    var deleteButton = document.createElement("td");
    deleteButton.innerHTML = "<button id='delete' onClick='onDelete(this)'>Delete</button>";

    var editButton = document.createElement("td");
    editButton.innerHTML = "<button id='edit' onClick='onEdit(this)'>Edit</button>";
    selectedRow.appendChild(editButton);
    selectedRow.appendChild(deleteButton);
    if (headerRow.cells.length < 10) {
      headerRow.appendChild(EditHeader);
      headerRow.appendChild(DeleteHeader);
    }
  }

  else {
    selectedRow.style.backgroundColor = "white";
    selectedRow.deleteCell(8);
    selectedRow.deleteCell(8);

    var totalcells = calculateMaxCells(table);
    if (totalcells <= 8) {
      headerRow.deleteCell(8);
      headerRow.deleteCell(8);

    }
  }

  var flag = isSelected(table);
  var submit = document.getElementById("button");
  //console.log(flag);
  console.log(submit);
  if (flag == true) {
    submit.disabled = false;
    submit.style.backgroundColor = "orange";
  }
  else {
    submit.disabled = true;
    submit.style.backgroundColor = "grey";
  }
}

function calculateMaxCells(table) {
  var maximum = 0;
  for (var i = 1; i < table.rows.length; i++) {
    if (maximum < table.rows[i].cells.length) { maximum = table.rows[i].cells.length }
  }
  //console.log(maximum);
  return maximum;
}

function isSelected(table) {
  var checkboxes = document.getElementsByTagName('input');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) { return true; }
  }
  return false;
}

function saveData(cell) {
  var StudentRows = document.getElementsByName("index");
  var Heading = document.getElementById("Heading");
  var Index = Heading.innerText[Heading.innerText.length - 1];
  var StudentField;

  for (var i = 0; i < StudentRows.length; i++) {
    if (StudentRows[i].innerHTML.split(' ')[1] == Index) {
      StudentField = StudentRows[i];
      break;
    }
  }

  var StudentColumn = document.getElementById("Student").value;
  var TeacherColumn = document.getElementById("Teacher").value;
  var awardStatusColumn = document.getElementById("awardStatus").value;
  var SemesterColumn = document.getElementById("Semester").value;
  var TypeColumn = document.getElementById("Type").value;
  var BudgetColumn = document.getElementById("Budget").value;
  var PercentageColumn = document.getElementById("Percentage").value;
  var TeacherField = StudentField.nextElementSibling;
  var awardField = TeacherField.nextElementSibling;
  var SemesterField = awardField.nextElementSibling;
  var TypeField = SemesterField.nextElementSibling;
  var BudgetField = TypeField.nextElementSibling;
  var PercentageField = BudgetField.nextElementSibling;
  TeacherField.innerHTML = TeacherColumn;
  awardField.innerHTML = awardStatusColumn;
  SemesterField.innerHTML = SemesterColumn;
  TypeField.innerHTML = TypeColumn;
  BudgetField.innerHTML = BudgetColumn;
  PercentageField.innerHTML = PercentageColumn;

  var Message = document.getElementById("message");
  Message.innerHTML = StudentColumn + " data updated successfully";
  hidePopup(this);
}


function onEdit(cell) {
  var table = document.getElementById("editData");
  var Student = cell.parentElement.parentElement.firstElementChild.nextElementSibling;
  var Teacher = Student.nextElementSibling;
  var awardStatus = Teacher.nextElementSibling;
  var Semester = awardStatus.nextElementSibling;
  var Type = Semester.nextElementSibling;
  var Budget = Type.nextElementSibling;
  var Percentage = Budget.nextElementSibling;

  var heading = table.firstElementChild.firstElementChild.firstElementChild;
  var StudentColumn = document.getElementById("Student");
  var TeacherColumn = document.getElementById("Teacher");
  var awardStatusColumn = document.getElementById("awardStatus");
  var SemesterColumn = document.getElementById("Semester");
  var TypeColumn = document.getElementById("Type");
  var BudgetColumn = document.getElementById("Budget");
  var PercentageColumn = document.getElementById("Percentage");

  heading.innerHTML = '<p> Edit Details of  ' + Student.innerHTML + '</p>';
  StudentColumn.value = Student.innerHTML;
  TeacherColumn.value = Teacher.innerHTML;
  awardStatusColumn.value = awardStatus.innerHTML;
  SemesterColumn.value = Semester.innerHTML;
  TypeColumn.value = Type.innerHTML;
  BudgetColumn.value = Budget.innerHTML;
  PercentageColumn.value = Percentage.innerHTML;
  table.style.display = 'block';


}




function hidePopup(row) {
  var table = document.getElementById("editData");
  table.style.display = 'none';

}

function onDelete(selectedRow) {
  var removeRow = selectedRow.parentElement.parentElement;

  document.getElementById("myTable").deleteRow(removeRow.rowIndex);
  alert(removeRow.firstElementChild.nextElementSibling.innerHTML + "  has been deleted");
  var totalcells = calculateMaxCells(document.getElementById("myTable"));

  if (totalcells <= 8) {
    var headerRow = document.getElementsByTagName('tbody')[0].firstElementChild;
    headerRow.deleteCell(8);
    headerRow.deleteCell(8);
  }
}

function addStudent() {
  var table = document.getElementById("myTable");
  var tbody = document.getElementsByTagName('tbody')[0];
  var tdCheckbox = document.createElement("td");
  var tdStudent = document.createElement("td");
  tdStudent.setAttribute("name", "index");
  var tdTeacher = document.createElement("td");
  var tdAward = document.createElement("td");
  var tdSemester = document.createElement("td");
  var tdType = document.createElement("td");
  var tdBudget = document.createElement("td");
  var tdPercentage = document.createElement("td");
  var row1 = document.createElement("tr");
  var row2 = document.createElement("tr");
  var details = document.createElement("td");

  var StudentName = tbody.lastElementChild?.previousElementSibling?.firstElementChild?.nextElementSibling?.innerHTML;
  var index = 0;
  if (StudentName != null)
    index = StudentName.split(' ')[1];

  tdCheckbox.innerHTML = '<input type="checkbox" onclick="ontick(this)"/><br /><br /><img src="down.png" width="25px" onclick="showRow(this)"/></td>';
  tdStudent.innerHTML = "Student " + (parseInt(index) + 1);
  tdTeacher.innerHTML = "Teacher " + (parseInt(index) + 1);
  tdAward.innerHTML = "Approved";
  tdSemester.innerHTML = "Fall";
  tdType.innerHTML = "TA";
  tdBudget.innerHTML = "894834";
  tdPercentage.innerHTML = "100%";
  details.innerHTML = 'Advisor:<br /><br />   Award Details<br />   Summer 1-2014(TA)<br />   Budget Number: <br />   Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />';
  row2.className = "dropDownTextArea"; //taking two clicks
  details.colSpan = "8";

  try {
    row1.appendChild(tdCheckbox);
    row1.appendChild(tdStudent);
    row1.appendChild(tdTeacher);
    row1.appendChild(tdAward);
    row1.appendChild(tdSemester);
    row1.appendChild(tdType);
    row1.appendChild(tdBudget);
    row1.appendChild(tdPercentage);
    row2.appendChild(details);
    tbody.appendChild(row1);
    tbody.appendChild(row2);

    alert(tdStudent.innerHTML + " Record added successfully.")
  }
  catch (e) {
    alert("Error couldn't add a record. Please try again.");
  }



}

