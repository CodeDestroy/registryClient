import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {

    // register G35
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

    // register Pulm
    static async fetchRowsRegInterPnevm() {
        return $api.get('/data/registrInterPnevm')
    }

    static async fetchCoursePulm () {
        return $api.get('/data/coursePulm');
    }        

    // rigister BronchPulm
    static async fetchRowsRegBronchPulm () {
        return $api.get('/data/registrBronchPulm');
    }  

    static async fetchAllergIllness () {
        return $api.get('/data/allergIllness');
    }  

    static async fetchChoicePreparatOnBit () {
        return $api.get('/data/choicePreparatOnBit');
    }    
    
    static async fetchBazisTherapy () {
        return $api.get('/data/bazisTherapy');
    }  
    
    static async fetchBaCourseIllness () {
        return $api.get('/data/baCourseIllness');
    }  

    static async fetchCardioPatolog () {
        return $api.get('/data/cardioPatolog');
    }  
    


    // send data 

        //reg G35
    static async sendData (secondName, name, patronomic, birthDate, city, addressFact, policlinica, phone, invalid, course, edss, pitrs, therapyPitrs, diagnozDate, mrt, vipiski, comments) {
        return $api.post('/data/sendData', {secondName, name, patronomic, birthDate, city, addressFact, policlinica, phone, invalid, course, edss, pitrs, therapyPitrs, diagnozDate, mrt, vipiski, comments});
    }
        //reg InterPnevm
    static async sendDataRegInterPnevm (secondName, name, patronomic, birthDate, addressFact, phone, lastHospitalizationDate, height, weight, pneumoniaType, mMRS, 
        FJELoriginal, DLCOoriginal, flowType, courseId, initTherapyDate, controlVisitNumber, controlVisitDate, mMRScontrol, FJELcontrol, DLCOcontrol, comments) {
            return $api.post('/data/sendDataRegInterPnevm', {secondName, name, patronomic, birthDate, addressFact, phone, lastHospitalizationDate, height, weight, pneumoniaType, mMRS, 
                FJELoriginal, DLCOoriginal, flowType, courseId, initTherapyDate, controlVisitNumber, controlVisitDate, mMRScontrol, FJELcontrol, DLCOcontrol, comments})
        }
        //reg BrochPulm
    static async sendDataRegBronchPulm (secondName, name, patronomic, birthDate, addressFact, phone, lastHospitalizationDate, height, weight, 
        heaviness, controlDegree, escalation, breath_heaviness, th2, eozinophilia, IgE, allergAnamnez, allergIllnessId, 
        choicePreparatOnBitId, dozaOnBIT, needReceivBIT, bazisTherapyId, quanDozKDBA, baCourseIllnessId, controlAfterThreeMonths, 
        SRB, gipercoagulation, cardioPatologId, failureCirculation, sequence, dateInit, dateControlEffect) {
            return $api.post('/data/sendDataRegBronchPulm', {secondName, name, patronomic, birthDate, addressFact, phone, lastHospitalizationDate, height, weight, 
                heaviness, controlDegree, escalation, breath_heaviness, th2, eozinophilia, IgE, allergAnamnez, allergIllnessId, 
                choicePreparatOnBitId, dozaOnBIT, needReceivBIT, bazisTherapyId, quanDozKDBA, baCourseIllnessId, controlAfterThreeMonths, 
                SRB, gipercoagulation, cardioPatologId, failureCirculation, sequence, dateInit, dateControlEffect})
        }

}
