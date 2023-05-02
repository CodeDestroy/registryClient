import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login (login, password) {
        return $api.post('/auth/login', {login, password});
    }

    static async registrarion (role, secondName, firstName, patronomicName, district, login, password){
        return $api.post('/auth/registration', {role, secondName, firstName, patronomicName, district, login, password});
    }

    static async logout () {
        return $api.post('/auth/logout');
    }

    static async getAccesses (user_id) {
        return $api.post('/auth/getAccesses', {user_id})
    }

}
