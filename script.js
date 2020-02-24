let studentList = document.querySelector("#studentList");
let getName = document.querySelector("#name");
let getAge = document.querySelector("#age");
let getTurno = document.querySelector("#turno");
let inputFilter = document.querySelector("#filter");
let students = JSON.parse(localStorage.getItem("student_list"));
let saveStudent = document.querySelector("#save");

// let createLocalStorage = [{name: "Rodolfo", age: 30, turno: "noturno"}];
// localStorage.setItem("student_list", JSON.stringify(createLocalStorage));

const hasData = () => {
  if(students.length >= 1) {
    document.querySelector("#message").style.display = "none";
  } else {
    document.querySelector("#message").style.display = "block";
  }
}

const renderStudentList = (data) => {
  studentList.innerHTML = "";
  let students = data;
  for(student of students) {
    let markup = `
      <div class="student">
        <span class="name">${student.name}</span>
        <span class="age">${student.age} anos</span>
        <span class="turno">${student.turno}</span>
        <a class="delete" href="#">Excluir</a>
        <hr>
      </div>
    `;
    studentList.insertAdjacentHTML("beforeend", markup);
  }
  hasData();
}

const addStudent = () => {
  let name = getName.value;
  let age = parseFloat(getAge.value);
  let turno = getTurno.value;

  if (name && age && turno) {
    students.push({name, age, turno});
  
    getName.value = "";
    getAge.value = "";
    getTurno.value = "";
    // elements.forEach(element => {
    //   element.style.borderColor = "initial";
    // });
    getName.style.borderColor = "initial";
    getAge.style.borderColor = "initial";
    getTurno.style.borderColor = "initial";

    localStorage.setItem("student_list", JSON.stringify(students));

    let newStudentList = JSON.parse(localStorage.getItem("student_list"));;
    renderStudentList(newStudentList);
  } else {
    getName.style.borderColor = "red";
    getAge.style.borderColor = "red";
    getTurno.style.borderColor = "red";
  }
};

const filter = () => {
  let inputFilterValue = inputFilter.value.toUpperCase();
  const search = students.filter((student) => {
    return student.name.toUpperCase().indexOf(inputFilterValue) > -1;
  });
  let dataFilter;
  if(search) {
    dataFilter = search;
    renderStudentList(dataFilter);
  } else if(search.length === 0) {
    dataFilter = [];
    renderStudentList(dataFilter);
  } else {
    dataFilter = JSON.parse(localStorage.getItem("student_list"));
  }
};

const deleteStudent = (el) => {
  students = JSON.parse(localStorage.getItem("student_list"));
  let studentFilter, targetElementParent, studentName;

  if(el.target.classList.contains("delete")) {
    targetElementParent = el.target.parentElement;
    studentName = targetElementParent.querySelector(".name").innerText;
    
    studentFilter = students.filter((student) => {
      return student.name != studentName;
    });
  }
  
  localStorage.setItem("student_list", JSON.stringify(studentFilter));

  students = studentFilter;
  let newStudentList = JSON.parse(localStorage.getItem("student_list"));
  renderStudentList(newStudentList);
}

inputFilter.onkeyup = filter;
studentList.onclick = deleteStudent;
saveStudent.onclick = addStudent;

renderStudentList(students);