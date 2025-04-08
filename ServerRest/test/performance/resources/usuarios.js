import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import { SharedArray } from "k6/data"
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js"
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"

// const usuarios = new SharedArray("usuarios", function () {
// 	return papaparse.parse(open("../data/usuarios.json"), {
// 		delimiter: ",",
// 		header: true,
// 	}).data
// })



export function getUsuarios(queryParams, expectedStatus, expectedAdminStatus) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/usuarios${queryParams}`, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`administrador is ${expectedAdminStatus}`]: (r) => r.json().usuarios.every(user => user.administrador === expectedAdminStatus),
    });

    sleep(1); 
}

export function getAllUsuarios() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/usuarios`, { headers });

    check(response, {
        'status is 200': (r) => r.status === 200,
        'quantidade is greater than 0': (r) => r.json().quantidade > 0,
    });

    sleep(1); 
}

// Função para criar um novo usuário
export function postUsuarios(nome, email, password, administrador, expectedStatus, expectedMessage) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    
    let payload = JSON.stringify({
        nome: nome,
        email: email,
        password: password,
        administrador: administrador,
    });

    let response = http.post(`${BASEURL}/usuarios`, payload, { headers });

    // Verificar se a resposta tem o status e a mensagem esperados
    check(response, {
      [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
      [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });
  
    sleep(1);
    let _id = response.json('_id');
    return _id;
  }

export function deleteUsuarios(userId) {
    if (!userId) {
      console.error('Erro: ID inválido ou não fornecido para exclusão.');
      return;
    }
  
    let headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    };
  
    let response = http.del(`${BASEURL}/usuarios/${userId}`, null, { headers });

    // Retorna o objeto de resposta para ser usado no cenário
    return response;
  }

  export function putUsuarios(userId, nome, email, password, administrador) {
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
    return http.put(`${BASEURL}/usuarios/${userId}`, payload, { headers });
  }