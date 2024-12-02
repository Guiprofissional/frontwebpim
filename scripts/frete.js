let listaDoCarrinho = JSON.parse(sessionStorage.getItem("listaDoCarrinho"));
let cliente = JSON.parse(sessionStorage.getItem("dadosUsuario"));
let tipoDePagamento = sessionStorage.getItem("tipoDePagamento");

//forçando o pedido a ter no minimo 1 produto
if(listaDoCarrinho == null){
    alert("Você tem de adicionar ao menos 1 produto!");
    location.href = "loja.html";
}

//forçando o pedido a ter um modo de pagamento
if(tipoDePagamento == null){
    alert("Você precisa selecionar um modo de pagamento!");
    location.href = "carrinho.html";
}

function calcTotalProdutos(listaDeProdutos){
    let total = 0;
    for(let i = 0; i < listaDeProdutos.length; i++){
        total+= (listaDeProdutos[i].qtd * listaDeProdutos[i].preco);
    }
    return total;
}

let todo = calcTotalProdutos(listaDoCarrinho).toFixed(2);

let totalProdutos = document.querySelector("#span-total-produtos");
totalProdutos.innerHTML = `R$ ${todo}`;

let spanTotalSomado = document.querySelector("#span-total-somado");
spanTotalSomado.innerHTML = `R$ ${todo}`;

let btnCalcularFrete = document.querySelector(".btn-fazer-pedido");

class Produto{
    constructor(produto){
        this.id = produto.id;
        this.nome = produto.nome;
        this.preco = produto.preco;
        this.urlImg = produto.url_img;
        this.qtdProduto = produto.qtd;
        this.qtdEstoque = produto.qtd_estoque;
        this.descricao = produto.descricao;
    }
}

class Cliente{
    constructor(cliente){
        this.id = cliente.id;
        this.nomeCompleto = cliente.name;
        this.cpf = cliente.cpf;
        this.email = cliente.email;
        this.celular = cliente.celular;
    }
}

class Item{
    constructor(produto,qtdProduto,subtotal){
        this.produto = produto;
        this.qtdProduto = qtdProduto;
        this.subtotal = subtotal;
    }
}

class Pedido{
    constructor(logradouro,numero,bairro,cep,complemento,itens,cliente,total,tipoPagamento){
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cep = cep;
        this.complemento = complemento;
        this.itens = itens;
        this.cliente = cliente;
        this.total = total;
        this.tipoPagamento = tipoPagamento;
    }
}

btnCalcularFrete.addEventListener("click",(e)=>{
    e.preventDefault();

    let logradouro = document.querySelector("#input-logradouro").value;
    let numero = document.querySelector("#input-numero").value;
    let bairro = document.querySelector("#input-bairro").value;
    let cep = document.querySelector("#input-cep").value;
    let complemento = document.querySelector("#input-complemento").value;

    //validando 
    if(logradouro == "" || bairro == "" || cep == ""){
        alert("Preencha todos os campos obrigatórios * !");
        return;
    }
    if(numero == ""){
        numero = null;
    }
    if(complemento == ""){
        complemento = null;
    }

    let clientePedido = new Cliente(cliente);
    let  arrayItens = [];
    for(let i = 0; i < listaDoCarrinho.length; i++){
        arrayItens.push(new Item(new Produto(listaDoCarrinho[i]),listaDoCarrinho[i].qtd,(listaDoCarrinho[i].preco * listaDoCarrinho[i].qtd)));
    }

    let pedido = new Pedido(logradouro,numero,bairro,cep,complemento,arrayItens,clientePedido,todo,tipoDePagamento);

    async function fazerPedidoNaApi(){
        await axios.post(endpointPedidosPorId,pedido,{
            headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("dadosUsuario")).token}`
            }
        })
        .then(()=>{
            alert("Pedido feito com sucesso!");
            sessionStorage.removeItem("listaDoCarrinho");
            sessionStorage.removeItem("tipoDePagamento");
            location.href = "loja.html";
        })
        .catch((error)=>alert(error))
    }
    fazerPedidoNaApi();
});