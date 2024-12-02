if(sessionStorage.getItem("dadosUsuario") == null){
    alert("Essa página só pode ser acessada com login!");
    location.href = "login.html";
}