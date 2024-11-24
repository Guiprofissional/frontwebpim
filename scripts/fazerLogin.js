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

/*async function pegaDados(){
    let resposta = await fetch(endpoint).then((res)=>res.json()).catch((res)=>res="Api nao achou");
    console.log(resposta);
}*/

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
    let jsonDadosLogin = JSON.stringify(dadosLogin);

    /*async function fazerLoginApi(){
        let res = await fetch(endpointLogin,{
            method:"POST",
            body:JSON.stringify(dadosLogin),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .catch((error)=>alert(error))
        console.log(res);
    }*/
    async function fazerLoginApi(){
        await axios.post(endpointLogin,dadosLogin).then((res)=>console.log(res.data));
    }
    

    fazerLoginApi();
    //verificar se autenticação falhou
    /*usuarioLogado = {
        id:1,
        nome:"Usuário",
        cpf:3364664,
        email:"gui@kgkglgl",
        senha:3232,
        celular:3323155212,        
        isAdm: true
    }
    sessionStorage.setItem("usuarioLogado",JSON.stringify(usuarioLogado));

    location.href = "loja.html";*/
});
