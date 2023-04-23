import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async fetchRows () {
        return $api.get('/data/registrG35');
    }

    static async fetchCity () {
        return $api.get('/data/cities');
    }
    
    static async fetchPolyclinics () {
        return $api.get('/data/polyclinics');
    }
    
    static async fetchCourses () {
        return $api.get('/data/courses');
    }

    static async fetchPITRS () {
        return $api.get('/data/pitrs');
    }

    static async sendData (secondName, name, patronomic, birthDate, city, addressFact, policlinica, phone, invalid, course, edss, pitrs, therapyPitrs, diagnozDate, mrt, vipiski, comments) {
        return $api.post('/data/sendData', {secondName, name, patronomic, birthDate, city, addressFact, policlinica, phone, invalid, course, edss, pitrs, therapyPitrs, diagnozDate, mrt, vipiski, comments});
    }
    
    

}
