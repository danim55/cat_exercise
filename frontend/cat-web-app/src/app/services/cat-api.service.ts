import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../model/cat.model';

@Injectable({
    providedIn: 'root'
})
export class CatService {
    // TODO replace with /api/cat and add proxy.conf.json
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient) { }

    getCats(): Observable<Cat[]> {
        return this.http.get<Cat[]>(`${this.apiUrl}/cats`);
    }

    getCat(name: string): Observable<Cat> {
        return this.http.get<Cat>(`${this.apiUrl}/cats/${name}`);
    }

    createCat(cat: Cat): Observable<any> {
        return this.http.post(`${this.apiUrl}/cats`, cat);
    }

    updateCat(name: string, cat: Cat): Observable<any> {
        return this.http.put(`${this.apiUrl}/cats/${name}`, cat);
    }

    deleteCat(name: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/cats/${name}`);
    }
}
