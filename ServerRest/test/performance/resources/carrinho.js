import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import { SharedArray } from "k6/data"
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js"
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"



export function getCarrinhos(queryParams, expectedStatus) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/carrinhos${queryParams}`, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        // 'carrinho encontrado': (r) => r.json().carrinhos[0].idUsuario === "0uxuPY0cbmQhpEz1",
      });

    // if (queryParams) {
    //     check(response, {
    //         'id do carrinho encontrado 5YFFHIslaMBSmUvT': (r) => r.json().carrinhos[0]._id === '5YFFHIslaMBSmUvT',
    //     });
    // }
    let idproduto = response.json()._id;
    return idproduto

    sleep(1); 
}


export function postCarrinhos(idProduto, quantidade, expectedStatus, expectedMessage, adminauthorization) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': adminauthorization,
    };

    let payload = JSON.stringify({
        produtos: [
            {
                idProduto: idProduto, // Corrigido para usar "idProduto" em vez de "produtoId"
                quantidade: quantidade,
            },
        ],
    });

    console.log(`Payload enviado para criar carrinho: ${payload}`);
    console.log(`Cabeçalhos enviados: ${JSON.stringify(headers)}`);

    let response = http.post(`${BASEURL}/carrinhos`, payload, { headers });

    console.log(`Resposta da API: ${response.status} - ${response.body}`);

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });

    return response; // Retorna o objeto de resposta HTTP
}
export function deleteCarrinhos(adminauthorization, expectedStatus, expectedMessage) {  
    
let headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': adminauthorization // Adiciona o cabeçalho de autorização   
    };
  
    // console.log(`Enviando requisição para excluir produto com ID: ${produtoId}`);
        let response = http.del(`${BASEURL}/carrinhos/concluir-compra`,null, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });

    return response;
}