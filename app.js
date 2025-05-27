const divCuadroTexto = document.getElementById("div-cuadro-texto");
const divCuadroIndice = document.getElementById("div-cuadro-indice");
const divResult = document.getElementById("div-result");

window.onload = function() {
    actualizarVistaPrevia();
    const div = document.getElementById(`div-texto1`);
    const rango = document.createRange();
    const sele = window.getSelection();

    rango.selectNodeContents(div);
    rango.collapse(false);

    sele.removeAllRanges();
    sele.addRange(rango);

    div.focus();
};

document.addEventListener("keydown", function(event){
    if(event.key==="Enter"){
        event.preventDefault();
        agregarDivContenedorEdit();
    }
    if (event.key === "Backspace") {
        const sele = document.getSelection();
        const divActual = sele.anchorNode?.nodeType === 3
            ? sele.anchorNode.parentElement.closest('[id^="div-texto"]')
            : sele.anchorNode?.closest?.('[id^="div-texto"]');

        if (divActual && divActual.innerText.trim() === "" && divActual.id !== "div-texto1") {
            event.preventDefault();
            const idNum = parseInt(divActual.id.replace("div-texto", ""));
            const divIndiceEliminar = document.getElementById("div-indice" + idNum);

            divActual.remove();
            divIndiceEliminar?.remove();
            actualizarVistaPrevia();
        }
    }
})

let punto = 0;

divCuadroTexto.addEventListener("input", function () {
  const sele = document.getSelection();
  const anchorNode = sele.anchorNode;
  const divActual = anchorNode?.nodeType === 3
    ? anchorNode.parentElement.closest('[id^="div-texto"]')
    : anchorNode.closest?.('[id^="div-texto"]');

    // if (divActual) {
    //     console.log("Editando:", divActual.id, " | Altura:", divActual.offsetHeight + "px");
    // }
    let cantidad = divActual.offsetHeight/24;
    if(cantidad>1 && cantidad !== punto){
        divCuadroIndice.innerHTML += `
                            <div><br></div>
        `
        punto = cantidad;
    }
    actualizarVistaPrevia();
});



let indice = 2;

function agregarDivContenedorEdit() {
    divCuadroIndice.innerHTML += `
                           <div class="h-6 bg-gray-200 text-right select-none text-gray-500 border-r border-gray-300 flex justify-center" contenteditable="false" id="div-indice${indice}">${indice}</div>
        `;
    divCuadroTexto.innerHTML += `
                           <div class="flex-1 px-2 outline-none whitespace-pre-wrap overflow-y-auto"  id="div-texto${indice}"> </div>
        `;
    const div = document.getElementById(`div-texto${indice}`);
    div.innerText.trim();
    const rango = document.createRange();
    const sele = window.getSelection();

    rango.setStart(div, 0);
    rango.collapse(true);

    sele.removeAllRanges();
    sele.addRange(rango);

    div.focus();
    indice++;
    punto=0;
}

function actualizarVistaPrevia() {
    const divTexto = divCuadroTexto.querySelectorAll('[id^="div-texto"]');
    divResult.innerHTML = ""; // Limpiar

    divTexto.forEach(div => {
        const texto = div.innerText.trim();
        let elemento;   
        let hr;
        if (texto.startsWith("##### ")) {
            div.className = "flex-1 px-2 text-blue-700 outline-none whitespace-pre-wrap overflow-y-auto";
            elemento = document.createElement("h5");
            elemento.textContent = texto.replace("##### ", "");
            elemento.className = "text-2xl";
        }
        else if (texto.startsWith("#### ")) {
            div.className = "flex-1 px-2 text-blue-700 outline-none whitespace-pre-wrap overflow-y-auto";
            elemento = document.createElement("h4");
            elemento.textContent = texto.replace("#### ", "");
            elemento.className = "text-3xl";
        }
        else if (texto.startsWith("### ")) {
            div.className = "flex-1 px-2 text-blue-700 outline-none whitespace-pre-wrap overflow-y-auto";
            elemento = document.createElement("h3");
            elemento.textContent = texto.replace("### ", "");
            elemento.className = "text-4xl";
        } 
        else if (texto.startsWith("## ")) {
            div.className = "flex-1 px-2 text-blue-700 outline-none whitespace-pre-wrap overflow-y-auto";
            elemento = document.createElement("h2");
            hr = document.createElement("hr");
            hr.className = "mt-3";
            elemento.textContent = texto.replace("## ", "");
            elemento.className = "text-5xl";
        } 
        else if (texto.startsWith("# ")) {
            div.className = "flex-1 px-2 text-blue-700 outline-none whitespace-pre-wrap overflow-y-auto";
            elemento = document.createElement("h1");
            hr = document.createElement("hr");
            hr.className = "mt-3";
            elemento.textContent = texto.replace("# ", "");
            elemento.className = "text-6xl";
        }
        else if (texto.startsWith("- ")) {
            elemento = document.createElement("ul");
            const li = document.createElement("li");
            li.className = "list-disc ml-5";
            li.textContent = texto.replace("- ", "");
            elemento.appendChild(li);
        }
        else if (texto.startsWith("")) {
            div.className = "flex-1 text-black px-2 outline-none whitespace-pre-wrap overflow-y-auto"
            elemento = document.createElement("p");
            elemento.textContent = texto;
        }
        
        if(hr!==undefined){
            divResult.appendChild(elemento);
            divResult.appendChild(hr);
        }
        else{
            divResult.appendChild(elemento);
        }
    });
}