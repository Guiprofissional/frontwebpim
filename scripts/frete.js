//cep nn,logradouro nn, numero default "S/N", complemento, bairro nn
//tabela de pedido     cliente_id, cep, logradouro, numero, complemento, bairro, status, tipo_pagamento, data_criacao, data_atualizacao, total

let listaDoCarrinho = JSON.parse(sessionStorage.getItem("listaDoCarrinho"));

function calcTotalProdutos(listaDeProdutos){
    let total = 0;
    for(let i = 0; i < listaDeProdutos.length; i++){
        total+= (listaDeProdutos[i].qtd * listaDeProdutos[i].preco);
    }
    return total;
}

function calcTotalSomado(listaDeProdutos, frete){
    let produtos = calcTotalProdutos(listaDeProdutos);
    let freteTotal = frete;
    let totalSomado = produtos + freteTotal;

    return totalSomado;
}

let totalProdutos = document.querySelector("#span-total-produtos");
totalProdutos.innerHTML = `R$ ${calcTotalProdutos(listaDoCarrinho).toFixed(2)}`;


let btnCalcularFrete = document.querySelector(".btn-calcular-frete");
btnCalcularFrete.addEventListener("click",(e)=>{
    e.preventDefault();

    let logradouro = document.querySelector("#input-logradouro");
    let numero = document.querySelector("#input-numero");
    let bairro = document.querySelector("#input-bairro");
    let cep = document.querySelector("#input-cep");
    let complemento = document.querySelector("#input-complemento");

    //validando 
    if(logradouro.value == "" || bairro.value == "" || cep.value == ""){
        alert("Preencha todos os campos obrigatórios * !");
        return;
    }
});


//calcular frrete a partir da resposta da api
let frete = 0;

let spanTotalSomado = document.querySelector("#span-total-somado");
spanTotalSomado.innerHTML = `R$ ${calcTotalSomado(listaDoCarrinho, frete).toFixed(2)}`;