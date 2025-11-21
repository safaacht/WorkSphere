// ============================
//     Modal and its Form
// ============================

// declaration des variables
const ajoutLateral = document.getElementById("ajouter-lateral");
const form = document.getElementById("my-form");
const addExperience = document.querySelector(".ajouter-exp");
const experience = document.getElementById("experience");
const submit = document.getElementById("submit");
const ul = document.getElementById("lateral-ul");
const inputImage = document.getElementById("url-image");
let employees = [];
let employeesAssigned = [];

// saving in localStorage

function saveData() {
  localStorage.setItem("workers", JSON.stringify(employees));
}

// getting back data
employees = JSON.parse(localStorage.getItem("workers")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // declaration des variables
  const image = document.getElementById("url-image").value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;
  const phone = document.getElementById("phone").value.trim();
  const err = document.querySelector(".error");

  // new array to save all the errors
  const erreurs = [];

  // pour afficher les erreurs tous à la fois
  const errooor = document.querySelector("#liste-error");
  errooor.innerHTML = "";

  // declaration du regex
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPhone = /^(?:\+212|0)([5-7]\d{8})$/;

  if (!name) erreurs.push("Invalid name !!");

  if (!email || !regexEmail.test(email)) erreurs.push("Invalid email !!");

  if (role === "--Choose one--") erreurs.push("Invalid role !!");

  if (!phone || !regexPhone.test(phone)) erreurs.push("Invalid phone !!");

  if (!image) erreurs.push("Invalid image !!");

  // experinces
  let newexp = [];
  const newDiv = document.querySelectorAll(".new-div");
  // validation d'experiences

  newDiv.forEach((exp) => {
    const company = document.getElementById("company");
    const rrole = document.getElementById("exp-role");
    const startDate = document.getElementById("from-date");
    const endDate = document.getElementById("to-date");

    if (!company.value.trim()) erreurs.push("Fill company input !!");

    if (!rrole.value.trim()) erreurs.push("Fill role(experience) input !!");

    if (startDate.value > endDate.value)
      erreurs.push(" Dates are not logicale!!");

    // ajt data des experiences
    newexp.push({
      company: company.value.trim(),
      rrol: rrole.value.trim(),
      startDate: startDate.value,
      endDate: endDate.value,
    });
  });

  // affichage des erreurs if y'en a

  if (erreurs.length > 0) {
    errooor.innerHTML = "";

    erreurs.forEach((e) => {
      errooor.innerHTML += `
                                        <li> ${e}</li>
                                        `;
      err.classList.remove("is-hidden");
    });

    return;
  }

  // declaration d'un nouveau obj
  let newEmplye = {
    id: employees.length,
    image: image,
    name: name,
    email: email,
    role: role,
    phone: phone,
    experience: newexp,
    zone: null,
  };

  // affichage des employees

  employees.push(newEmplye);
  saveData();
  renderAll();
  form.reset();
});

addExperience.addEventListener("click", (e) => {
  e.preventDefault();

  const expDiv = document.getElementById("exp-div");
  expDiv.insertAdjacentHTML(
    "beforeend",
    `
    <div class="new-div">
    <label for="Company">Company:</label>
    <input id="company" type="text" placeholder="Company name..." ><br>
    <label for="Role">Role:</label>
    <input id="exp-role" type="text" placeholder="Ur role..." ><br>
    <label for="from">From:</label>
    <input type="date" id="from-date" placeholder="DD/MM/YYYY">
    <label for="to">To:</label>
    <input type="date" id="to-date" placeholder="DD/MM/YYYY"><br>
    </div>
 `
  );
});

ajoutLateral.addEventListener("click", () => {
  const dialogue = document.querySelector(".dialogue");

  dialogue.classList.remove("is-hidden");

  inputImage.addEventListener("change", () => {
    const imagechange = document.getElementById("url-image").value;
    const img = document.getElementById("avatar");
    img.src = imagechange;
  });

  //X button
  const btn = document.querySelector("#sortir");

  btn.addEventListener("click", () => {
    dialogue.classList.add("is-hidden");
  });
});

