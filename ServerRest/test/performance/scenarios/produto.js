import { check } from 'k6';
import { postLogin } from '../resources/login.js';
import { postUsuariosAdm } from './usuarios.js';
import { postProdutos, getProdutos, deleteProdutos} from '../resources/produto.js';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";




export function consultarIdProdutos() {
    let idproduto = getProdutos('?_id=BeeJh5lz3k6kSIzA', 200,);
    return idproduto; 
}

export function consultarAllProdutos() {
    getProdutos('', 200,);

}

export function AdminCriarProduto(authorization) {
      // Criar um produto usando o token
    let nome = "Teste Produto " + randomIntBetween(1, 100000); // Nome único para cada execução
    let preco = 150.00;
    let descricao = "Mouse Teste";
    let quantidade = 10;
    let expectedStatus = 201;
    let expectedMessage = 'Cadastro realizado com sucesso';

    let response = postProdutos(nome, preco, descricao, quantidade, expectedStatus, expectedMessage, authorization);
    if (!response || typeof response.json !== 'function') {
        console.error('Erro: Resposta inválida ao tentar criar o produto.');
        return null;
    }

    let produtoId = response.json('_id');
    console.log(`Produto criado com sucesso. ID: ${produtoId}`);
    return produtoId; // Retorna apenas o ID do produto criado
}

export function deletarProdutos(produtoId) {                                             
       // Excluir o produto criado
    let response = deleteProdutos(produtoId, 200, 'Registro excluído com sucesso'); // Chama a função de recurso para exclusão

    if (!response || typeof response.json !== 'function') {
        console.error('Erro: Resposta inválida ao tentar excluir o produto.');
        return;
    }

    // Verificar se a exclusão foi bem-sucedida--não está sendo exluido pq aparesenta na consulta do swager
    check(response, {
        'status is 200': (r) => r.status === 200,
        'Registro excluído com sucesso': (r) => r.json().message === "Registro excluído com sucesso | Nenhum registro excluído",
    });

    if (response.status !== 200) {
        console.error(`Erro ao excluir produto com ID ${produtoId}: Status esperado 200, mas recebido ${response.status}`);
        console.error(`Resposta da API: ${response.body}`);
    } else {
        console.log(`Produto com ID ${produtoId} excluído com sucesso.`);
    }

    // sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições
}

  


