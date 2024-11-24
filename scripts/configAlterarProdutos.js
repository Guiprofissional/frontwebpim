let usuario;
if(sessionStorage.getItem("usuarioLogado") != null){
    usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if(usuario.isAdm == true){
        //criando o botao de alterar produto no menu de configuraçoes
        let divbtns = document.querySelector(".div-btns");
        let btnAlterarProdutos = document.createElement("button");
        btnAlterarProdutos.innerHTML = "Alterar produtos";
        divbtns.appendChild(btnAlterarProdutos);
        btnAlterarProdutos.classList.add("btn-alterar-produtos");

        btnAlterarProdutos.addEventListener("click",(e)=>{
            e.preventDefault();

            //limpando tela
            limpaDivConfig();

            //criando div das opcoes de edicao de produto
            var divAltProdutos = document.createElement("div");
            divAltProdutos.innerHTML = `
                <button type="button" class="btn-add">Adicionar produto</button>
                <button type="button" class="btn-edt">Editar produto</button>
                <button type="button" class="btn-exc">Excluir produto</button>
            `;
            divCentral.appendChild(divAltProdutos);
            divAltProdutos.classList.add("div-alt-produtos");


            //AQUI JOGAR PRODUTOS VINDO DA API NESSA "LISTACOMPRODUTOS" E EXCLUIR ESSE LOCALSTORAGE DAQUI E DO ARQUIVO LOJAJS
            //let listaComProdutos = JSON.parse(localStorage.getItem("listaProdutosEmEstoque"));
            let listaComProdutos = [];
            
            async function buscaProdutos(){
                
                let listaProdutos = await fetch(endpointProdutosEstoque,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .then((res)=>res.json())
                .catch((rej)=>console.log(rej))
                //convertendo nomes da propriedades do json vindo da api
                listaProdutos.forEach(element => {
                    listaComProdutos.push(
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
            }
            buscaProdutos();

            //criar aqui açao do "add produto"
            let btnAdd = document.querySelector(".btn-add");
            btnAdd.addEventListener("click",function criarDivAddProduto(){
                divAltProdutos.removeChild(document.querySelector(".btn-add"));
                divAltProdutos.removeChild(document.querySelector(".btn-edt"));
                divAltProdutos.removeChild(document.querySelector(".btn-exc"));

                divAltProdutos.innerHTML = `
                    <h2>Adicionar Produto</h2>
                    <div class="div-input-add">
                        <label>Nome *</label>
                        <input type="text/number" id="input-nome" class="input-addProduto-nome">
                    </div>
                    <div class="div-input-add">
                        <label>Preço *</label>
                        <input type="text/number" id="input-preco" class="input-addProduto-preco">
                    </div>
                    <div class="div-input-add">
                        <label>Quantidade em estoque *</label>
                        <input type="text/number" id="input-qtd-estoque" class="input-addProduto-qtdEstoque">
                    </div>
                    <div class="div-input-add">
                        <label>URL da imagem *</label>
                        <input type="text/number" id="input-url-img" class="input-addProduto-urlImg">
                    </div>
                    <div class="div-text-area-add">
                        <label>Descrição</label>
                        <textarea id="text-area-descricao" class="input-addProduto-descricao"></textarea>
                    </div>
                    <button type="button" class="btn-confirmar-adicao">Confirmar</button>
                `;

                let btnConfirmarAdicao = document.querySelector(".btn-confirmar-adicao");
                btnConfirmarAdicao.addEventListener("click",(e)=>{
                    e.preventDefault();
                    //validando campos
                    let inputNome = document.querySelector(".input-addProduto-nome");
                    let inputPreco = document.querySelector(".input-addProduto-preco");
                    let inputQtdEstoque = document.querySelector(".input-addProduto-qtdEstoque");
                    let inputUrlImg = document.querySelector(".input-addProduto-urlImg");
                    let textareaDescricao = document.querySelector(".input-addProduto-descricao");

                    if(inputNome.value == "" || inputPreco.value == "" || inputQtdEstoque.value == "" || inputUrlImg.value == ""){
                        alert("Preencha todos os campos obrigatórios * !");
                        return;
                    }


                    let produtoAdicionado = {
                        nome: inputNome.value,
                        preco: parseFloat(inputPreco.value),
                        urlImg: inputUrlImg.value,
                        qtdEstoque: parseInt(inputQtdEstoque.value),
                        descricao: textareaDescricao.value
                    };

                    //lancar esse json pra api
                    async function gravarProduto(){
                        await fetch(endpointProdutosEstoque,{
                            method:"POST",
                            body:JSON.stringify(produtoAdicionado),
                            headers:{
                                "Content-Type":"application/json"
                            }
                        }).then(()=>{
                            alert("Produto criado!");
                            location.href = "config.html";
                        }).catch((error)=>alert(error))
                    }
                    gravarProduto();
                });              

            });


            //criar aqui açao do "editar produto"
            let btnEdt = document.querySelector(".btn-edt");
            btnEdt.addEventListener("click",function criarDivEditarProduto(){
                divAltProdutos.removeChild(document.querySelector(".btn-add"));
                divAltProdutos.removeChild(document.querySelector(".btn-edt"));
                divAltProdutos.removeChild(document.querySelector(".btn-exc"));

                //chamar na API todos produtos do estoque e colocar a resposta na variavel "listacomprodutos"

            
                let h2 = document.createElement("h2");
                h2.innerHTML = "Editar produtos";

                let inputPesquisar = document.createElement("input");
                inputPesquisar.classList.add("input-pesquisar-produto");
                inputPesquisar.setAttribute("placeholder","Pesquise um produto");

                let divProdutosParaEditar = document.createElement("div");
                divProdutosParaEditar.classList.add("div-produtos");

                criarListaEditar(divProdutosParaEditar,listaComProdutos);

                //fazendo filtro da lista
                inputPesquisar.addEventListener("keyup",(e)=>{
                    let filtrado = listaComProdutos.filter(i => i.nome.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
                    apagarLista(document.querySelectorAll(".div-produto-para-editar"));
                    criarListaEditar(divProdutosParaEditar,filtrado);
                });

                divAltProdutos.appendChild(h2);
                divAltProdutos.appendChild(inputPesquisar);
                divAltProdutos.appendChild(divProdutosParaEditar);

            });

            //criando acao do botao "excluir produto"
            let btnExc = document.querySelector(".btn-exc");
            btnExc.addEventListener("click",function criarDivExcluirProduto(){
                divAltProdutos.removeChild(document.querySelector(".btn-add"));
                divAltProdutos.removeChild(document.querySelector(".btn-edt"));
                divAltProdutos.removeChild(document.querySelector(".btn-exc"));

                let h2 = document.createElement("h2");
                h2.innerHTML = "Excluir produtos";

                let inputPesquisar = document.createElement("input");
                inputPesquisar.classList.add("input-pesquisar-produto");
                inputPesquisar.setAttribute("placeholder","Pesquise um produto");

                let divProdutosParaExcluir = document.createElement("div");
                divProdutosParaExcluir.classList.add("div-produtos");
                criarListaExcluir(divProdutosParaExcluir,listaComProdutos);
                
                //fazendo filtro da lista
                inputPesquisar.addEventListener("keyup",(e)=>{
                    let filtrado = listaComProdutos.filter(i => i.nome.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
                    apagarLista(document.querySelectorAll(".div-produto-para-excluir"));
                    criarListaExcluir(divProdutosParaExcluir,filtrado);
                });
            
            
                let btnConfirmarExclusao = document.createElement("button");
                btnConfirmarExclusao.classList.add("btn-confirmar-exclusao");
                btnConfirmarExclusao.innerHTML = "Confirmar Exclusão";

                btnConfirmarExclusao.addEventListener("click",(e)=>{
                    e.preventDefault();
                                        
                    let ids = [];
                    let inputsComCheck = document.querySelectorAll("input[type='checkbox']:checked");
                    inputsComCheck.forEach(element => {
                        ids.push(element.value);
                    });
                    //validando seleçao dos produto
                    if(ids.length == 0){
                        alert("Selecione ao menos 1 produto!");
                        return;
                    }

                    //fazendo pergunta de confirmaçao
                    let body = document.querySelector("body");
                    divFade.classList.remove(divFade.getAttribute("class"));
                    divFade.classList.add("div-fade");
                    let divPergunta = document.createElement("div");
                    divPergunta.classList.add("div-pergunta");
                    body.appendChild(divPergunta);

                    let labelPergunta = document.createElement("label");
                    labelPergunta.innerHTML = "Deseja mesmo excluir?";
                    divPergunta.appendChild(labelPergunta);

                    let divBtnsSimNao = document.createElement("div");
                    divPergunta.appendChild(divBtnsSimNao);

                    let btnSim = document.createElement("button");
                    let btnNao = document.createElement("button");
                    btnSim.classList.add("btn-sim");
                    btnNao.classList.add("btn-nao");
                    divBtnsSimNao.appendChild(btnSim);
                    divBtnsSimNao.appendChild(btnNao);
                    btnSim.innerHTML = "Sim";
                    btnNao.innerHTML = "Não";

                    btnNao.addEventListener("click",(e)=>{
                        e.preventDefault();
                        body.removeChild(divPergunta);
                        divFade.classList.remove(divFade.getAttribute("class"));
                        divFade.classList.add("hide");
                    });

                    btnSim.addEventListener("click",(e)=>{
                        e.preventDefault();
                        body.removeChild(divPergunta);
                        divFade.classList.remove(divFade.getAttribute("class"));
                        divFade.classList.add("hide");
                        
                        for(let i = 0; i < ids.length; i++){
                            //chamar a API pra excluir
                            async function excluirProdutoNoBanco(idProduto){
                                let url = `${endpointProdutosEstoque}/${idProduto}`;
                                await fetch(url,{
                                    method:"DELETE",
                                    headers:{
                                        "Content-Type":"application/json"
                                    }
                                }).then(()=>{
                                    
                                    console.log("entrou no then");
                                    alert("Produto excluido!");
                                    location.href = "config.html";
                                })
                            }
                            excluirProdutoNoBanco(ids[i]);
                            console.log(ids[i]);
                        }


                        apagarLista(document.querySelectorAll(".div-produto-para-excluir"));
                        criarListaExcluir(divProdutosParaExcluir,listaComProdutos);
                    });
                });
            
                divAltProdutos.appendChild(h2);
                divAltProdutos.appendChild(inputPesquisar);
                divAltProdutos.appendChild(divProdutosParaExcluir);
                divAltProdutos.appendChild(btnConfirmarExclusao);
            });
        });
    }
}

function msgErroProdutos(divPai){
    let msg = document.createElement("p");
    msg.innerHTML = "Falha ao carregar produtos!";
    msg.classList.add("msg-erro-produtos");
    divPai.appendChild(msg);
}

function criarListaExcluir(divProdutosParaExcluir,listaComProdutos){
    if(listaComProdutos.length == 0){
        msgErroProdutos(divProdutosParaExcluir);
        return;
    }

    for(let i = 0; i < listaComProdutos.length; i++){
        let divProduto = document.createElement("div");
        divProduto.classList.add("div-produto-para-excluir");
        divProdutosParaExcluir.appendChild(divProduto);

        let inputSelect = document.createElement("input");
        divProduto.appendChild(inputSelect);
        inputSelect.setAttribute("type","checkbox");
        inputSelect.setAttribute("value",listaComProdutos[i].id);
        inputSelect.classList.add("input-select");

        let imgProduto = document.createElement("img");
        divProduto.appendChild(imgProduto);
        imgProduto.setAttribute("src",listaComProdutos[i].url_img);

        let pNomeProduto = document.createElement("p");
        pNomeProduto.classList.add("p-nome-produto");
        divProduto.appendChild(pNomeProduto);
        pNomeProduto.innerHTML = listaComProdutos[i].nome;
    }
}

function criarListaEditar(divProdutosParaEditar,listaComProdutos){
    if(listaComProdutos.length == 0){
        msgErroProdutos(divProdutosParaEditar);
        return;
    }

    for(let i = 0; i < listaComProdutos.length; i++){
        let divProduto = document.createElement("div");
        divProduto.classList.add("div-produto-para-editar");
        divProdutosParaEditar.appendChild(divProduto);

        let imgProduto = document.createElement("img");
        divProduto.appendChild(imgProduto);
        imgProduto.setAttribute("src",listaComProdutos[i].url_img);

        let pNomeProduto = document.createElement("p");
        pNomeProduto.classList.add("p-nome-produto");
        divProduto.appendChild(pNomeProduto);
        pNomeProduto.innerHTML = listaComProdutos[i].nome;

        divProduto.addEventListener("click",function abrirPainelEditar(e){
            e.preventDefault();
            let divAltProdutos = document.querySelector(".div-alt-produtos");
            divCentral.removeChild(divAltProdutos);

            let divPainelEditar = document.createElement("div");
            divPainelEditar.classList.add("div-alt-produtos");
            divCentral.appendChild(divPainelEditar);

            divPainelEditar.innerHTML = `
                <h2>${listaComProdutos[i].nome}</h2>
                <div class="div-input-editar">
                    <label>Nome</label>
                    <input type="text/number" id="input-nome" class="um">
                </div>
                <div class="div-input-editar">
                    <label>Preço</label>
                    <input type="text/number" id="input-preco" class="dois">
                </div>
                <div class="div-input-editar">
                    <label>Quantidade em estoque</label>
                    <input type="text/number" id="input-qtd-estoque" class="tres">
                </div>
                <div class="div-input-editar">
                    <label>URL da imagem</label>
                    <input type="text/number" id="input-url-img" class="quatro">
                </div>
                <div class="div-text-area-editar">
                    <label>Descrição</label>
                    <textarea id="text-area-descricao" class="cinco"></textarea>
                </div>
                <button type="button" class="btn-confirmar-edicao">Confirmar</button>
            `;

            let btnConfirmarEdicao = document.querySelector(".btn-confirmar-edicao");
            btnConfirmarEdicao.addEventListener("click",(e)=>{
                e.preventDefault();

                let inputNome = document.querySelector(".um");
                let inputPreco = document.querySelector(".dois");
                let inputQtdEstoque = document.querySelector(".tres");
                let inputUrlImg = document.querySelector(".quatro");
                let textareaDescricao = document.querySelector(".cinco");

                //validando campos 
                if(inputNome.value == "" && inputPreco.value == "" && inputQtdEstoque.value == "" && inputUrlImg.value == "" && textareaDescricao.value == ""){
                    alert("Edite ao menos uma propriedade do produto!");
                    return;
                }

                //criadno JSON com valores dos inputs
                let produtoEditado = {
                    nome: inputNome.value,
                    preco: parseFloat(inputPreco.value),
                    urlImg: inputUrlImg.value,
                    qtdEstoque: parseInt(inputQtdEstoque.value),
                    descricao: textareaDescricao.value,
                };
                
                //atribuindo valores antigos do produto caso o usuario nao atualize determinada propriedade
                if(inputNome.value == ""){
                    console.log("entrou no nome");
                    produtoEditado.nome = listaComProdutos[i].nome;
                }
                if(inputPreco.value == ""){
                    console.log("entrou no preco");
                    produtoEditado.preco = listaComProdutos[i].preco;
                }
                if(inputUrlImg.value == ""){
                    console.log("entrou no img");
                    produtoEditado.urlImg = listaComProdutos[i].url_img;
                }
                if(inputQtdEstoque.value == ""){
                    console.log("entrou no qtdestoque");
                    produtoEditado.qtdEstoque = listaComProdutos[i].qtd_estoque;
                }
                if(textareaDescricao.value == ""){
                    console.log("entrou no descricao");
                    produtoEditado.descricao = listaComProdutos[i].descricao;
                }

                //mandar pra API esse json com verbo put
                async function atualizarProduto(idProduto){
                    let url = `${endpointProdutosEstoque}/${idProduto}`;
                    await fetch(url,{
                        method:"PUT",
                        body:JSON.stringify(produtoEditado),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    }).then(()=>{
                        alert("Produto editado!");
                        location.href = "config.html";
                    })
                }
                atualizarProduto(listaComProdutos[i].id);
            });
        });

    }
}

function apagarLista(lista){
    let divProdutos = document.querySelector(".div-produtos");
    lista.forEach(element => {
        divProdutos.removeChild(element);
    });
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

