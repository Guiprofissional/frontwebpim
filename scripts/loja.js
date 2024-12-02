//chamando todos produtos da api

let listaProdutosEmEstoque=[];

//buscando produtos do estoque na api
async function buscaProdutosEmEstoque(){
    let listaProdutos = await fetch(endpointProdutosEstoque,{
        headers:{
            "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("dadosUsuario")).token}`
        }
    })
    .then((res)=>res.json())
    .catch(() => {
        msgFalhaProdutos();
        return;
    });
    //convertendo nomes da propriedades do json vindo da api

    listaProdutos.forEach(element => {
        listaProdutosEmEstoque.push(
            {
                id: element.id,
                nome: element.nome,
                preco: element.preco,
                descricao: element.descricao,
                qtd_estoque: element.qtdEstoque,
                url_img: element.urlImg
            }
        )
    });
    criaListaDeProdutos(listaProdutosEmEstoque);
}

buscaProdutosEmEstoque();

class ProdutoDoCarrinho{
    constructor(id,nome,qtd,preco,url_img,qtd_estoque){
        this.id = id;
        this.nome=nome;
        this.qtd=qtd;
        this.preco=preco;
        this.url_img=url_img;
        this.qtd_estoque = qtd_estoque;
    }
}

//Vendo se ao carregar o script tem a listaDoCarrihno na sessionStorage, caso nao , cria um array vazio na variavel listaProdutosDoCarrinho
let listaProdutosDoCarrinho;
if(sessionStorage.getItem("listaDoCarrinho") == null){
    listaProdutosDoCarrinho = [];
}else{
    listaProdutosDoCarrinho = JSON.parse(sessionStorage.getItem("listaDoCarrinho"));
}

//colocando a quantidade de produtos no icone do carrinho
let spanQtdCarrinho = document.querySelector(".span-qtd-produtos-na-lista");
if(listaProdutosDoCarrinho.length > 0){
    spanQtdCarrinho.innerHTML = listaProdutosDoCarrinho.length;
    spanQtdCarrinho.classList.remove(spanQtdCarrinho.getAttribute("class"));
    spanQtdCarrinho.classList.add("span-qtd-produtos-na-lista");
}else if(listaProdutosDoCarrinho.length == 0){
    spanQtdCarrinho.innerHTML = "";
    spanQtdCarrinho.classList.remove(spanQtdCarrinho.getAttribute("class"));
    spanQtdCarrinho.classList.add("span-apagado");
}

