const aLogout = document.querySelector(".a-logout");

aLogout.addEventListener("click",(e)=>{
    e.preventDefault();
    sessionStorage.removeItem("dadosUsuario");
    location.href = "login.html";
})