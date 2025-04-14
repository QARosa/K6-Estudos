import http from "k6/http";
import { check, sleep } from "k6";
import { BASEURL } from "../utils.js";
import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { randomItem,randomString,randomIntBetween,} from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import { postUsuariosNoAdm } from "../scenarios/usuarios.js";

export function getUsuarios(queryParams, expectedStatus) {
  let headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  let response = http.get(`${BASEURL}/usuarios${queryParams}`, { headers });

  check(response, {
    [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
    // [`administrador is ${expectedAdminStatus}`]: (r) => r.json().usuarios.every(user => user.administrador === expectedAdminStatus),
  });
  let userId = response.json("_id");
  console.log(`Usuario criado com sucesso. ID: ${userId}`);
  return userId;
}

// Função para criar um novo usuário
export function postUsuarios(nome, email, password, administrador, expectedStatus, expectedMessage) {
  let headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
  };

  let payload = JSON.stringify({
      nome: nome,
      email: email,
      password: password,
      administrador: administrador,
  });

  console.log(`Enviando requisição para criar usuário: ${email}`);
  let response = http.post(`${BASEURL}/usuarios`, payload, { headers });

  check(response, {
      [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
      [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
  });

  if (response.status !== expectedStatus) {
      console.error(`Erro ao criar usuário: ${response.body}`);
      return null;
  }

  return response; // Retorna o objeto de resposta HTTP
}

export function deleteUsuarios(userId, expectedStatus, expectedMessage) {
  let headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  };

  console.log(`Enviando requisição para excluir usuário com ID: ${userId}`);
  let response = http.del(`${BASEURL}/usuarios/${userId}`, null, { headers });

  check(response, {
    [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
    [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
  });

  return response; // Retorna o objeto de resposta HTTP
}
export function putUsuarios(userId, nome, email, password, administrador,expectedStatus, expectedMessage) {
  let headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  };

  let payload = JSON.stringify({
    nome: nome,
    email: email,
    password: password,
    administrador: administrador,
  });

  let response = http.put(`${BASEURL}/usuarios/${userId}`, payload, { headers });

  check(response, {
    [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
    [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
  });

  return response; // Retorna o objeto de resposta HTTP
}
