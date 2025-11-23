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

  // clearing the lateral list
  ul.innerHTML = "";

  if (unassingEmploye.length > 0) {
    unassingEmploye.forEach((person) => {
      const myLi = document.createElement("li");
      myLi.className = "lateral-li";
      myLi.setAttribute("id", person.id);

      myLi.innerHTML += `
        ${person.name}<br>
        ${person.role}
        <button class="details-btn" data-id="${person.id}">ℹ️</button>
        <img class="lateral-img" src="${person.image}" width="60"/>
        `;
      ul.appendChild(myLi);
    });
  }

  zones.forEach((zone) => {
    const divZone = document.querySelector(".container-" + zone);
    const parentZoneDiv = document.getElementById(zone);

    if (divZone) {
      const employesZone = employees.filter((em) => em.zone === zone);
      divZone.innerHTML = "";

      // changing the zones's color except conference and personel
      const safeZones = ["conference", "personnel"];

      if (employesZone.length === 0 && !safeZones.includes(zone)) {
        parentZoneDiv.style.backgroundColor = "rgba(255, 99, 71, 0.4)";
      } else {
        parentZoneDiv.style.backgroundColor = "";
      }

      employesZone.forEach((e) => {
        divZone.innerHTML += `
                <ul class="zone-ul">
                <li class="zone-li"><strong>${e.name}</strong></li>
                <li class="zone-li">${e.role}</li>
                <div style="display:flex; justify-content:center; gap:5px; margin-top:5px;">
                    <button class="details-btn" data-id="${e.id}">ℹ️</button>
                    <button class="delete" data-id="${e.id}">X</button>
                </div>
                </ul>
                `;
      });
    }
  });

  dynamicEvents();
}

// ============================
//    Delete & Detail  
// ============================
function dynamicEvents() {
  // button delete
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const emp = employees.find((w) => w.id == id);

      if (emp) {
        emp.zone = null; // to send back to unassigned
        saveData();
        renderAll(); 
      }
    });
  });

  // button detail
  const detailButtons = document.querySelectorAll(".details-btn");
  detailButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      showDetailsModal(id);
    });
  });
}

// ============================
//    Adding workers in zones
// ============================

const butn = document.querySelectorAll(".ajouter-workr");
const modal = document.querySelector("#modal-body");
const dilog = document.querySelector(".dialogue-list");
const sortir = document.querySelector(".List-sortir");

// capacité max de chaque zone
const ZONE_LIMITS = {
    "conference": 2,
    "serveurs": 2,
    "personnel": 2,
    "securite": 2,
    "reception": 4,
    "archive": 1,
    
};

// + button & condition limite par zone
butn.forEach((b) => {
    b.addEventListener("click", (e) => {
    const zoneChoisi = e.currentTarget.dataset.zone;

    // counting the number of employees in the zone
    const currentEmployees = employees.filter(emp => emp.zone === zoneChoisi).length;
    
    //  recuperation des limites 
    const limit = ZONE_LIMITS[zoneChoisi] ;

    if (currentEmployees >= limit) {

        alert(`Zone ${zoneChoisi} is full ! (Max: ${limit} employee)`);
        return; 
    }

    // showing the modal if the zone didn't attend its limite
    showModal(zoneChoisi);
  });
});


function showModal(zoneChoisi) {
  modal.classList.remove("is-hidden");
  dilog.classList.remove("is-hidden");
  modal.innerHTML = "";


  const validEmployees = employees.filter( (e) => e.zone === null );

  const tempUl = document.createElement("ul");

  validEmployees.forEach((person) => {
    const li = document.createElement("li");
    li.className = "lateral-li";
    li.setAttribute("id", person.id);
    li.style.cursor = "pointer";
    li.style.border = "1px solid #333";
    li.style.margin = "5px";
    li.style.padding = "5px";
    li.innerHTML = `${person.name} - <strong>${person.role}</strong>`;

    // selecting by click 
    li.addEventListener("click", () => {
      person.zone = zoneChoisi;
      saveData();
      renderAll();
      dilog.classList.add("is-hidden"); // closing the  modal after selection
    });

    tempUl.appendChild(li);
  });

  modal.appendChild(tempUl);
}

sortir.addEventListener("click", () => {
  dilog.classList.add("is-hidden");
});

// ===============================
//    Affichage worker's details
// ===============================

function showDetailsModal(id) {
  const dialogue = document.querySelector(".dialogue-details");
  const modl = document.getElementById("modl-details");
  const btn = document.querySelector(".Details-sortir");

  const worker = employees.find((w) => w.id == id);

  if (!worker) return;

  dialogue.classList.remove("is-hidden");

  modl.innerHTML = `
    <div style="text-align:center">
        <h2>${worker.name}</h2>
        <img src="${
          worker.image
        }" width="80" style="border-radius:50%; margin:10px 0;">
    </div>
    <p> <strong>Email:</strong> ${worker.email}</p>
    <p><strong>Role:</strong> ${worker.role}</p>
    <p><strong>Phone:</strong> ${worker.phone}</p>
    <hr>
    <h3>Experience(s):</h3>
    <ul>
    ${worker.experience
      .map(
        (exp) => `
        <li>
        <strong>Company:</strong> ${exp.company}<br>
        <strong>Role:</strong> ${exp.rrol}<br>
        ${exp.startDate} → ${exp.endDate}
        </li>
        `
      )
      .join("")}
    </ul>
    <p><strong>Location:</strong> ${
      worker.zone ? worker.zone : "Unassigned"
    }</p>
   `;

  btn.addEventListener("click", () => {
    dialogue.classList.add("is-hidden");
  });
}

// page load
document.addEventListener("DOMContentLoaded", () => {
  renderAll();
});
