const ipEPortaApi = "localhost:8080";
let clienteLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
const endpointProdutosEstoque = `http://${ipEPortaApi}/produtos`;
const endpointPedidos = `http://${ipEPortaApi}/pedidos/clientes`;
const endpointLogin = `http://${ipEPortaApi}/auth/login`;
const endpointCadastro = `http://${ipEPortaApi}/auth/register`;