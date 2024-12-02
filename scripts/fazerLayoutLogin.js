//fazer layout da loja com usuario logado caso houver logado
if(sessionStorage.getItem("dadosUsuario") != null){
    let nomeUsuario = JSON.parse(sessionStorage.getItem("dadosUsuario")).name;
    
    let divUsuario = document.querySelector(".div-nav-direita-usuario");
    let a = divUsuario.querySelector("a");
    divUsuario.removeChild(a);

    let pNomeUsuario = document.createElement("p");
    pNomeUsuario.classList.add("p-nome-usuario");
    divUsuario.appendChild(pNomeUsuario);
    //tirando exibiçao do sobrenome
    pNomeUsuario.innerHTML = "Bem-vindo<br>" + nomeUsuario.substring(0,nomeUsuario.indexOf(" "));

    let imgUsuario = document.createElement("img");
    imgUsuario.setAttribute("src","imgs/usuario-icone.svg");
    imgUsuario.classList.add("img-usuario");
    divUsuario.appendChild(imgUsuario);

    let divConfigESuporte = document.createElement("div");
    divConfigESuporte.classList.add("div-config-suporte");
    divUsuario.appendChild(divConfigESuporte);

    let aConfig = document.createElement("a");
    let aSuporte = document.createElement("a");
    divConfigESuporte.appendChild(aConfig);
    divConfigESuporte.appendChild(aSuporte);

    let imgConfig = document.createElement("img");
    let imgSuporte = document.createElement("img");
    imgConfig.setAttribute("src","imgs/configuracoes-icone.svg");
    imgSuporte.setAttribute("src","imgs/suporte-icone.svg");
    imgConfig.classList.add("img-config");
    imgSuporte.classList.add("img-suporte");

    aConfig.appendChild(imgConfig);
    aSuporte.appendChild(imgSuporte);

    aConfig.setAttribute("href","config.html");
    aSuporte.setAttribute("href","suporte.html");

    divUsuario.classList.remove("div-nav-direita-usuario");
    divUsuario.classList.add("div-nav-direita-usuario-logado");
}