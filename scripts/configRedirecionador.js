if(sessionStorage.getItem("usuarioLogado") == null){
    alert("Essa página só pode ser acessada com login!");
    location.href = "loja.html";
}