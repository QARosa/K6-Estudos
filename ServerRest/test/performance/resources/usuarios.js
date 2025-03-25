import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';

export function getUsuarios(queryParams, expectedStatus, expectedAdminStatus) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/usuarios${queryParams}`, { headers });

    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        [`administrador is ${expectedAdminStatus}`]: (r) => r.json().usuarios.every(user => user.administrador === expectedAdminStatus),
    });

    sleep(1); 
}

export function getAllUsuarios() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`${BASEURL}/usuarios`, { headers });

    check(response, {
        'status is 200': (r) => r.status === 200,
        'quantidade is greater than 0': (r) => r.json().quantidade > 0,
    });

    sleep(1); 
}

export function postUsuarios() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    
    let payload = JSON.stringify({
        nome: nome,
        email: email,
        password: password,
        administrador: administrador,
    });

    let response = http.post(`${BASEURL}/usuarios`, payload, { headers });

    check(response, {
        'status is 200': (r) => r.status === 201,
        'administrador is true': (r) => r.json().administrador === true,});

    sleep(1); 
}
