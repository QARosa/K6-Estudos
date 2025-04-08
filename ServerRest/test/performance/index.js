import http from 'k6/http';
import { sleep, group, check, fail } from 'k6';
import { loginSucesso, loginSucessoFaker, loginEmailInvalido, loginSenhaInvalida, loginCamposVazios } from './scenarios/login.js';
import { AdminCriarProduto } from './scenarios/produto.js';
import { getUsuariosAdm, getUsuariosNoAdm, getAllUsuariosScenario, postUsuariosAdm, postUsuariosNoAdm, criarEExcluirUsuarioAdm, criaAlterUsuarioAdm } from './scenarios/usuarios.js';
import { getAllCarrinhos, getIdCarrinhos, PostCarrinhosOK } from './scenarios/carrinho.js';
import { PostCarrinhos } from './resources/carrinho.js';

export const options = {
  scenarios: {
    //a ordenação dos testes será referenciada pela ordem descrita no cenário
    //o nome do cenário é o mesmo nome da função que será executada
    // loginApi: {
    //   executor: 'constant-arrival-rate',
    //   rate: 1, // 1 requisição por segundo
    //   timeUnit: '1s', // por segundo
    //   duration: '1m', // duração do teste
    //   preAllocatedVUs: 1, // número de VUs pré-alocados
    //   maxVUs: 10, // número máximo de VUs
    //   exec: 'loginApi', // função a ser executada
    // },
    produtoApi: {
      executor: 'constant-arrival-rate',
      rate: 1, // 1 requisição por segundo
      timeUnit: '1s', // por segundo
      duration: '30s', // duração do teste
      preAllocatedVUs: 1, // número de VUs pré-alocados
      maxVUs: 10, // número máximo de VUs
      exec: 'produtoApi', // função a ser executada
    },
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

// export function loginApi() {
//   group('Login API', function () {
//     group('POST /login - Sucesso', function () {
//       loginSucesso();
//     });

//     group('POST /login - E-mail inválido', function () {
//       loginEmailInvalido();
//     });

//     group('POST /login - Senha inválida', function () {
//       loginSenhaInvalida();
//     });

//     group('POST /login - Campos vazios', function () {
//       loginCamposVazios();
//     });

//     group('POST /login - SucessoFaker', function () {
//       loginSucessoFaker();
//     });
//   });

  export function produtoApi() {
    group('Produto', function () {
    //   group('lista produtos', function () {
    //     getProdutos();
    //   });

    //   group('id produtos', function () {
    //     getIdProdutos();
    //   });

      group('Admin Cadastro Produto', function () {
        AdminCriarProduto();
     });

  //    group('User Cadastro Produto', function () {
  //     postProdutoUser();
  //  });
  });


  //   //   sleep(1); // Simula um tempo de espera de 1 segundo entre os grupos
  //   // });


  //   // group('Usuários API', function () {
  //   //   //   group('GET /usuarios?administrador=true', function () {
  //   //   //       getUsuariosAdm();
  //   //   //   });

  //   //   //   group('GET /usuarios?administrador=false', function () {
  //   //   //       getUsuariosNoAdm();
  //   //   //   });

  //   //   //   group('GET /usuarios', function () {
  //   //   //       getAllUsuariosScenario();
  //   //   //   });

  //   //   //   group('POST /usuarios - Administrador', function () {
  //   //   //     postUsuariosAdm  ();
  //   //   //   });

  //   //   //   group('POST /usuarios - Não Administrador', function () {
  //   //   //       postUsuariosNoAdm ();
  //   //   //   });

  //   //   //   group('Delete /usuarios - Não Administrador', function () {
  //   //   //     criarEExcluirUsuarioAdm ();
  //   //   // });

  //   // group('Put /usuarios - Não Administrador', function () {
  //   //   criaAlterUsuarioAdm(); 
  //   // });

  //   // group('Carrinhos API', function () {
  //   //   // group('GET /carrinhos', function () {
  //   //   //   getAllCarrinhos();
  //   //   // });

  //   //   // group('GET /carrinhos', function () {
  //   //   //   getIdCarrinhos();
  //   //   // });

  //   //   group('Post /carrinhos', function () {
  //   //     PostCarrinhos();
  //   //   });

  //   //   sleep(1); // Simula um tempo de espera de 1 segundo entre os grupos
  // });
}

// export function cenarioEcommerceAdmin () {

//   //descrever os steps de fluxos de negocios que deveremos executar
//   // 2. Criar um usuário administrador
//   // 1. Login com usuário administrador
//   // 3. Criação de um produto
//   // 4. Criar um carrinho
//   // 5. Realizar checkout do carrinho
//   // 6. Criar um pedido

//   // loginSucesso (); //executar o 



// }