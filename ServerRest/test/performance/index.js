import http from 'k6/http';
import { sleep, group, check, fail } from 'k6';
import { loginEmailInvalido,loginSenhaInvalida,loginCamposVazios,loginUser, loginAdmin} from './scenarios/login.js';
import { postUsuariosAdm, postUsuariosNoAdm} from './scenarios/usuarios.js';

export const options = {
  scenarios: {
    //a ordenação dos testes será referenciada pela ordem descrita no cenário
    //o nome do cenário é o mesmo nome da função que será executada
    loginApi: {
      executor: 'constant-arrival-rate',
      rate: 1, // 1 requisição por segundo
      timeUnit: '1s', // por segundo
      duration: '20s', // duração do teste
      preAllocatedVUs: 1, // número de VUs pré-alocados
      maxVUs: 10, // número máximo de VUs
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

  // export function produtoApi() {
  //   // group('Produto', function () {
  //   //   group('Produto por ID', function () {
  //   //     consultarIdProdutos();
  //   //   });

  //   //   group('consulta todos produtos', function () {
  //   //     consultarAllProdutos();
  //   //   });

  //   //   group('Admin Cadastro Produto', function () {
  //   //     AdminCriarProduto();
  //   //  });

  //    group('Delete Produto', function () {
  //    let [email,senha] = postUsuariosAdm();//email e senha do admin
  //    let adminauthorization = loginAdmin(email,senha);
  //    let produtoId = AdminCriarProduto(adminauthorization);
  //    let deletarProdutos = deletarProdutos(adminauthorization, produtoId);
  //    console.log(`Produto excluído com sucesso. ID: ${produtoId}`);
  //  });



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
//   // 4. Alterar o produto
//   // 5. Excluir o produto
//   // 6. Criar um carrinho
//   // 7. Realizar checkout do carrinho
//   // 8. Criar um pedido

//   // loginSucesso (); //executar o 



// }