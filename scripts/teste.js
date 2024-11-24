const endpointProdutos = "http://localhost:8080/produtos";

let listaPrincipal=[];

async function buscaProdutosEmEstoque(){
    let listaProdutos = await fetch(endpointProdutos).then((res)=>res.json());
    console.log(listaProdutos);
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
    console.log(listaProdutosEmEstoque);
}

buscaProdutosEmEstoque();