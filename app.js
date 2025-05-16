const divEditor = document.getElementById("editor");
const divResult = document.getElementById("result");

document.addEventListener("DOMContentLoaded", function () {
    agregarDivContenedor();
});

document.addEventListener("keydown", function(event){
    if(event.key==="Enter"){
        agregarDivContenedor();
    }
})

let indice = 1;

function agregarDivContenedor(){

    divEditor.innerHTML += `
                            <div class="flex" id="hojaEdicion${indice}">
                                <div class="w-[5%] h-7 border border-black flex justify-center items-center" id="div-indice${indice}">
                                    <p class="text-blue-700 text-xs" id="div-indice-text${indice}">${indice}</p>
                                </div>
                                <div class="w-[95%] h-auto border border-black" id="div-texto${indice}">
                                    <p><span contenteditable="true" class="h-1 inline-block px-1 outline-none"></span></p>
                                </div>
                            </div>

    `
    
    indice++;
}