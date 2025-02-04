import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';

export function loginSucesso() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let payload = JSON.stringify({
        email: "fulano@qa.com",
        password: "teste"
    });
    let response = http.post(`${BASEURL}/login`, payload, { headers });
    check(response, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}

export function loginEmailInvalido() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let payload = JSON.stringify({
        email: "email_invalido@qa.com",
        password: "teste"
    });
    let response = http.post(`${BASEURL}/login`, payload, { headers });
    check(response, {
        'status is 401': (r) => r.status === 401,
    });
    sleep(1);
}

export function loginSenhaInvalida() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let payload = JSON.stringify({
        email: "fulano@qa.com",
        password: "senha_invalida"
    });
    let response = http.post(`${BASEURL}/login`, payload, { headers });
    check(response, {
        'status is 401': (r) => r.status === 401,
    });
    sleep(1);
}

export function loginCamposVazios() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let payload = JSON.stringify({
        email: "",
        password: ""
    });
    let response = http.post(`${BASEURL}/login`, payload, { headers });
    check(response, {
        'status is 401': (r) => r.status === 401,
    });
    sleep(1);
}