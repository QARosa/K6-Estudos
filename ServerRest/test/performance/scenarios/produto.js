import { postLogin } from '../resources/login.js';
import { postUsuariosAdm } from './usuarios.js';
import { postProdutos } from '../resources/produto.js';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";




export function consultarProdutos() {
  getIdProdutos()  
  getProdutos()

}


export function AdminCriarProduto() {
  console.log('Iniciando teste para criar produto com sucesso...');

  // Criar usuário administrador e obter e-mail e senha
  let admin = postUsuariosAdm();
  if (!admin || !admin.email || !admin.password) {
      console.error('Erro: Não foi possível criar o usuário administrador.');
      return;
  }

  let email = admin.email;
  let password = admin.password;
  console.log(`Usuário administrador criado com e-mail: ${email}`);

  // Realiza o login e obtém o token de autenticação
  let authorization = postLogin(email, password, 200, 'Login realizado com sucesso');
  if (!authorization) {
      console.error('Erro: Não foi possível obter o token de autenticação.');
      return;
  }
  console.log(`Token de autenticação: ${authorization}`);

  // Criar um produto usando o token
  let nome = "Teste Produto" + randomIntBetween(1, 100000); // Nome único para cada execução
  let preco = 150.00;
  let descricao = "Mouse Teste";
  let quantidade = 10;
  let expectedStatus = 201;
  let expectedMessage = 'Cadastro realizado com sucesso';

  let response = postProdutos(nome, preco, descricao, quantidade, expectedStatus, expectedMessage, authorization);
  if (!response) {
      console.error('Erro: Não foi possível criar o produto.');
      return;
  }

  let produtoId = response.json('_id');
  console.log(`Produto criado com sucesso. ID: ${produtoId}`);
}

export function getProdutos() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let response = http.get(`${BASEURL}/produtos`, { headers });
    check(response, {
        'status is 200': (r) => r.status === 200,
        'quantidade is greater than 0': (r) => r.json().quantidade > 0,
    });
    sleep(1); 
}
export function getIdProdutos() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let response = http.get(`${BASEURL}/produtos/648c9a1e2f8b4f001f3f5d3b`, { headers });
    check(response, {
        'status is 200': (r) => r.status === 200,
        'quantidade is greater than 0': (r) => r.json().quantidade > 0,
    });
    sleep(1); 
}
