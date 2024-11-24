const btnAlterarSenha = document.querySelector(".btn-alterar-senha");

btnAlterarSenha.addEventListener("click",(e)=>{
    e.preventDefault();

    limpaDivConfig();

    //criando os inputs
    let divInputsSenha = document.createElement("div");
    divInputsSenha.innerHTML = `
        <div class="div-input">
            <label>Senha atual</label>
            <input type="password" name="alterarSenha" id="input-senha-atual">
        <div>
        <div class="div-input">
            <label>Senha nova</label>
            <input type="password" name="alterarSenha" id="input-nova-senha">
        <div>
        <div class="div-input">
            <label>Confirmar senha nova</label>
            <input type="password" name="alterarSenha" id="input-nova-senha-confirmacao">
        <div>
        <button type="button" class="btn-confirmar-alterar-senha">Confirmar alteração</button>
    `;
    divCentral.appendChild(divInputsSenha);
    divInputsSenha.classList.add("div-inputs");

    //criando açao do button confirmar senha
    let btnConfirmarAlterarSenha = document.querySelector(".btn-confirmar-alterar-senha");
    btnConfirmarAlterarSenha.addEventListener("click",(e)=>{
        e.preventDefault();
        
        //pegando valores dos inputs
        let atual = document.querySelector("#input-senha-atual").value;
        let nova = document.querySelector("#input-nova-senha").value;
        let novaConfirmacao = document.querySelector("#input-nova-senha-confirmacao").value;

        //validando inputs
        if(atual == "" || nova == "" || novaConfirmacao == ""){
            alert("Preencha todos os campos!");
            return;
        }
        
        if(nova != novaConfirmacao){
            alert("A confirmação de senha está diferente da nova senha!");
            return;
        }

        //criando um JSON pra mandar pra API
        let senhas = {
            senhaAtual: atual,
            novaSenha: nova,
            novaSenhaConfirmacao: novaConfirmacao
        }
        let jsonSenhas = JSON.stringify(senhas);
    });
});