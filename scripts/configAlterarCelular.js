const btnAlterarCelular = document.querySelector(".btn-alterar-celular");

//pegando os elementos do modal
const btnFecharModal = document.getElementById("btn-fechar-modal");
const divModal = document.querySelector(".div-modal");
const divFade = document.querySelector(".div-fade");
const inputCodigo = document.getElementById("input-codigo-modal");
const btnEnviar = document.getElementById("btn-enviar");

//escondendo o modal ao carregar a pagina
divModal.classList.remove(divModal.getAttribute("class"));
divModal.classList.add("hide");
divFade.classList.remove(divFade.getAttribute("class"));
divFade.classList.add("hide");

function enviar(){
    //validando codigo
    if(inputCodigo.value == ""){
        alert("Preencha o campo!");
        console.log("Preencha o campo!");
        return;
    }

    //pegando o valor do input do codigo pra manda pra API
    let codigoDigitado = {
        codigo: inputCodigo.value
    }
    let jsonCodigo = JSON.stringify(codigoDigitado);
}

btnAlterarCelular.addEventListener("click",(e)=>{
    e.preventDefault();

    limpaDivConfig();

    //criando input novo celular
    let divAltCelular = document.createElement("div");
    divAltCelular.innerHTML = `
        <div class="div-input">
            <label>Digite o novo celular</label>
            <input type="text/number" name="alterarSenha" id="input-novo-celular">
        <div>
        <button type="button" class="btn-confirmar-alterar-celular">Confirmar alteração</button>
    `;
    divCentral.appendChild(divAltCelular);
    divAltCelular.classList.add("div-alt-celular");

    //criando açao do botao "confirmar alteraçao"
    let btnConfirmarAltCelular = document.querySelector(".btn-confirmar-alterar-celular");

    btnConfirmarAltCelular.addEventListener("click",function abrirModal(){
        //validando input novo numero
        let inputNovoCelular = document.querySelector("#input-novo-celular");
        if(inputNovoCelular.value.length != 11){
            alert("Digite o celular corretamente!");
            return;
        }

        //tirando a classe que esconde o modal
        divModal.classList.remove(divModal.getAttribute("class"));
        divModal.classList.add("div-modal");
        divFade.classList.remove(divFade.getAttribute("class"));
        divFade.classList.add("div-fade");
        
        //criando açao do btnEnviar
        btnEnviar.addEventListener("click",enviar);
    });
});

btnFecharModal.addEventListener("click",function fecharModal(){
    //colocando denovo a classe que esconde o modal
    divModal.classList.remove(divModal.getAttribute("class"));
    divModal.classList.add("hide");
    divFade.classList.remove(divFade.getAttribute("class"));
    divFade.classList.add("hide");

    //tirando a acao do btnEnviar para nao haver erro de duplicaçao de eventlistener
    btnEnviar.removeEventListener("click",enviar);
});