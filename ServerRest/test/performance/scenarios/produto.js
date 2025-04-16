import { check } from 'k6';
import { postLogin } from '../resources/login.js';
import { postUsuariosAdm } from './usuarios.js';
import { postProdutos, getProdutos, deleteProdutos, putProdutos} from '../resources/produto.js';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import { put } from 'k6/http';




export function consultarIdProdutos() {
    let idproduto = getProdutos('?_id=BeeJh5lz3k6kSIzA', 200,);
    return idproduto; 
}

export function consultarTodosProdutos() {
    getProdutos('', 200,);

}

export function AdminCriarProduto(adminauthorization) {
      // Criar um produto usando o token
    let nome = "Teste Produto " + randomIntBetween(1, 100000); // Nome único para cada execução
    let preco = 150.00;
    let descricao = "Mouse Teste";
    let quantidade = 10;
    let expectedStatus = 201;
    let expectedMessage = 'Cadastro realizado com sucesso';

    let response = postProdutos(nome, preco, descricao, quantidade, expectedStatus, expectedMessage, adminauthorization);
    let idProduto = response.json('_id');
    console.log(`Produto criado com sucesso. ID: ${idProduto}`);
    return idProduto; // Retorna apenas o ID do produto criado
}

export function deletarProdutos(idProduto, adminauthorization) {                                             
       // Excluir o produto criado
    let response = deleteProdutos(adminauthorization,produtoId, 200, 'Registro excluído com sucesso'); // Chama a função de recurso para exclusão

    if (!response || typeof response.json !== 'function') {
        console.error('Erro: Resposta inválida ao tentar excluir o produto.');
        return;
    }

    // Verificar se a exclusão foi bem-sucedida--não está sendo exluido pq aparesenta na consulta do swager
    check(response, {
        'status is 200': (r) => r.status === 200,
        'Registro excluído com sucesso': (r) => r.json().message === "Registro excluído com sucesso",
    });

    if (response.status !== 200) {
        console.error(`Erro ao excluir produto com ID ${idProduto}: Status esperado 200, mas recebido ${response.status}`);
        console.error(`Resposta da API: ${response.body}`);
    } else {
        console.log(`Produto com ID ${idProduto} excluído com sucesso.`);
    }

    // sleep(1); // Simula um tempo de espera de 1 segundo entre as requisições
}

export function AlterarProduto(adminauthorization,idProduto) {

    let nomeAlterado = "Produto Alterado " + randomIntBetween(1, 100000);
    let precoAlterado = 150.00;
    let descricaoAlterada = "Descrição Alterada";
    let quantidadeAlterada = 20;
    let expectedStatusAlteracao = 200;
    let expectedMessageAlteracao = 'Registro alterado com sucesso';

    let responseAlteracao = putProdutos(idProduto, nomeAlterado, precoAlterado, descricaoAlterada, quantidadeAlterada, adminauthorization, expectedStatusAlteracao, expectedMessageAlteracao);
    if (!responseAlteracao) {
        console.error('Erro: Não foi possível alterar o produto.');
        return;
    }

    console.log(`Produto com ID ${idProduto} alterado com sucesso.`);
}


  


