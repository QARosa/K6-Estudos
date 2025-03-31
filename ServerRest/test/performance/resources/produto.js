import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import { postLogin } from './login.js';


export function getProdutos() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let response = http.get(`${BASEURL}/produtos`, { headers });
    check(response, {
        'status is 200': (r) => r.status === 200,
        'quantidade is 2': (r) => r.json().quantidade === 2,
    });
}

export function getIdProdutos() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let response = http.get(`${BASEURL}/produtos${queryParams}`, { headers });
    check(response, {
        'status is 200': (r) => r.status === 200,
        'id encontrado BeeJh5lz3k6kSIzA': (r) => r.json().produtos[0]._id === 'BeeJh5lz3k6kSIzA',
        'produto encontrado': (r) => r.json().produtos[0].nome === "Logitech MX Vertical",
    });

}

export function postProdutosAdmin(nome, preco, descricao, quantidade, expectedStatus, expectedMessage,authorization) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `${authorization}`,
    };
    let payload = JSON.stringify({
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade,
    });

    console.log(`Enviando requisição para criar produto: ${nome}`);
    let response = http.post(`${BASEURL}/produtos`, payload, { headers });
    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });

    if (response.status !== expectedStatus) {
        console.error(`Erro ao criar produto: Status esperado ${expectedStatus}, mas recebido ${response.status}`);
        console.error(`Resposta da API: ${response.body}`);
    } else {
        console.log('Produto criado com sucesso.');
        console.log(`Mensagem da API: ${response.json().message}`);
    }

    sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições
    return response; // Retorna o objeto de resposta HTTP
}

export function postProdutosNoAdmin(nome, preco, descricao, quantidade, expectedStatus, expectedMessage,authorization) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `${authorization}`,
       
    };
    let payload = JSON.stringify({
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade,
    });

    console.log(`Enviando requisição para criar produto: ${nome}`);
    let response = http.post(`${BASEURL}/produtos`, payload, { headers });
    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });

    if (response.status !== expectedStatus) {
        console.error(`Erro ao criar produto: Status esperado ${expectedStatus}, mas recebido ${response.status}`);
        console.error(`Resposta da API: ${response.body}`);
    } else {
        console.log('Produto criado com sucesso.');
        console.log(`Mensagem da API: ${response.json().message}`);
    }

    sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições
    return response; // Retorna o objeto de resposta HTTP
}