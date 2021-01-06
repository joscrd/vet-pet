import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Pet } from '../models/pet';
import { Global } from './global';

@Injectable()
export class PetService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'VetPet test';
    }

    savePet(pet: Pet): Observable<any> {
        let params = JSON.stringify(pet);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-pet', params, {headers: headers});
    }

    getPets(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'pets', {headers:headers}); 
    }

    getPet(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'pet/' + id, {headers:headers}); 
    }

    deletePet(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url + 'pet/' + id, {headers:headers}); 
    }

    updatePet(pet): Observable<any> {
        let params = JSON.stringify(pet);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'pet/' + pet._id, params, {headers:headers}); 
    }
}