const btnMeusPedidos = document.querySelector(".btn-meus-pedidos");
const divCentral = document.querySelector(".div-central");

btnMeusPedidos.addEventListener("click",(e)=>{
    e.preventDefault();

    limpaDivConfig();

    let divMeusPedidos = document.createElement("div");
    divMeusPedidos.classList.add("div-meus-pedidos");
    divCentral.appendChild(divMeusPedidos);

    let pedidos = [];
    //chamar api pra buscar so pedidos do cliente
    async function buscaPedidos(){
        let usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));
        let url = `${endpointPedidos}/${usuario.id}`;
        pedidos = await fetch(url)
        .then((res)=>res.json())
        .catch((rej)=>console.log(rej));
        console.log(pedidos);
        if(pedidos.status==400){
            escreverMsg(divMeusPedidos,pedidos.message);
        }else if(pedidos.length >= 1){
            criaTabela(divMeusPedidos,pedidos);
        }
    }
    buscaPedidos();
});

function apagaTabela(divMeusPedidos){
    let tabela = document.querySelector(".table-meus-pedidos");
    divMeusPedidos.removeChild(tabela);
}

function criaTd(texto,classe,pagamento){
    let td = document.createElement("td");
    td.innerHTML = texto;
    if(texto == "CRIADO" && pagamento != "CARTAO_CREDITO"){
        td.innerHTML = "A PAGAR";
    }
    if(texto == "CRIADO" && pagamento == "CARTAO_CREDITO"){
        td.innerHTML = "AGUARDANDO CARTÂO";
    }
    if(texto == "EM_TRANSITO"){
        td.innerHTML = "EM TRÂNSITO";
    }
    td.classList.add(classe);
    return td;
}

function criaTr(pedido){
    let tr = document.createElement("tr");
    
    if(pedido.status == "CRIADO" && pedido.tipoPagamento != "CARTAO_CREDITO"){
        tr.addEventListener("click",(e)=>{
            e.preventDefault();
            //fazerPagamento(pedido.tipoPagamento) chamando a api especifica desse tipo de pagamento;
            console.log("Chamando fazer pagamento!");
        });
    }

    for(let i = 0; i < 4; i++){
        switch (i) {
            case 0:
                tr.appendChild(criaTd(pedido.id, "td-id",pedido.tipoPagamento));
                break;
            case 1:
                tr.appendChild(criaTd(pedido.dataCriacao, "td-criacao",pedido.tipoPagamento));
                break;
            case 2:
                tr.appendChild(criaTd(pedido.status, "td-status",pedido.tipoPagamento));
                break;
            case 3:
                tr.appendChild(criaTd(pedido.dataAtualizacao, "td-atualizacao",pedido.tipoPagamento));
                break;
        }
    }
    return tr;
}

function criaTabela (divMeusPedidos,pedidos){
    let tableMeusPedidos = document.createElement("table");
    divMeusPedidos.appendChild(tableMeusPedidos);
    tableMeusPedidos.classList.add("table-meus-pedidos");

    tableMeusPedidos.innerHTML = `
        <thead>
            <th>ID Pedido</th>
            <th>Criado em</th>
            <th>Status</th>
            <th>Última atualização</th>
        </thead>
        <tbody class="tbody">
        </tbody>
    `;

    let tbody = document.querySelector(".tbody");
    for(let i=0; i < pedidos.length; i++){
        tbody.appendChild(criaTr(pedidos[i]));
    }
}

function escreverMsg(pai,msg){
    let pMsg = document.createElement("p");
    pMsg.innerHTML = msg;
    pMsg.classList.add("erro-pedidos");
    pai.appendChild(pMsg);
}
