import { group } from 'k6';
import { SharedArray } from "k6/data"
import{postUsuarios} from '../resources/usuarios.js';
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"


// Carregar dados de teste de um arquivo JSON
const usuarios = new SharedArray('Usuários', function () {
  return JSON.parse(open('../data/usuarios.json')); // Certifique-se de criar um arquivo JSON com dados de teste
});

function generateUniqueEmail() {
  return `${randomIntBetween(1, 100000)}_${randomString(5)}@qa.com`;
}

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
  let email = `admin_${randomIntBetween(1, 100000)}@qa.com`;
  let password = 'teste';
  let administrador = 'true';

  console.log(`Criando usuário administrador: ${email}`);
  let response = postUsuarios('Admin User', email, password, administrador, 201, 'Cadastro realizado com sucesso');

  if (response.status !== 201) {
      console.error(`Erro ao criar usuário administrador: ${response.body}`);
      return null;
  }

  return { email, password }; // Retorna o e-mail e a senha do usuário criado
}

export function postUsuariosNoAdm() {
  let nome = "Fulano da Silva";
  let email = generateUniqueEmail(); 
  let password = "teste";
  let administrador = "false";

  console.log(`Criando usuário não administrador: ${email}`);
  let response = postUsuarios(nome, email, password, administrador, 201, 'Cadastro realizado com sucesso');

  let userId = response.json('_id');
  console.log(`Usuário administrador criado com email: ${userId}`);
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
  let response = deleteUsuarios(userId,200,'Registro excluído com sucesso'); // Chama a função de recurso para exclusão

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

export function putUsuarioScenario(userId) {
  if (!userId) {
    console.error('Erro: ID inválido ou não fornecido para alteração.');
    return;
  }

  // Alterar o usuário criado
  console.log(`Tentando alterar o usuário com ID: ${userId}`);
  let novoNome = "Fulano Alterado";
  let novoEmail = `${randomString(20)}emailalterado@email.com`;
  let novoPassword = "teste123";
  let administrador = "false";

  let response = putUsuarios(userId, novoNome, novoEmail, novoPassword, administrador); // Chama a função de recurso para alteração

  // Verificar se a alteração foi bem-sucedida
  check(response, {
    'status is 200': (r) => r.status === 200,
    'Registro alterado com sucesso': (r) => r.json().message === "Registro alterado com sucesso",
  });

  if (response.status !== 200) {
    console.error(`Erro ao alterar usuário com ID ${userId}: Status esperado 200, mas recebido ${response.status}`);
    console.error(`Resposta da API: ${response.body}`);
  } else {
    console.log(`Usuário com ID ${userId} alterado com sucesso.`);
  }

  sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições
}

export function criaAlterUsuarioAdm() {
  // Criar um usuário administrador e salvar o ID
  let userId = postUsuariosAdm(); // Certifique-se de que `postUsuariosAdm` retorna o ID do usuário criado

  if (!userId) {
    console.error('Erro: Não foi possível criar o usuário para alteração.');
    return;
  }

  // Alterar o usuário criado
  putUsuarioScenario(userId);
}


