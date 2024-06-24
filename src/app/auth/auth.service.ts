import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public validateToken(token: string) {
    const requestBody = { token: token };
    return this.http.post<any>(
      `${this.apiUrl}/auth/validateToken`,
      requestBody
    );
  }

  public registerUser(opts: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/create`, opts);
  }

  public login(opts: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, opts);
  }

  public logout(): void {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('user');
  }
}
