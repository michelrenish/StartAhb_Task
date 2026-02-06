import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:8082/products';

    constructor(private http: HttpClient) { }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/new`, userData, { responseType: 'text' });
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/authenticate`, credentials, { responseType: 'text' });
    }

    getToken(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    }

    setToken(token: string): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', token);
        }
    }

    logout(): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('token');
        }
    }
}
