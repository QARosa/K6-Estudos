import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import { SharedArray } from "k6/data"
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js"
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"
import { postLogin } from './login.js';




// export function getCarrinhos(queryParams, expectedStatus, expectedQtdeCarrinhos) {

export function getCarrinhos(queryParams, expectedStatus) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/carrinhos${queryParams}`, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        // [`quantidade is ${expectedQtdeCarrinhos}`]: (r) => r.json().quantidade.every(carrinho => carrinho.quantidade === expectedQtdeCarrinhos),
    });

    if (response.status !== 200) {
        console.error(`Erro ao obter carrinhos: Status esperado 200, mas recebido ${response.status}`);
        console.error(`Resposta da API: ${response.body}`);
    } else {
        console.log('Carrinhos obtidos com sucesso.');
        // console.log(`Quantidade de carrinhos: ${response.json().quantidade.length}`);
    }

    sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições

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