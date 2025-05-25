import http from 'k6/http';
import { sleep, group, check, fail } from 'k6';
import { loginEmailInvalido, loginSenhaInvalida, loginCamposVazios, loginUser, loginAdmin } from './scenarios/login.js';
import { ConsultarAdmin, ConsultarUsers,ConsultarTodos,postUsuariosAdm,postUsuariosNoAdm,deletarUsuario, AlterarUsuario } from './scenarios/usuarios.js';
import { consultarIdProdutos, consultarTodosProdutos, AdminCriarProduto, deletarProdutos, AlterarProduto } from './scenarios/produto.js';
import {consultaIdCarrinho, consultaTodosCarrinhos, incluirCarrinho, deletarCarrinhos} from './scenarios/carrinho.js';


export const options = {
  scenarios: {
    //a ordenação dos testes será referenciada pela ordem descrita no cenário
    //o nome do cenário é o mesmo nome da função que será executada
    loginApi: {
      executor: 'constant-arrival-rate',
      rate: 1, // 1 requisição por segundo
      timeUnit: '1s', // por segundo
      duration: '1m', // duração do teste
      preAllocatedVUs: 1, // número de VUs pré-alocados
      maxVUs: 1, // número máximo de VUs
      exec: 'loginApi', // função a ser executada
    }
    // produtoApi: {
    //   executor: 'constant-arrival-rate',
    //   rate: 1, // 1 requisição por segundo
    //   timeUnit: '1s', // por segundo
    //   duration: '30s', // duração do teste
    //   preAllocatedVUs: 1, // número de VUs pré-alocados
    //   maxVUs: 10, // número máximo de VUs
    //   exec: 'produtoApi', // função a ser executada
    // },
    // ecommercePerfmormance: {  
    //   executor: 'ramping-vus',
    //   startVUs:1, // número de VUs
    //   stages: [
    //     { duration: '1m', target: 10 }, // aumenta para 10 VUs em 1 minuto
    //     { duration: '1m', target: 0 }, // diminui para 0 VUs em 1 minuto
    //   ],
    //   exec: 'cenarioEcommerce', // função a ser executada  
    // }
  },
}

export function loginApi() {
  group('Login API', function () {
    group('POST /login - E-mail inválido', function () {
      loginEmailInvalido();
    });

    group('POST /login - Senha inválida', function () {
      loginSenhaInvalida();
    });

    group('POST /login - Campos vazios', function () {
      loginCamposVazios();
    });

    group('POST /login - Login User', function () {
      postUsuariosAdm()
      loginUser();
    });

    group('POST /login - Login Admin', function () {
      postUsuariosNoAdm()
      loginAdmin();
    });
  });

  group('Usuários API', function () {

      group('GET /admin', function () {
        ConsultarAdmin();
      });

      group('GET /users', function () {
        ConsultarUsers();
      });

      group('GET /todos', function () {
        ConsultarTodos();
      });

      group('POST /usuarios - Administrador', function () {
        postUsuariosAdm();
      });
      group('POST /usuarios - Não Administrador', function () {
        postUsuariosNoAdm();
      });

      group('DELETE/ Cenário de exclusão de usuários', function () {
        let [email, password, userId] = postUsuariosNoAdm();
        deletarUsuario(userId);
      });

      group('UPDATE/ Cenário de alteração de usuários', function () {
        let [email, password, userId] = postUsuariosNoAdm();
        AlterarUsuario(userId);
      });     
    }
  );

  group('Produtos API', function () {
    group('GET /produtos', function () {
      consultarIdProdutos();
    });

    group('GET /Todos produtos', function () {
      consultarTodosProdutos();
    });

    group('Admin Cadastro Produto', function () {
      let adminauthorization = loginAdmin();
      AdminCriarProduto(adminauthorization);
    });

     group('DELETE/ Cenário de exclusão de produtos', function () {  
      let adminauthorization = loginAdmin();
      let produtoId = AdminCriarProduto(adminauthorization);
      deletarProdutos(produtoId, adminauthorization); // Chama a função de recurso para exclusão 
     });   
     
    group('PUT/ Alterar produtos', function () {  
      let adminauthorization = loginAdmin(); // Obtém o token de autenticação do administrador
      let produtoId = AdminCriarProduto(adminauthorization); // Cria o produto e obtém o ID
      AlterarProduto(adminauthorization, produtoId); // Chama a função de recurso para alteração
      }
    );}
 ); 

  group('Carrinho API', function () {

  group('GET /carrinho', function () {
    consultaIdCarrinho();
  });

  group('GET /Todos carrinho', function () {
    consultaTodosCarrinhos();
  }); 

  group('POST/ Admin Cadastro carrinho', function () {
    let [email, password, userId] = postUsuariosAdm(); // Cria um usuário administrador
    let adminauthorization = loginAdmin(email, password); // Obtém o token de autenticação do administrador
    let idProduto = AdminCriarProduto(adminauthorization); // Cria um produto e obtém o ID
    incluirCarrinho(adminauthorization, idProduto); // Adiciona o produto ao carrinho e obtém o ID do carrinho
  });
  
  group('DELET/ Admin Cadastro carrinho', function () {
    let [email, password, userId] = postUsuariosAdm(); // Cria um usuário administrador
    let adminauthorization = loginAdmin(email, password); // Obtém o token de autenticação do administrador
    deletarCarrinhos(adminauthorization); // Adiciona o produto ao carrinho e obtém o ID do carrinho

  });
});
}

  
  
