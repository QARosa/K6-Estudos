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
export function postUsuarios(nome, email, password, administrador) {
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

    check(response, {
        'status is 201': (r) => r.status === 201,
        'Cadastro realizado com sucesso': (r) => r.json().message === 'Cadastro realizado com sucesso',});
    

    if (response.status !== 201) {
        console.error(`Erro: Status esperado 201, mas recebido ${response.status}`);
    }

    sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições
}


export function deleteUsuarios() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.del(`${BASEURL}/usuarios/${id}`, null, { headers });

    check(response, {
        'status is 200': (r) => r.status === 200,
        'Registro excluído com sucesso': (r) => r.json().message === 'Registro excluído com sucesso',});
    

        if (response.status !== 200) {
            console.error(`Erro: Status esperado 200, mas recebido ${response.status}`);
            console.error(`Resposta da API: ${response.body}`);
        } else {
            console.log(`Usuário com ID ${id} excluído com sucesso.`);
        }
    
        sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições
    }