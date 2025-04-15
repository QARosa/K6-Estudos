import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import { SharedArray } from "k6/data"
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js"
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"
import { postLogin } from './login.js';


export function getCarrinhos(queryParams, expectedStatus) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/carrinhos${queryParams}`, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        'carrinho encontrado': (r) => r.json().carrinhos[0].idUsuario === "0uxuPY0cbmQhpEz1",
      });

    if (queryParams) {
        check(response, {
            'id do carrinho encontrado qbMqntef4iTOwWfg': (r) => r.json().carrinhos[0]._id === 'qbMqntef4iTOwWfg',
        });
    }
    let idproduto = response.json()._id;
    return idproduto

    sleep(1); 
}


export function PostCarrinhos(idProduto, quantidade, expectedStatus, expectedMessage, authorization) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${authorization}`
    };

    let payload = JSON.stringify({
        "produtos": [
            {
                idProduto: idProduto,
                quantidade: quantidade,
            },
        ],
    });

    console.log(`Enviando requisição para criar carrinho com idProduto: ${idProduto}, quantidade: ${quantidade}`);
    let response = http.post(`${BASEURL}/carrinhos`, payload, { headers });

    // Verificar se a resposta foi bem-sucedida e validar os dados retornados
    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });
}