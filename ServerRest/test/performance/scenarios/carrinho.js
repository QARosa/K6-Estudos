import { group } from 'k6';
import { SharedArray } from "k6/data"
import { randomItem, randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"
import { getCarrinhos, postCarrinhos, deleteCarrinhos} from '../resources/carrinho.js';
import { postLogin } from '../resources/login.js';
import { postProdutos } from '../resources/produto.js';
import { AdminCriarProduto } from './produto.js';



// Carregar dados de teste de um arquivo JSON
const usuarios = new SharedArray('Usuários', function () {
  return JSON.parse(open('../data/usuarios.json')); // Certifique-se de criar um arquivo JSON com dados de teste
});

function generateUniqueEmail() {
  return `${randomIntBetween(1, 100000)}_${randomString(5)}@qa.com`;
}

export function consultaTodosCarrinhos() {
  getCarrinhos('', 200);
}

export function consultaIdCarrinho() {
  let idcarrinho = getCarrinhos('?idUsuario=0uxuPY0cbmQhpEz1', 200);
  return idcarrinho;
}

export function incluirCarrinho(adminauthorization, idProduto) {
  let quantidade = 1; // Defina a quantidade desejada
  let expectedStatus = 201;
  let expectedMessage = 'Cadastro realizado com sucesso';

  console.log(`Criando carrinho para o produto: ${idProduto}`);
  let response = postCarrinhos(idProduto, quantidade, expectedStatus, expectedMessage, adminauthorization);

  if (response.status !== expectedStatus) {
      console.error(`Erro ao criar carrinho: ${response.body}`);
      return null;
  }

  let idCarrinho = response.json('_id');
  console.log(`Carrinho criado com sucesso. ID: ${idCarrinho}`);
  return idCarrinho; // Retorna apenas o ID do carrinho criado
}

export function deletarCarrinhos(adminauthorization) {
  let idcarrinho = getCarrinhos('?idUsuario=0uxuPY0cbmQhpEz1', 200);
  let response = deleteCarrinhos(adminauthorization, 200, 'Registro excluído com sucesso'); // Chama a função de recurso para exclusão
  console.log(`Resposta da API: ${response.status} - ${response.body}`);

}





