import http from 'k6/http';
import { sleep, group, check, fail } from 'k6';
import { loginEmailInvalido, loginSenhaInvalida, loginCamposVazios, loginUser, loginAdmin } from './scenarios/login.js';
import { ConsultarAdmin, ConsultarUsers,ConsultarTodos,postUsuariosAdm,postUsuariosNoAdm,deleteUsuarioScenario } from './scenarios/usuarios.js';

export const options = {
  scenarios: {
    //a ordenação dos testes será referenciada pela ordem descrita no cenário
    //o nome do cenário é o mesmo nome da função que será executada
    loginApi: {
      executor: 'constant-arrival-rate',
      rate: 1, // 1 requisição por segundo
      timeUnit: '1s', // por segundo
      duration: '5s', // duração do teste
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
  // group('Login API', function () {
  //   group('POST /login - E-mail inválido', function () {
  //     loginEmailInvalido();
  //   });

  //   group('POST /login - Senha inválida', function () {
  //     loginSenhaInvalida();
  //   });

  //   group('POST /login - Campos vazios', function () {
  //     loginCamposVazios();
  //   });

  //   group('POST /login - Login User', function () {
  //     postUsuariosAdm()
  //     loginUser();
  //   });

  //   group('POST /login - Login Admin', function () {
  //     postUsuariosNoAdm()
  //     loginAdmin();
  //   });
  // });

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

      group('DELETE/ Cenário de Exclusão de Usuários', function () {
        let [email, password, userId] = postUsuariosNoAdm();
    if (!userId) {
        console.error('Erro: Não foi possível criar o usuário para exclusão.');
        return;
    }

    console.log(`Usuário criado com sucesso. ID: ${userId}`);
    deleteUsuarioScenario(userId);
      });

     
    }
  );
}   