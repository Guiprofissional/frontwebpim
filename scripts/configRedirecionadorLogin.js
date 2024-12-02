if(sessionStorage.getItem("dadosUsuario") != null){
    alert("Você já está logado, faça o logout para acessar o login!");
    location.href = "loja.html";
}