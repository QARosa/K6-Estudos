import http from 'k6/http';
import { sleep, group, check, fail } from 'k6';
import { loginSucesso, loginSucessoFaker, loginEmailInvalido, loginSenhaInvalida, loginCamposVazios } from './scenarios/login.js';
import { getIdProdutos, getProdutos } from './resources/produto.js';
import{ getUsuariosAdm, getUsuariosNoAdm, getAllUsuariosScenario } from './scenarios/usuarios.js';
export const options = {
  stages: [
    { duration: '5s', target: 2 }, // Ramp-up to 10 users over 1 minute
    // { duration: '3m', target: 10 }, // Stay at 10 users for 3 minutes
    // { duration: '1m', target: 0 },  // Ramp-down to 0 users over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem ser menores que 500ms
  },
};

export default function () {
  // group('Login API', function () {
  //   group('POST /login - Sucesso', function () {
  //     loginSucesso();
  //   });

  //   group('POST /login - E-mail inválido', function () {
  //     loginEmailInvalido();
  //   });

  //   group('POST /login - Senha inválida', function () {
  //     loginSenhaInvalida();
  //   });

  //   group('POST /login - Campos vazios', function () {
  //     loginCamposVazios();
  //   });

  //   group('POST /login - SucessoFaker', function () {
  //     loginSucessoFaker();
  //   });

  // group('Produto', function () {
  //   group('lista produtos', function () {
  //     getProdutos();
  //   });

  //   group('id produtos', function () {
  //     getIdProdutos();
  //   });

  //   sleep(1); // Simula um tempo de espera de 1 segundo entre os grupos
  // });


    group('Usuários API', function () {
        group('GET /usuarios?administrador=true', function () {
            getUsuariosAdm();
        });

        group('GET /usuarios?administrador=false', function () {
            getUsuariosNoAdm();
        });

        group('GET /usuarios', function () {
            getAllUsuariosScenario();
        });

        group('POST /usuarios - Administrador', function () {
          postUsuariosAdm();
      });

      group('POST /usuarios - Não Administrador', function () {
          postUsuariosNoAdm();
      });
    });



}

