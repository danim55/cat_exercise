import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../model/cat.model';

@Injectable({
    providedIn: 'root'
})
export class CatService {
    private CAT_API_URI = '/api';

    constructor(private http: HttpClient) { }

    getCats(): Observable<Cat[]> {
        return this.http.get<Cat[]>(`${this.CAT_API_URI}/cats`);
    }

    getCat(name: string): Observable<Cat> {
        return this.http.get<Cat>(`${this.CAT_API_URI}/cats/${name}`);
    }

    createCat(cat: Cat): Observable<any> {
        return this.http.post(`${this.CAT_API_URI}/cats`, cat);
    }

    updateCat(name: string, cat: Cat): Observable<any> {
        return this.http.put(`${this.CAT_API_URI}/cats/${name}`, cat);
    }

    deleteCat(name: string): Observable<any> {
        return this.http.delete(`${this.CAT_API_URI}/cats/${name}`);
    }
}
