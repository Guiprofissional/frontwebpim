//pegando os elementos html
const pRecuperarSenha = document.getElementById("p-recuperar-senha");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const divModal = document.querySelector(".div-modal");
const divFade = document.querySelector(".div-fade");
const inputEmailRecuperacao = document.getElementById("input-email-recuperacao");
const btnEnviar = document.getElementById("btn-enviar");
const label = document.querySelector(".label-email-recuperacao");
const p = document.querySelector(".p-recuperacao");

//colocando classes para esconder o modal
divModal.classList.remove(divModal.getAttribute("class"));
divModal.classList.add("hide");
divFade.classList.remove(divFade.getAttribute("class"));
divFade.classList.add("hide");

let etapaModal = 1;

function enviarNovaSenha(){
    let novaSenhaRecuperada = inputEmailRecuperacao.value;
    //validando nova senha
    if(novaSenhaRecuperada == ""){
        alert("Digite a nova senha!");
        return;
    }
    console.clear();
    console.log("senha nova digitada: ");
    alert("Senha alterada com sucesso!");
    etapaModal = 1;
    location.href = "login.html";
}

function enviarCodigo(){
    let codigoRecuperado = inputEmailRecuperacao.value;
    if(codigoRecuperado == ""){
        alert("Digite o código!");
        return;
    }
    etapaModal = 3;
    p.innerHTML = "Agora digite sua nova senha!";
    label.innerHTML = "Senha:";
    inputEmailRecuperacao.value = "";
    inputEmailRecuperacao.setAttribute("type","password");



    console.clear();
    console.log("codigo digitado: ");

    //se codigo for certo
    btnEnviar.removeEventListener("click",enviarCodigo);
    btnEnviar.addEventListener("click", enviarNovaSenha);
}

function enviarEmail(){
    let emailRecuperado = inputEmailRecuperacao.value;
    if(emailRecuperado == ""){
        alert("Digite seu email!");
        return;
    }
    
    etapaModal = 2;
    p.innerHTML = "Enviamos um código de verificação para seu email, por favor nos informe!";
    label.innerHTML = "Código:";
    //pegando o valor do input de recuperaçao do email
    
    inputEmailRecuperacao.value = "";
    inputEmailRecuperacao.setAttribute("type","text/number");
    //verificar se email existe
    console.clear();
    console.log("email digitado: " );

    //se email exitir
    btnEnviar.removeEventListener("click",enviarEmail);
    btnEnviar.addEventListener("click", enviarCodigo);
}

pRecuperarSenha.addEventListener("click",function abrirModal(){
    //tirando a classe que esconde o modal
    divModal.classList.remove(divModal.getAttribute("class"));
    divModal.classList.add("div-modal");
    divFade.classList.remove(divFade.getAttribute("class"));
    divFade.classList.add("div-fade");
});

btnEnviar.addEventListener("click",enviarEmail);

btnFecharModal.addEventListener("click",function fecharModal(){
    //resetando e colocando denovo a classe que esconde o modal
    divModal.classList.remove(divModal.getAttribute("class"));
    divModal.classList.add("hide");
    divFade.classList.remove(divFade.getAttribute("class"));
    divFade.classList.add("hide");
    p.innerHTML = "Olá, para prosseguir com a recuperação precisamos que <br>nos informe seu email cadastrado!";
    label.innerHTML = "Email:";
    inputEmailRecuperacao.setAttribute("type","text/number");
    inputEmailRecuperacao.value = "";

    if(etapaModal == 2 ){
        btnEnviar.removeEventListener("click",enviarCodigo);
        btnEnviar.addEventListener("click",enviarEmail);
        etapaModal = 1;
    }
    if(etapaModal == 3){
        btnEnviar.removeEventListener("click",enviarNovaSenha);
        btnEnviar.addEventListener("click",enviarEmail);
        etapaModal = 1;
    }
});
