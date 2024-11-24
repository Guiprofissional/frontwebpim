const aLogout = document.querySelector(".a-logout");

aLogout.addEventListener("click",(e)=>{
    e.preventDefault();
    sessionStorage.removeItem("usuarioLogado");
    location.href = "loja.html";
})