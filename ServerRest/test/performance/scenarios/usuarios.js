import { group, check } from 'k6';
import { SharedArray } from "k6/data"
import{deleteUsuarios, getUsuarios, postUsuarios, putUsuarios} from '../resources/usuarios.js';
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"


// Carregar dados de teste de um arquivo JSON
const usuarios = new SharedArray('Usuários', function () {
  return JSON.parse(open('../data/usuarios.json')); // Certifique-se de criar um arquivo JSON com dados de teste
});

function generateUniqueEmail() {
  return `${randomIntBetween(1, 100000)}_${randomString(5)}@qa.com`;
}

export function ConsultarAdmin() {
  getUsuarios('?administrador=true', 200, true);
}

export function ConsultarUsers() {
  getUsuarios('?administrador=false', 200, false);
}

export function ConsultarTodos() {
  getUsuarios('', 200);
}

export function postUsuariosAdm() {
  let nome = "UsuarioAministrador " + randomIntBetween(1, 100000); // Nome único para cada execução
  let email = generateUniqueEmail(); 
  let password = 'teste';
  let administrador = 'true';

  console.log(`Criando usuário administrador: ${email}`);
  let response = postUsuarios(nome, email, password, administrador, 201, 'Cadastro realizado com sucesso');

  if (response.status !== 201) {
      console.error(`Erro ao criar usuário administrador: ${response.body}`);
      return null;
  }

  let userId = response.json('_id');
  console.log(`Usuário criado com sucesso. ID: ${userId}`);
  return [email, password,userId];
}

export function postUsuariosNoAdm() {
  let nome = "Usuario" + randomIntBetween(1, 100000); // Nome único para cada execução
  let email = generateUniqueEmail(); 
  let password = "teste";
  let administrador = "false";

  let response = postUsuarios(nome, email, password, administrador, 201, 'Cadastro realizado com sucesso');
  
  let userId = response.json('_id');
  console.log(`Usuário criado com sucesso. ID: ${userId}`);
  return [email, password, userId]; // Retorna o e-mail, senha e ID do usuário
}


export function deletarUsuario(userId) {
   let response = deleteUsuarios(userId, 200, 'Registro excluído com sucesso'); // Chama a função de recurso para exclusão

   check(response, {
      'status is 200': (r) => r.status === 200,
      'Registro excluído com sucesso': (r) => r.json().message === 'Registro excluído com sucesso',
  });  
}

export function AlterarUsuario(userId) {

  let nome = "Usuario_Alterado" + randomIntBetween(1, 100000); // Nome único para cada execução
  let email = generateUniqueEmail(); 
  let password = "teste";
  let administrador = "false";

  let response = putUsuarios(userId, nome, email, password, administrador, 200, 'Registro alterado com sucesso'); // Chama a função de recurso para exclusão

  check(response, {
     'status is 200': (r) => r.status === 200,
     'Registro alterado com sucesso': (r) => r.json().message === 'Registro alterado com sucesso',
 });  
}


