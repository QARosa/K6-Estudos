import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { BASEURL } from '../utils.js';

export let options = {
    stages: [
        { duration: '1m', target: 10 }, // Ramp-up to 10 users over 1 minute
        { duration: '3m', target: 10 }, // Stay at 10 users for 3 minutes
        { duration: '1m', target: 0 },  // Ramp-down to 0 users over 1 minute
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% das requisições devem ser menores que 500ms
    },
};

export default function () {
    group('Produtos API', function () {
        group('GET /produtos', function () {
            let response = http.get(`${BASEURL}/produtos`);
            check(response, {
                'status is 200': (r) => r.status === 200,
            });
            sleep(1);
        });

        group('POST /produtos - Sucesso', function () {
            let headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer token_valido'
            };
            let payload = JSON.stringify({
                nome: `Produto_${Math.random().toString(36).substring(7)}`,
                preco: 49.99,
                descricao: "Mouse",
                quantidade: 381
            });
            let response = http.post(`${BASEURL}/produtos`, payload, { headers });
            check(response, {
                'status is 201': (r) => r.status === 201,
                'message is success': (r) => r.json('message') === 'Cadastro realizado com sucesso'
            });
            sleep(1);
        });

        group('POST /produtos - Nome já existente', function () {
            let headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer token_valido'
            };
            let payload = JSON.stringify({
                nome: 'ProdutoExistente',
                preco: 49.99,
                descricao: "Mouse",
                quantidade: 381
            });
            let response = http.post(`${BASEURL}/produtos`, payload, { headers });
            check(response, {
                'status is 400': (r) => r.status === 400,
                // 'message is name exists': (r) => r.json('message') === 'Já existe produto com esse nome'
            });
            sleep(1);
        });

        group('POST /produtos - Token inválido', function () {
            let headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer token_invalido'
            };
            let payload = JSON.stringify({
                nome: `Produto_${Math.random().toString(36).substring(7)}`,
                preco: 49.99,
                descricao: "Mouse",
                quantidade: 381
            });
            let response = http.post(`${BASEURL}/produtos`, payload, { headers });
            check(response, {
                'status is 401': (r) => r.status === 401,
                // 'message is token invalid': (r) => r.json('message') === 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'
            });
            sleep(1);
        });

        group('POST /produtos - Não administrador', function () {
            let headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer token_de_usuario_nao_admin'
            };
            let payload = JSON.stringify({
                nome: `Produto_${Math.random().toString(36).substring(7)}`,
                preco: 49.99,
                descricao: "Mouse",
                quantidade: 381
            });
            let response = http.post(`${BASEURL}/produtos`, payload, { headers });
            check(response, {
                'status is 403': (r) => r.status === 403,
                'message is admin only': (r) => r.json('message') === 'Rota exclusiva para administradores'
            });
            sleep(1);
        });

        group('GET /produtos/{_id}', function () {
            let response = http.get(`${BASEURL}/produtos/BeeJh5lz3k6kSIzA`);
            check(response, {
                'status is 200': (r) => r.status === 200,
            });
            sleep(1);
        });

        group('PUT /produtos/{_id}', function () {
            let headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer token_valido'
            };
            let payload = JSON.stringify({
                nome: 'Produto Atualizado',
                preco: 99.99,
                descricao: "Mouse Atualizado",
                quantidade: 100
            });
            let response = http.put(`${BASEURL}/produtos/BeeJh5lz3k6kSIzA`, payload, { headers });
            check(response, {
                'status is 200': (r) => r.status === 200,
            });
            sleep(1);
        });

        group('DELETE /produtos/{_id}', function () {
            let headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer token_valido'
            };
            let response = http.del(`${BASEURL}/produtos/BeeJh5lz3k6kSIzA`, null, { headers });
            check(response, {
                'status is 200': (r) => r.status === 200,
            });
            sleep(1);
        });
    });
}