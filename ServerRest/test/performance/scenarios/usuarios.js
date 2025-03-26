import { group } from 'k6';
import { SharedArray } from "k6/data"
import { getUsuarios, getAllUsuarios, postUsuarios } from '../resources/usuarios.js';
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
  let email = `${randomIntBetween(1,400)}beltrano@qa.com.br`;
  let password = "teste";
  let administrador = "true";

  console.log(`Criando usuário administrador: ${email}`);
  postUsuarios(nome, email, password, administrador, 201, 'Cadastro realizado com sucesso');
}

export function postUsuariosNoAdm() {
  let usuario = randomItem(usuarios);
  let nome = "Fulano da Silva";
  let email = `${randomIntBetween(1,400)}beltrano@qa.com.br`;
  let password = "teste";
  let administrador = "false";

  console.log(`Criando usuário não administrador: ${email}`);
  postUsuarios(nome, email, password, administrador, 201, 'Cadastro realizado com sucesso');

  // // Salvar o ID do usuário criado
  // let userId = response.json('_id');
  // console.log(`Usuário administrador criado com ID: ${userId}`);
  // return userId; // Retorna o ID para uso posterior
}

export function deleteUsuarios() {
  // Cenário 1: Exclusão bem-sucedida
  let userId = '1mh337kDCc5h87I6'; // Substitua por um ID válido
  deleteUsuarios(userId);

}

//   // Cenário 2: Exclusão de um ID inexistente
//   let invalidId = 'IDInexistente123';
//   console.log('Cenário 2: Tentando excluir um ID inexistente');
//   deleteUsuarios(invalidId);

//   // Cenário 3: Exclusão com ID inválido
//   let nullId = null;
//   console.log('Cenário 3: Tentando excluir com ID inválido');
//   deleteUsuarios(nullId);
// }