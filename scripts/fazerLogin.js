//pegando os elemento html
const btnEntrar = document.getElementById("btn-entrar");
const inputEmail = document.getElementById("input-email");
const inputSenha = document.getElementById("input-senha");
let usuarioLogado = sessionStorage.getItem("usuarioLogado");

//classe so com dados do email e senha do usuario
class DadosLogin {
    constructor(email,senha){
        this.email = email;
        this.senha = senha;
    }
}

btnEntrar.addEventListener("click",()=>{
    //pegando valores dos inputs
    let email = inputEmail.value;
    let senha = inputSenha.value;

    //validando inputs
    if(email == "" || senha == ""){
        alert("Preencha os campos com email e senha!");
        return;
    }

    //criando o objeto com dados para login e criando um JSON a partir desse objeto
    let dadosLogin = new DadosLogin(email,senha);

    async function fazerLoginApi(){
        await axios.post(endpointLogin,dadosLogin)
        .then((res) => {
            sessionStorage.setItem("dadosUsuario",JSON.stringify(res.data));
            location.href = "loja.html";
        })
        .catch(() => alert("Email e/ou senha inválidos!"));
    }
    
    fazerLoginApi();

});
