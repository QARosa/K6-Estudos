import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASEURL } from '../utils.js';
import { SharedArray } from "k6/data"
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js"
import { randomItem,randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js"


export function getCarrinhos() {
    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    let response = http.get(`https://httpbin.org/get`, { headers });

    check(response, {
        'status is 200': (r) => r.status === 200,
        
    });

    sleep(1); 
}