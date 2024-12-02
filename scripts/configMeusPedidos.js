//caso haja retorno do id do usuario na resposta da api no login
let idUsuario = JSON.parse(sessionStorage.getItem("dadosUsuario")).id;

const btnMeusPedidos = document.querySelector(".btn-meus-pedidos");
const divCentral = document.querySelector(".div-central");


btnMeusPedidos.addEventListener("click",(e)=>{
    e.preventDefault();

    limpaDivConfig();

    let divMeusPedidos = document.createElement("div");
    divMeusPedidos.classList.add("div-meus-pedidos");
    divCentral.appendChild(divMeusPedidos);

    //chamar api pra buscar so pedidos do cliente

    async function buscaPedidos(){
        await axios.get(`${endpointPedidosDoCliente}/${idUsuario}`,{
            headers:{
                "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("dadosUsuario")).token}`
            }
        })
        .then((res)=>{
            //exibindo mensagem caso não haja ao menos 1 pedido feito pelo usuario
            if(res.data.length == 0){
                divMeusPedidos.appendChild(mensagemSemPedidos());
                return;
            }
            //criando tabela dos pedidos
            criaTabela(divMeusPedidos, res.data);
        })
        .catch((error)=>{
            alert(error);
            return;
        })
    }

    buscaPedidos();
});

function criaTd(texto,classe){
    let td = document.createElement("td");
    td.innerHTML = texto;
    td.classList.add(classe);

    //formatando a data
    if(classe == "td-criacao" || classe == "td-atualizacao"){
        let data = texto.substr(0,texto.indexOf("T"));
        let ano = data.substr(2,2);
        let mes = data.substr(5,2);
        let dia = data.substr(8);
        let dataNova = `${dia}/${mes}/${ano}`;
        let hora = texto.substr(11,5);
        td.innerHTML = `${dataNova} às ${hora}`;
    }
    return td;
}

function criaTr(pedido){
    let tr = document.createElement("tr");

    for(let i = 0; i < 4; i++){
        switch (i) {
            case 0:
                tr.appendChild(criaTd(pedido.id, "td-id"));
                break;
            case 1:
                tr.appendChild(criaTd(pedido.dataCriacao, "td-criacao"));
                break;
            case 2:
                tr.appendChild(criaTd(pedido.status, "td-status"));
                break;
            case 3:
                tr.appendChild(criaTd(pedido.dataAtualizacao, "td-atualizacao"));
                break;
        }
    }
    tr.addEventListener("click",(e)=>{
        e.preventDefault();

        async function buscaPedidoPorId(){
            await axios.get(`${endpointPedidosPorId}/${pedido.id}`,{
                headers:{
                    "Authorization":`Bearer ${JSON.parse(sessionStorage.getItem("dadosUsuario")).token}`
                }
            })
            .then((res)=>{
                function criaTalebaDetalhes(){
                    let divPai = document.querySelector(".div-meus-pedidos");

                    //apagando a tabela que está dentro da divMeusPedidos                
                    let tableAApagar = document.querySelector(".table-meus-pedidos");
                    divPai.removeChild(tableAApagar);

                    //criando a nova tabela de detalhes
                    let tableDetalhes = document.createElement("table");
                    tableDetalhes.innerHTML = `
                        <caption style="font-size: 20px; margin-bottom:20px; font-weight: bold;">Pedido ${res.data.id}</caption>
                        <thead>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                        </thead>
                        <tbody class="tbody"></tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="text-align: end;">TOTAL</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    `;

                    let tbody = tableDetalhes.querySelector("tbody");
                    let total = 0;

                    for(let i = 0; i < res.data.itens.length; i++){
                        let trDetalhes = document.createElement("tr");
                        let tdDetalhesProduto = document.createElement("td");
                        let tdDetalhesQtd = document.createElement("td");
                        let tdDetalhesPreco = document.createElement("td");

                        tdDetalhesProduto.classList.add("td-detalhes-produto");
                        tdDetalhesQtd.classList.add("td-detalhes-qtd");
                        tdDetalhesPreco.classList.add("td-detalhes-preco");

                        tdDetalhesProduto.innerHTML = `<img src="${res.data.itens[i].produto.urlImg}">${res.data.itens[i].produto.nome}`;
                        tdDetalhesQtd.innerHTML = `${res.data.itens[i].qtdProduto}`;
                        tdDetalhesPreco.innerHTML = `<span>R$ ${res.data.itens[i].subtotal}</span>`;
                        total += res.data.itens[i].subtotal;

                        trDetalhes.appendChild(tdDetalhesProduto);
                        trDetalhes.appendChild(tdDetalhesQtd);
                        trDetalhes.appendChild(tdDetalhesPreco);
                        tbody.appendChild(trDetalhes);
                    }

                    let tdTotal = tableDetalhes.querySelector("tfoot").querySelector("tr").querySelectorAll("td")[1];
                    tdTotal.innerHTML = `R$ ${total}`;
                    
                    divPai.appendChild(tableDetalhes);
                }

                criaTalebaDetalhes();
            })
        }
        buscaPedidoPorId();
    })
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
        <tbody class="tbody"></tbody>
    `;

    let tbody = document.querySelector(".tbody");
    for(let i=0; i < pedidos.length; i++){
        tbody.appendChild(criaTr(pedidos[i]));
    }
}

function mensagemSemPedidos(){
    let h2 = document.createElement("h2");
    h2.innerHTML = "Sem pedidos";
    return h2;
}

function limpaDivConfig(){
    //limpando a tela caso haja algo
    if(document.querySelector(".div-inputs") != null){
        divCentral.removeChild(document.querySelector(".div-inputs"));
    }
    if(document.querySelector(".div-alt-celular") != null){
        divCentral.removeChild(document.querySelector(".div-alt-celular"));
    }
    if(document.querySelector(".div-alt-produtos") != null){
        divCentral.removeChild(document.querySelector(".div-alt-produtos"));
    }
    if(document.querySelector(".div-meus-pedidos") != null){
        divCentral.removeChild(document.querySelector(".div-meus-pedidos"));
    }
}