//funçao pra criar no html uma div representante do produto em estoque
function criaProduto(produto){
    let divProduto = document.createElement("div");
    divProduto.classList.add("div-produto");

    let imgProduto = document.createElement("img");
    let imgInfo = document.createElement("img");
    imgProduto.classList.add("img-produto");
    imgInfo.classList.add("img-info");
    imgProduto.setAttribute("src",produto.url_img);
    imgInfo.setAttribute("src","imgs/info-icone-preto.svg");
    divProduto.appendChild(imgInfo);
    divProduto.appendChild(imgProduto);

    let pNomeProduto = document.createElement("p");
    pNomeProduto.classList.add("p-nome-produto");
    pNomeProduto.innerHTML = produto.nome;
    divProduto.appendChild(pNomeProduto);

    let pPrecoProduto = document.createElement("p");
    pPrecoProduto.innerHTML = produto.qtd_estoque !=0 ? "R$ " + produto.preco : "Esgotado!";
    pPrecoProduto.classList.add("p-preco-produto");
    divProduto.appendChild(pPrecoProduto);

    let divQtdProduto = document.createElement("div");
    divQtdProduto.classList.add("div-qtd-produto");
    divProduto.appendChild(divQtdProduto);

    let btnDiminuir = document.createElement("button");
    divQtdProduto.appendChild(btnDiminuir);
    btnDiminuir.innerHTML = "-";
    btnDiminuir.classList.add("btn-diminuir");

    let inputQtd = document.createElement("input");
    divQtdProduto.appendChild(inputQtd);
    inputQtd.setAttribute("value","0");
    inputQtd.classList.add("input-qtd");

    let btnAumentar = document.createElement("button");
    divQtdProduto.appendChild(btnAumentar);
    btnAumentar.innerHTML = "+";
    btnAumentar.classList.add("btn-aumentar");

    let btnComprar = document.createElement("button");
    divProduto.appendChild(btnComprar);
    btnComprar.innerHTML = "Comprar";
    btnComprar.classList.add("btn-comprar");

    //ações dos botoes da divproduto
    imgInfo.addEventListener("click",(e)=>{
        e.preventDefault();
        let body = document.querySelector("body");
        //criando a fade
        let divFade = document.createElement("div");
        divFade.classList.add("div-fade");
        body.appendChild(divFade);

        //criando a caixa de detalhes
        let divCaixa = document.createElement("div");
        divCaixa.classList.add("div-caixa");
        body.appendChild(divCaixa);

        divCaixa.innerHTML = `
            
            <div class="div-topo">
                <p>Detalhes</p>
            </div>
            <img src="imgs/fechar.svg" class="img-fechar">
            <div class="div-conteudo">
                <p class="p-conteudo"></p>
            </div>
        `;

        let pConteudo = document.querySelector(".p-conteudo");
        if(produto.descricao == null){
            pConteudo.innerHTML = "Sem detalhes";
        }else{
            pConteudo.innerHTML = produto.descricao;
        }

        //destruindo a caixa de detalhes ao clicar na imgfechar
        let imgFechar = document.querySelector(".img-fechar");
        imgFechar.addEventListener("click",(e)=>{
            e.preventDefault();
            body.removeChild(divCaixa);
            body.removeChild(divFade);
        });
    });

    btnDiminuir.addEventListener("click", (e)=>{
        e.preventDefault;
        if(parseInt(inputQtd.value) > 0){
            inputQtd.value = parseInt(inputQtd.value) - 1;
        }
    });

    btnAumentar.addEventListener("click",(e)=>{
        e.preventDefault;
        if(parseInt(inputQtd.value) < produto.qtd_estoque){
            inputQtd.value = parseInt(inputQtd.value) + 1;
        }
    });

    btnComprar.addEventListener("click",(e)=>{
        e.preventDefault();
        if(inputQtd.value != 0 && inputQtd.value <= produto.qtd_estoque){
            for(let i = 0; i < listaProdutosDoCarrinho.length; i++){
                if(produto.id == listaProdutosDoCarrinho[i].id){
                    listaProdutosDoCarrinho[i].qtd = parseInt(inputQtd.value);
                    sessionStorage.setItem("listaDoCarrinho",JSON.stringify(listaProdutosDoCarrinho));
                    return;
                }
            }
            listaProdutosDoCarrinho.push(new ProdutoDoCarrinho(produto.id,produto.nome,parseInt(inputQtd.value),produto.preco,produto.url_img,produto.qtd_estoque));
            sessionStorage.setItem("listaDoCarrinho",JSON.stringify(listaProdutosDoCarrinho));

            //atualizando icone qtdCarrinho
            spanQtdCarrinho.innerHTML = listaProdutosDoCarrinho.length;
            spanQtdCarrinho.classList.remove(spanQtdCarrinho.getAttribute("class"));
            spanQtdCarrinho.classList.add("span-qtd-produtos-na-lista");
        }
        //avisando com um "alert" caso a quantidade do input seja maior que o estoque
        if(inputQtd.value > produto.qtd_estoque){
            alert(`Só restam ${produto.qtd_estoque} ${produto.nome}`);
            inputQtd.value = produto.qtd_estoque;
        }
    });

    return divProduto;
}

//funçao para cria no html a lista dos produtos em estoque
function criaListaDeProdutos(listaDeProdutos){
    for(let i=0; i<listaDeProdutos.length; i++){
        let divCentral = document.querySelector(".div-central");
        let divProduto = criaProduto(listaDeProdutos[i]);
        divCentral.appendChild(divProduto);
    }
}
//essa apaga essa lista de produtos de estoque
function apagaListaDeProdutos(){
    let divCentral = document.querySelector(".div-central");
    let divsProdutos = document.querySelectorAll(".div-produto");
    for(let i = 0; i < divsProdutos.length; i++){
        divCentral.removeChild(divsProdutos[i]);
    }
}

function msgFalhaProdutos(){
    let msg = document.createElement("p");
    msg.innerHTML = "Falha ao carregar produtos!";
    msg.classList.add("msg-falha-produtos");
    let divCentral = document.querySelector(".div-central");
    divCentral.appendChild(msg);
    console.log("falha ao carregar produtos!");
}