import { group } from 'k6';
import { SharedArray } from "k6/data"
import { getUsuarios, getAllUsuarios, postUsuarios } from '../resources/usuarios.js';

export function getUsuariosAdm() {
  getUsuarios('?administrador=true', 200, true);
}

export function getUsuariosNoAdm() {
  getUsuarios('?administrador=false', 200, false);
}

export function getAllUsuariosScenario() {
  getAllUsuarios();
}

export function postUsuariosAdm() {
  postUsuarios('Admin User', 'beltranoadmin@example.com', 'password123', true);
}

export function postUsuariosNoAdm() {
  postUsuarios('Regular User', 'userbeltranoadmin.com', 'password123', false);
}
