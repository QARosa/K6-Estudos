import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import { postLogin } from './login.js';


export function getProdutos(queryParams, expectedStatus) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/produtos${queryParams}`, { headers });

    check(response, {
        'status is 200': (r) => r.status === 200,
        'produto encontrado': (r) => r.json().produtos[0].nome === "Logitech MX Vertical",
        //entender pq consulta com todos produtos está apresentando erro ao pesquisar o nome do produto
    });

    if (queryParams) {
        check(response, {
            'id encontrado BeeJh5lz3k6kSIzA': (r) => r.json().produtos[0]._id === 'BeeJh5lz3k6kSIzA',
        });
    }

    sleep(1); 
}

export function postProdutos(nome, preco, descricao, quantidade, expectedStatus, expectedMessage, authorization) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': authorization,
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

export function deleteProdutos(authorization, produtoId, expectedStatus, expectedMessage) {
    
    let headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluXzgxNTIyQHFhLmNvbSIsInBhc3N3b3JkIjoidGVzdGUiLCJpYXQiOjE3NDQxNjcxNDUsImV4cCI6MTc0NDE2Nzc0NX0.QMZ3X8OHGSpwdotXvkFIt8opGR9Dx59KtXkpKUOosjQ'
    //   'Authorization': authorization,      
    };
  
    console.log(`Enviando requisição para excluir produto com ID: ${produtoId}`);
        let response = http.del(`${BASEURL}/produtos/${produtoId}`,null, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`message is ${expectedMessage}`]: (r) => r.json().message === expectedMessage,
    });

    return response;
}
//   export function putUsuarios(userId, nome, email, password, administrador) {
//     let headers = {
//       'Content-Type': 'application/json',
//       'accept': 'application/json',
//     };
  
//     let payload = JSON.stringify({
//       nome: nome,
//       email: email,
//       password: password,
//       administrador: administrador,
//     });
//     return http.put(`${BASEURL}/usuarios/${userId}`, payload, { headers });
//   }