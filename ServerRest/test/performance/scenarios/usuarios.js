import { group } from 'k6';
import { SharedArray } from "k6/data"
import { getUsuarios, getAllUsuarios, postUsuarios,deleteUsuarios } from '../resources/usuarios.js';
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"

// Carregar dados de teste de um arquivo JSON
const usuarios = new SharedArray('Usuários', function () {
  return JSON.parse(open('../data/usuarios.json')); // Certifique-se de criar um arquivo JSON com dados de teste
});


export function getUsuariosAdm() {
  getUsuarios('?administrador=true', 200, true);
}

export function getUsuariosNoAdm() {
  getUsuarios('?administrador=false', 200, false);
}

export function getAllUsuariosScenario() {
  getAllUsuarios();
  
}

export function postUsuariosAdm() {
  let usuario = randomItem(usuarios);
  let nome = "Fulano da Silva";
  let email = `${randomIntBetween(1,4000)}beltrano@qa.com.br`;
  let password = "teste";
  let administrador = "true";

  console.log(`Criando usuário administrador: ${email}`);
  let response = postUsuarios(nome, email, password, administrador, 201, 'Cadastro realizado com sucesso');

  let userId = response.json('_id');
  console.log(`Usuário administrador criado com ID: ${userId}`);
  return userId; // Retorna o ID para uso posterior
}

export function postUsuariosNoAdm() {
  let nome = "Fulano da Silva";
  let email = `${randomString(10)}@email.com`;
  let password = "teste";
  let administrador = "false";

  console.log(`Criando usuário não administrador: ${email}`);
  let response = postUsuarios(nome, email, password, administrador, 201, 'Cadastro realizado com sucesso');

  let userId = response.json('_id');
  console.log(`Usuário administrador criado com ID: ${userId}`);
  return userId; // Retorna o ID para uso posterior
}

export function deleteUsuarioScenario() {
  // Criar um usuário não administrador e salvar o ID
  let userId = postUsuariosNoAdm();

  if (!userId) {
    console.error('Erro: Não foi possível criar o usuário para exclusão.');
    return;
  }

  // Excluir o usuário criado
  console.log(`Tentando excluir o usuário com ID: ${userId}`);
  let response = deleteUsuarios(userId); // Chama a função de recurso para exclusão

  // Verificar se a exclusão foi bem-sucedida
  check(response, {
    'status is 200': (r) => r.status === 200,
    'Registro excluído com sucesso': (r) => r.json().message === 'Registro excluído com sucesso',
  });

  if (response.status !== 200) {
    console.error(`Erro ao excluir usuário com ID ${userId}: Status esperado 200, mas recebido ${response.status}`);
    console.error(`Resposta da API: ${response.body}`);
  } else {
    console.log(`Usuário com ID ${userId} excluído com sucesso.`);
  }

  sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições
}

export function criarEExcluirUsuarioAdm() {
  // Criar um usuário administrador e salvar o ID
  let userId = postUsuariosNoAdm();
  // Excluir o usuário criado
  deleteUsuarioScenario(userId);
}