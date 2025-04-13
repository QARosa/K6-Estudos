import { group } from 'k6';
import { postLogin } from '../resources/login.js';
import { SharedArray } from "k6/data"
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js"
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"

const usuarios = new SharedArray("usuarios", function () {
	return papaparse.parse(open("../data/usuarios.csv"), {
		delimiter: ",",
		header: true,
	}).data
})


export function loginSucessoFaker() {
    let email = `${randomString(10)}@email.com`
    let senha = `${randomIntBetween(1,400)}`
    console.log(email) 
    console.log(senha)
    ///postLogin(email, senha, 401, 'validar mensagem de erro');
 }

export function loginEmailInvalido() {
    postLogin("email_invalido@qa.com", "teste", 401);
    // login("email_invalido@qa.com", "teste", 401, 'E-mail e/ou senha inválidos');

}

export function loginSenhaInvalida() {
    postLogin("fulano@qa.com", "senha_invalida", 401);
}

export function loginCamposVazios() {
    postLogin("", "", 400);
}


export function loginUser() {
    let email = randomItem(usuarios).email
    let senha = randomItem(usuarios).senha
    console.log(email) 
    console.log(senha)
    let userauthorization = postLogin(email, senha, 200, 'Login realizado com sucesso');
    return userauthorization
}

///criar dois scenarios com perfils de admin e usuario comum
export function loginAdmin() {
    let email = randomItem(usuarios).email
    let senha = randomItem(usuarios).senha
    console.log(email) 
    console.log(senha)
    let adminauthorization = postLogin(email, senha, 200, 'Login realizado com sucesso');
    return adminauthorization
}
