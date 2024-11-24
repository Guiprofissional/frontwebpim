//pegando os elementos html para o cadastro
const btnConfirmar = document.getElementById("btn-confirmar");
const inputNome = document.getElementById("input-nome");
const inputCpf = document.getElementById("input-cpf");
const inputCelular = document.getElementById("input-celular");
const inputEmail = document.getElementById("input-email");
const inputSenha = document.getElementById("input-senha");
const inputConfirmacaoSenha = document.getElementById("input-confirmacao-senha");

//pegando os elementos do modal
const btnFecharModal = document.getElementById("btn-fechar-modal");
const divModal = document.querySelector(".div-modal");
const divFade = document.querySelector(".div-fade");
const inputCodigo = document.getElementById("input-codigo");
const btnEnviar = document.getElementById("btn-enviar");

//colocando classes para iniciar a pagina com o modal escondido
divModal.classList.remove(divModal.getAttribute("class"));
divModal.classList.add("hide");
divFade.classList.remove(divFade.getAttribute("class"));
divFade.classList.add("hide");


//criando uma classe pra guardar os dados do cadastro
class DadosCadastro{
    constructor(nome,cpf,celular,email,senha,confirmacaoSenha){
        this.nome = nome;
        this.cpf = cpf;
        this.celular = celular;
        this.email = email;
        this.senha = senha;
        this.confirmacaoSenha = confirmacaoSenha;
    }
}

btnConfirmar.addEventListener("click",()=>{
    //pegando os valores dos inputs de cadastro
    let nome = inputNome.value;
    let cpf = inputCpf.value;
    let celular = inputCelular.value;
    let email = inputEmail.value;
    let senha = inputSenha.value;
    let confirmacaoSenha = inputConfirmacaoSenha.value;

    //validando as entradas dos dados
    if(nome == "" || cpf == "" || celular == "" || email == "" || senha == "" || confirmacaoSenha == ""){
        alert("Preencha todos os campos do formulário");
        return;
    }

    if(senha != confirmacaoSenha){
        alert("A confirmação de senha não está correta!");
        return;
    }

    //criando o objeto de cadastro com os dados coletados e criando um JSON a partir desse objeto
    let dadosCadastro = new DadosCadastro(nome,cpf,celular,email,senha,confirmacaoSenha);
    let jsonDadosCadastro = JSON.stringify(dadosCadastro);

    //aqui fazer a chamada pra api passando "dadosCadastro" e tratar a resposta


    //criar modal de confirmacao de codigo caso a API responda que email existe
    let respostaApi = true;
    if(respostaApi == true){
        divModal.classList.remove(divModal.getAttribute("class"));
        divModal.classList.add("div-modal");
        divFade.classList.remove(divFade.getAttribute("class"));
        divFade.classList.add("div-fade");

        btnFecharModal.addEventListener("click",(e)=>{
            e.preventDefault();
            //colocando denovo a classe que esconde o modal
            divModal.classList.remove(divModal.getAttribute("class"));
            divModal.classList.add("hide");
            divFade.classList.remove(divFade.getAttribute("class"));
            divFade.classList.add("hide");
        });

        btnEnviar.addEventListener("click",(e)=>{
            e.preventDefault();
            //pegando o valor do input do codigo pra manda pra API
            let codigoDigitado = {
                codigo: inputCodigo.value
            }
            let jsonCodigo = JSON.stringify(codigoDigitado);
        });
    }

    //avisando usuario que cadastrou deu certo e redirecionando a pagina para o login
    //alert("Sucesso no cadastro!");
    //location.href = "login.html";
});