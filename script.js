// ============================
//     Modal and its Form
// ============================

// declaration des variables
const ajout=document.getElementById("ajouter-lateral");
const form=document.getElementById("my-form");
const addExperience=document.querySelector(".ajouter-exp");
const experience=document.getElementById("experience")
const submit=document.getElementById("submit");
const ul=document.getElementById("lateral-ul");
const inputImage = document.getElementById("url-image")


let employees = []

// saving in localStorage

function saveData(){
    localStorage.setItem("workers",JSON.stringify(employees))
}




form.addEventListener("submit",(e)=>{
    e.preventDefault();

    // declaration des variables
    const image=document.getElementById("url-image").value.trim();
    const name=document.getElementById("name").value.trim();
    const email=document.getElementById("email").value.trim();
    const role=document.getElementById("role").value;
    const phone=document.getElementById("phone").value.trim();
    const err=document.querySelector(".error")
    

    // new array to save all the errors
    const erreurs =[]
    
    // pour afficher les erreurs tous à la fois
    const errooor = document.querySelector("#liste-error");
    errooor.innerHTML="";




    // declaration du regex
    const regexEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPhone=/^(?:\+212|0)([5-7]\d{8})$/;





    
    if(!name){
        erreurs.push("Invalid name !!") 

    }
    if(!email || !regexEmail.test(email)){
        erreurs.push("Invalid email !!") 

    }

    if (role === "--Choose one--") {
        erreurs.push("Invalid role !!");
    }

    if(!phone|| !regexPhone.test(phone)){
        erreurs.push("Invalid phone !!") 

    }
    
    
    if(!image){
        erreurs.push("Invalid image !!") 
    }


    // experinces
    let newexp = []
    const newDiv=document.querySelectorAll(".new-div");
    // validation d'experiences

    newDiv.forEach(exp=>{

    const company=document.getElementById("company");
    const rrole=document.getElementById("exp-role");
    const startDate=document.getElementById("from-date");
    const endDate=document.getElementById("to-date");
    

    if(!company.value.trim()){
        erreurs.push("Fill company input !!") 

    }

    if(!rrole.value.trim()){
        erreurs.push("Fill role(experience) input !!") 

    }    

    if(startDate.value>endDate.value){
        erreurs.push(" Dates are not logicale!!")         
    }

    // ajt data des experiences
    newexp.push({company:company.value.trim(),rrol:rrole.value.trim(),startDate:startDate.value,endDate:endDate.value})
    })



    // affichage des erreurs if y'en a 

    if(erreurs.length>0){
        errooor.innerHTML="";

        erreurs.forEach(e=>{
            errooor.innerHTML+=`
        <li> ${e}</li>
        `
        err.classList.remove("is-hidden")
        
        })
        
       return; 
    }


// declaration d'un nouveau obj
      let newEmplye ={
        id:employees.length+1,
        image:image,
        name:name,
        email:email,
        role:role,
        phone:phone,
        experience : newexp,
        zone: null
    }


    // affichage des employees

    employees.push(newEmplye);
    saveData();
    affichageEmployee();
    form.reset();
    
    
})

ajout.addEventListener("click",()=>{
    const dialogue=document.querySelector(".dialogue");

    dialogue.classList.remove('is-hidden');

    inputImage.addEventListener("change",()=>{
        const imagechange=document.getElementById("url-image").value;    
        const img = document.getElementById("avatar");
        img.src = imagechange;

    })

    // 
const btn=document.querySelector("#sortir");

btn.addEventListener("click",()=>{
        dialogue.classList.add('is-hidden');
    })

});


addExperience.addEventListener("click",(e)=>{
     e.preventDefault();

    const expDiv=document.getElementById("exp-div");
    expDiv.insertAdjacentHTML("beforeend",`
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
 `)
 
    
})



function affichageEmployee(){
    ul.innerHTML = ""
const worker=JSON.parse(localStorage.getItem("workers"));
worker.forEach(person=>{
    const myLi=document.createElement("li");
    myLi.className ="lateral-li"
    myLi.innerHTML+=`
    ${person.name}
    ${person.role}
    <img id="lateral-img" src="${person.image}" width="60"/>
 
    `
    ul.appendChild(myLi )

})
}

// affichage des employees meme si la page est refrechee
document.addEventListener("DOMContentLoaded", () => {
    affichageEmployee();
});



    // ============================
    //   Adding workers in zones
    // ============================

    const butn=document.querySelectorAll(".ajouter-workr");
    const zoneDiv=document.querySelectorAll(".empty");
    const modal=document.querySelector("#modal-body");
    const dilog=document.querySelector(".dialogue-list");
    const liste=document.querySelector("#lateral-ul")
    const sortir=document.querySelector(".List-sortir");

function showModal(){
        modal.classList.remove("is-hidden");
        dilog.classList.remove("is-hidden");

        const cloneList = liste.cloneNode(true)     
        modal.appendChild(cloneList)

    }

butn.forEach((b)=>{
        b.addEventListener("click",()=>{
         showModal() 
    })
    })

sortir.addEventListener("click",()=>{
    dilog.classList.add("is-hidden");
})


    // ===============================
    //   Affichage worker's details
    // ===============================

