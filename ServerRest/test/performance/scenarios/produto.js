import { group } from 'k6';
import {postLogin} from '../resources/login.js';
import { postUsuariosAdm } from './usuarios.js';
import { SharedArray } from "k6/data"
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"





export function consultarProdutos() {
  getIdProdutos()  
  getProdutos()

}


export function AdminCriarProduto() {
  console.log('Iniciando teste para criar produto com sucesso...');
  let admin = postUsuariosAdm('Admin Silva', 'adminsilva@qa.com.br', 'teste', 'true', 201, 'Cadastro realizado com sucesso'); 
  console.log(`Criando usuário administrador: ${admin}`);
  
  // Realiza o login e obtém o token de autenticação
  let token = postLogin('adminsilva', 'teste', 200, 'Login realizado com sucesso');
  console.log(`Token de autenticação: ${token}`);
  // Criar um produto usando o token
  postProdutosAdmin()
  let nome = "Teste Produto " + randomIntBetween(1, 100000); // Nome único para cada execução
  let preco = 150.00;   
  let descricao = "Mouse de alta precisão";
  let quantidade = 10;
  let expectedStatus = 201;
  let expectedMessage = 'Cadastro realizado com sucesso';
  let response = postProdutosAdmin(nome, preco, descricao, quantidade, expectedStatus, expectedMessage, token);
  let produtoId = response.json('_id');
  console.log(`Produto criado com sucesso. ID: ${produtoId}`);

}

// export function postProdutoUser() {
//   console.log('Iniciando teste para criar produto com sucesso...');
//   // Realiza o login e obtém o token de autenticação
//   let token = postLogin('beltrano@qa.com.br', 'teste', 200, 'Login realizado com sucesso');
//   console.log(`Token de autenticação: ${token}`);
//   // Criar um produto usando o token
//   postProdutosNoAdmin()
//   let nome = "Teste Produto " + randomIntBetween(1, 100000); // Nome único para cada execução
//   let preco = 150.00;   
//   let descricao = "Mouse de alta precisão";
//   let quantidade = 10;
//   let expectedStatus = 201;
//   let expectedMessage = 'Cadastro realizado com sucesso';
//   let response = postProdutosAdmin(nome, preco, descricao, quantidade, expectedStatus, expectedMessage, token);
//   let produtoId = response.json('_id');
//   console.log(`Produto criado com sucesso. ID: ${produtoId}`);

// }
