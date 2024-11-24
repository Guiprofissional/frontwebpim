const inputPesquisar = document.getElementById("input-pesquisar");

inputPesquisar.addEventListener("keyup",(e)=>{
    let filtro = listaProdutosEmEstoque.filter(i => i.nome.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    apagaListaDeProdutos();
    criaListaDeProdutos(filtro);
});