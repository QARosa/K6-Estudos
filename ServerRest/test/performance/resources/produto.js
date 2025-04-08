import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import { postLogin } from './login.js';

export function postProdutos(nome, preco, descricao, quantidade, expectedStatus, expectedMessage, authorization) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': authorization
    };
    let payload = JSON.stringify({
        "nome": nome,
        "preco": preco,
        "descricao": descricao,
        "quantidade": quantidade
      });
    let response = http.post(`${BASEURL}/produtos`, payload, { headers });
    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json('message') === expectedMessage        
    });
    sleep(1);
    let _id = response.json('_id');
    return _id;
}