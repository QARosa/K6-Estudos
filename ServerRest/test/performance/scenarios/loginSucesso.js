import { postLogin } from "../resources/login.js";


export default function () {
    group('Login API', function () {
        group('POST /login - Sucesso', function () {
            loginSucesso();
        });

        group('POST /login - E-mail inválido', function () {
            loginEmailInvalido();
        });

        group('POST /login - Senha inválida', function () {
            loginSenhaInvalida();
        });

        group('POST /login - Campos vazios', function () {
            loginCamposVazios();
        });
    });
}