function renderAll() {
  let zones = [
    "serveurs",
    "securite",
    "personnel",
    "archive",
    "conference",
    "reception",
  ];
  const unassingEmploye = employees.filter((e) => e.zone === null);
  if (unassingEmploye.length > 0) {
    ul.innerHTML = "";
    unassingEmploye.forEach((person) => {
      const myLi = document.createElement("li");
      myLi.className = "lateral-li";
      myLi.setAttribute("id", person.id);

      myLi.innerHTML += `
        ${person.name}<br>
        ${person.role}
        <button class="details-btn">ℹ️</button>
        <img id="lateral-img" src="${person.image}" width="60"/>
     
        `;
      ul.appendChild(myLi);
    });
  }

  zones.forEach((zone) => {
    const divZone = document.querySelector(".container-" + zone);

    const employesZone = employees.filter((em) => em.zone === zone);
    divZone.innerHTML = "";

    employesZone.forEach((e) => {
      divZone.innerHTML += `
            <ul>
                <li>${e.name}</li>
                <li>${e.email}</li>
                <li>${e.role}</li>
            </ul>
            `;
    });
  });
}
// affichage des employees meme si la page est refrechee
document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  detailModel();
});

// ============================
//   Adding workers in zones
// ============================

const butn = document.querySelectorAll(".ajouter-workr");
const zoneDiv = document.querySelectorAll(".empty");
const modal = document.querySelector("#modal-body");
const dilog = document.querySelector(".dialogue-list");
const liste = document.querySelector("#lateral-ul");
const sortir = document.querySelector(".List-sortir");
const recep = document.querySelector(".empty-resp");
const conf = document.querySelector(".empty-conf");
const servr = document.querySelector(".empty-servr");
const secur = document.querySelector(".empty-securty");
const perso = document.querySelector(".empty-perso");
const arch = document.querySelector(".empty-arch");

function showModal(zoneChoisi) {
  const dialg = document.querySelector(".dialogue-list");
  const list = dialg.querySelectorAll(".lateral-li");

  modal.classList.remove("is-hidden");
  dilog.classList.remove("is-hidden");
  modal.innerHTML = "";

  const cloneList = liste.cloneNode(true);
  modal.appendChild(cloneList);

  list.forEach((li) => {
    li.addEventListener("click", (e) => {
      const mySelected = employees.find(
        (employee) => employee.id == li.getAttribute("id")
      );
      mySelected.zone = zoneChoisi;

      // employees.splice(li,1)
      saveData();
      renderAll();
    });
  });
}

// + button
butn.forEach((b) => {
  b.addEventListener("click", (e) => {
    const zoneChoisi = e.currentTarget.dataset.zone;
    showModal(zoneChoisi);
  });
});

sortir.addEventListener("click", () => {
  dilog.classList.add("is-hidden");
});

// ===============================
//   Affichage worker's details
// ===============================

function detailModel() {
  const detail = document.querySelectorAll(".details-btn");
  const btn = document.querySelector(".Details-sortir");
  const dialogue = document.querySelector(".dialogue-details");
  const modl = document.getElementById("modl-details");

  detail.forEach((d) => {
    d.addEventListener("click", (e) => {
        dialogue.classList.remove("is-hidden");
       const li = e.target.closest(".lateral-li");
       const id = li.getAttribute("id");
       const worker = employees.find((w) => w.id == id);
        console.log(worker)


       modl.innerHTML=`
       
        <h2>${worker.name}</h2>
        <img src="${worker.image}" width="80">
        <p> <strong>Email:</strong> ${worker.email}</p>
        <p><strong>Role:</strong> ${worker.role}</p>
        <p><strong>Phone:</strong> ${worker.phone}</p>
        <h2>Experience(s):</h2>
        <ul>
        ${worker.experience.map(
            (exp)=>`
            <li>
            <strong>Company:</strong>${exp.company}<br>
            <strong>Role:</strong>${exp.rrol}<br>
            ${exp.startDate} → ${exp.endDate}
            </li>
            `
        ).join("")}
        </ul>
        <p><strong>Location:</strong> ${worker.zone}</p>
       `
    });
    
  });

  btn.addEventListener("click", () => {
    dialogue.classList.add("is-hidden");
  });
}
