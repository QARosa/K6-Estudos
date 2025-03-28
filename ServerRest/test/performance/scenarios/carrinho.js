import { group } from 'k6';
import { SharedArray } from "k6/data"
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"
import { getCarrinhos } from '../resources/carrinho';


// Carregar dados de teste de um arquivo JSON
const usuarios = new SharedArray('Usuários', function () {
  return JSON.parse(open('../data/usuarios.json')); // Certifique-se de criar um arquivo JSON com dados de teste
});

function generateUniqueEmail() {
  return `${randomIntBetween(1, 100000)}_${randomString(5)}@qa.com`;
}

export function getAllCarrinhos() {
    getCarrinhos();
  }

