let spanTotal = document.getElementById("span-total");
let listaProdutosDoCarrinho = JSON.parse(sessionStorage.getItem("listaDoCarrinho"));
const btnFinalizarCompra = document.querySelector("#btn-finalizar-compra");

//os limites de qtd vao ver no minimo 1 e no maximo a qtd do estoque
function criaTr(produto){
    let tr = document.createElement("tr");
    let btnDiminuir = document.createElement("button");
    let btnAumentar = document.createElement("button");
    let btnExcluir = document.createElement("button");
    let spanNome = document.createElement("span");
    let spanQtd = document.createElement("span");
    let spanPreco = document.createElement("span");
    let tdNome = document.createElement("td");
    let tdQtd = document.createElement("td");
    let tdPreco = document.createElement("td");
    let img = document.createElement("img");

    btnDiminuir.classList.add("btn-diminuir");
    btnAumentar.classList.add("btn-aumentar");    
    btnExcluir.classList.add("btn-excluir");

    tdNome.classList.add("td-nome");
    tdQtd.classList.add("td-qtd");
    tdPreco.classList.add("td-preco");
    img.classList.add("img-produto");
    img.setAttribute("src",produto.url_img);


    btnDiminuir.addEventListener("click",(e)=>{
        e.preventDefault();
        if(produto.qtd>1){
            produto.qtd = produto.qtd - 1;
            sessionStorage.setItem("listaDoCarrinho",JSON.stringify(listaProdutosDoCarrinho));
        }
        apagaTabela();
        criaTabela();
    });

    btnAumentar.addEventListener("click",(e)=>{
        e.preventDefault();
        if(produto.qtd < produto.qtd_estoque){
            produto.qtd = produto.qtd + 1;
            sessionStorage.setItem("listaDoCarrinho",JSON.stringify(listaProdutosDoCarrinho));
        }
        apagaTabela();
        criaTabela();
    });

    btnExcluir.addEventListener("click",(e)=>{
        e.preventDefault();
        listaProdutosDoCarrinho = listaProdutosDoCarrinho.filter(item => item != produto);
        sessionStorage.setItem("listaDoCarrinho",JSON.stringify(listaProdutosDoCarrinho));
        apagaTabela();
        criaTabela();
    });
    
    btnDiminuir.innerHTML = "-";
    btnAumentar.innerHTML = "+";
    btnExcluir.innerHTML = "X";
    spanNome.innerHTML = produto.nome;
    spanQtd.innerHTML = produto.qtd;
    spanPreco.innerHTML = `R$ ${parseFloat(produto.preco * produto.qtd).toFixed(2)}`;

    tdNome.appendChild(img);
    tdNome.appendChild(spanNome);
    tdQtd.appendChild(btnDiminuir);
    tdQtd.appendChild(spanQtd);
    tdQtd.appendChild(btnAumentar);
    tdQtd.appendChild(btnExcluir);
    tdPreco.appendChild(spanPreco);
    tr.appendChild(tdNome);
    tr.appendChild(tdQtd);
    tr.appendChild(tdPreco);

    return tr;
}

function criaTabela(){
    let tbody = document.createElement("tbody");
    let table = document.querySelector("table");
    table.appendChild(tbody);
    let total = 0;
    for(let i = 0; i < listaProdutosDoCarrinho.length; i++){
        tbody.appendChild(criaTr(listaProdutosDoCarrinho[i]));
        total += (parseFloat(listaProdutosDoCarrinho[i].preco) * parseFloat(listaProdutosDoCarrinho[i].qtd));
    }
    spanTotal.innerHTML = `R$ ${total.toFixed(2)}`;
}

function apagaTabela(){
    let tbody = document.querySelector("tbody");
    let table = document.querySelector("table");
    table.removeChild(tbody);
}

criaTabela();

btnFinalizarCompra.addEventListener("click",(e)=>{
    e.preventDefault();
    //verificando se esta cliente esta logado, se sim, segue para digitar frete, se nao, segue para fazer login
    if(sessionStorage.getItem("dadosUsuario") == null){
        alert("Você precisa primeiro fazer login!");
        location.href = "login.html";
        return;
    }

    //salvando o tipo de pagamento na sessionStorage
    let inputsPagamento = document.querySelector("input[name='forma-pagamento']:checked").value;
    sessionStorage.setItem("tipoDePagamento",inputsPagamento);
    
    location.href="frete.html";
});