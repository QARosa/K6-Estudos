import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';


export function getProdutos() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let response = http.get(`${BASEURL}/produtos`, { headers });   
    check(response, {
        'status is 200': (r) => r.status === 200,
        'quantidade is 2': (r) => r.json().quantidade === 2,        
    });
}

export function getIdProdutos() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let response = http.get(`${BASEURL}/produtos?_id=BeeJh5lz3k6kSIzA`, { headers });    
    check(response, {
        'status is 200': (r) => r.status === 200,
        'id encontrado BeeJh5lz3k6kSIzA': (r) => r.json().produtos[0]._id === 'BeeJh5lz3k6kSIzA',
        'produto encontrado': (r) => r.json().produtos[0].nome === "Logitech MX Vertical",
    });

}

export function postCadastroProdutos() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let response = http.post(`${BASEURL}/produtos?_id=BeeJh5lz3k6kSIzA`, { headers });
    
    check(response, {
        'status is 200': (r) => r.status === 200,
        'id encontrado BeeJh5lz3k6kSIzA': (r) => r.json().produtos[0]._id === 'BeeJh5lz3k6kSIzA',
        'produto encontrado': (r) => r.json().produtos[0].nome === "Logitech MX Vertical",
    });

}


