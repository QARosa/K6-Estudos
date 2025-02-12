import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';


export function login(email, password, expectedStatus, expectedMessage) {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    let payload = JSON.stringify({
        email: email,
        password: password
    });
    let response = http.post(`${BASEURL}/login`, payload, { headers });
    check(response, {
        [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        // [`message is ${expectedMessage}`]: (r) => r.json('message') === expectedMessage
    });
    sleep(1);
}

