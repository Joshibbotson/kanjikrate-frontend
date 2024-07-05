import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class LocalAuthService {
  private apiUrl = environment.apiUrl;
  private token: string | null = null;
  private user: Partial<User> | null = null;

  constructor(private http: HttpClient) {}

  public validateToken(token: string) {
    const requestBody = { token };
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

  public getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  get User(): Partial<User> | null {
    if (!this.user) {
      const fetchedUser = localStorage.getItem('user');
      this.user = fetchedUser ? JSON.parse(fetchedUser) : null;
    }
    return this.user;
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
