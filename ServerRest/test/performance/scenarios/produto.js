import { group } from 'k6';
import { getProdutos, getIdProdutos } from '../resources/produto.js';
import {postLogin} from '../resources/login.js';
import { SharedArray } from "k6/data"


export function getProdutosComSucesso() {
  getIdProdutos()  
  getIdProdutos()

}


export function postProdutosComSucesso() {
  let authorization = postLogin(email, senha, 200, 'Login realizado com sucesso');
    //login para ter o token loginSucesso
    //cadastro de produto

}

