import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import {postLogin } from './login.js';


export function getProdutos(queryParams, expectedStatus) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/produtos${queryParams}`, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        'produto encontrado': (r) => r.json().produtos[0].nome === "Logitech MX Vertical",
      });

    if (queryParams) {
        check(response, {
            'id encontrado BeeJh5lz3k6kSIzA': (r) => r.json().produtos[0]._id === 'BeeJh5lz3k6kSIzA',
        });
    }
    let idproduto = response.json().produtos[0]._id;
    return idproduto

    sleep(1); 
}

export function postProdutos(nome, preco, descricao, quantidade, expectedStatus, expectedMessage, adminauthorization) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': adminauthorization,
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
        console.error(`Erro ao criar produto: ${response.body}`);
        return null;
    }

    return response; // Retorna o objeto de resposta HTTP
}

export function deleteProdutos(adminauthorization, produtoId, expectedStatus, expectedMessage) {
    
    let headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': adminauthorization // Adiciona o cabeçalho de autorização   
    };
  
    console.log(`Enviando requisição para excluir produto com ID: ${produtoId}`);
        let response = http.del(`${BASEURL}/produtos/${produtoId}`,null, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });

    return response;
}
  export function putProdutos(produtoId, nome, preco, descricao, quantidade, adminauthorization,expectedStatus, expectedMessage) {
    let headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': adminauthorization, // Adiciona o cabeçalho de autorização   

    };
  
    let payload = JSON.stringify({
      nome: nome,
      preco: preco,
      descricao: descricao,
      quantidade: quantidade,
    });
    console.log(`Enviando requisição para alterar produto com ID: ${produtoId}`);
    let response = http.put(`${BASEURL}/produtos/${produtoId}`, payload, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });

    if (response.status !== expectedStatus) {
        console.error(`Erro ao alterar produto com ID ${produtoId}: ${response.body}`);
        return null;
    }

    console.log(`Produto com ID ${produtoId} alterado com sucesso.`);
    return response; // Retorna o objeto de resposta HTTP
}