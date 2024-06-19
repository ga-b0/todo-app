const iconTheme = document.querySelector(".hero__img");
const iconSun = "images/icon-sun.svg";
const iconMoon = "images/icon-moon.svg";
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const listTask = document.querySelector(".list-tasks");
const iconCross = "images/icon-cross.svg";
const deleteTask = document.querySelector(".cross");
const markTask = document.querySelector(".circle");
const iconCheck = "images/icon-check.svg";
const items = document.querySelector(".items");
const all = document.querySelector(".all-option");
const active = document.querySelector(".active-option");
const completed = document.querySelector(".completed-option");
const draggables = document.querySelectorAll(".draggable");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        console.log("drag start");
    })
});

let itemsLeft = [];
let itemsCompleted = [];
let filter = [all, active, completed];
items.textContent = `${itemsLeft.length} items left`;

all.style.color = "var(--bright-blue)";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevaTarea = input.value;
    if(nuevaTarea){
        agregarTarea(nuevaTarea);
    } else {
        alert("Debes agregar un texto al input");
    }
    form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
    const switcherTheme = document.querySelector(".hero__picture");
    const root = document.documentElement;

    switcherTheme.addEventListener("click", toggleTheme);

    function toggleTheme(){
        const setTheme = switcherTheme.classList.contains("dark") ? "light" : "dark";

        switcherTheme.classList.toggle("dark");
    
        root.setAttribute("data-theme", setTheme);

        if(switcherTheme.classList.contains("dark")){
            iconTheme.setAttribute("src", iconSun);
        } else {
            iconTheme.setAttribute("src", iconMoon);
        }

        localStorage.setItem("theme", setTheme);
    }

});

completed.addEventListener("click", ordernarTareas);
all.addEventListener("click", ordernarTareas);
active.addEventListener("click", ordernarTareas);

function agregarTarea(tarea){
    const div = document.createElement("div");
    div.classList.add("list-item");

    const divText = document.createElement("div");
    divText.classList.add("list-item-texts");
    div.prepend(divText);

    const figure = document.createElement("div");
    figure.classList.add("circle");
    figure.addEventListener("click", marcarTarea);
    divText.prepend(figure);

    const paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.innerText = tarea;
    divText.append(paragraph);

    const cross = document.createElement("img");
    cross.classList.add("cross");
    cross.setAttribute("src", iconCross);
    cross.addEventListener("click", removerTarea);
    div.append(cross);

    listTask.prepend(div);
    div.classList.add("left");
    const token = generarTokenTarea();
    div.setAttribute("data-id", token);
    itemsLeft.push(div);
    items.textContent = `${itemsLeft.length} items left`;
}

function removerTarea(e){
    const elemento = e.target.parentNode;
    const validate = e.target.parentNode.firstElementChild.firstElementChild;
    if(validate.classList.contains("finish")){
        elemento.remove();
    } else {
        elemento.remove();
        const includeItem = itemsLeft.indexOf(elemento);
        itemsLeft.splice(includeItem, 1);
    }
    items.textContent = `${itemsLeft.length} items left`;
}

function marcarTarea(e){
    const element = e.target;
    const paragraph = element.nextElementSibling;
    const image = document.createElement("img");
    const padre = element.parentNode.parentNode;
    if(element.classList.contains("finish")){
        element.classList.remove("finish");
        paragraph.classList.remove("text-finish");
        element.firstElementChild.remove();
        itemsLeft.push(padre);
        items.textContent = `${itemsLeft.length} items left`;
    } else {
        element.classList.add("finish");
        image.classList.add("check");
        image.setAttribute("src", iconCheck);
        element.append(image); 
        paragraph.classList.add("text-finish");
        const includeItem = itemsLeft.indexOf(padre);
        itemsLeft.splice(includeItem, 1);
        itemsCompleted.push(padre);
        items.textContent = `${itemsLeft.length} items left`;
    }
}

function generarTokenTarea(){
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let id = '';
    for (let i = 0; i < 5; i++) {
        let caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        id += caracterAleatorio;
    }
    return id;
}

function ordernarTareas(e){
    const accion = e.target.getAttribute("class");
    const newList = listTask;
    if(accion === "completed-option"){
        itemsLeft.forEach((elemento) => {
            elemento.classList.add("ocultar");
        });
        itemsCompleted.forEach((elemento) => {
            elemento.classList.remove("ocultar");
        });
        completed.style.color = "var(--bright-blue)";
        all.style.color = "var(--stadistics)";
        active.style.color = "var(--stadistics)";
    } else if (accion === "active-option"){
        itemsLeft.forEach((elemento) => {
            elemento.classList.remove("ocultar");
        });
        itemsCompleted.forEach((elemento) => {
            elemento.classList.add("ocultar");
        })
        active.style.color = "var(--bright-blue)";
        all.style.color = "var(--stadistics)";
        completed.style.color = "var(--stadistics)";
    }
    else {
        itemsLeft.forEach((elemento) => {
            elemento.classList.remove("ocultar");
        });
        itemsCompleted.forEach((elemento) => {
            elemento.classList.remove("ocultar");
        });
        all.style.color = "var(--bright-blue)";
        completed.style.color = "var(--stadistics)";
        active.style.color = "var(--stadistics)";
    }
}

