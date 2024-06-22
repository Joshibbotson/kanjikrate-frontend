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
      `${this.apiUrl}/user/validateToken`,
      requestBody
    );
  }

  public registerUser(opts: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/create`, opts);
  }
}
