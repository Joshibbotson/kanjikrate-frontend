import { Injectable } from '@angular/core';
import { AuthService, CreateUserDto, ILoginOpts, User, UserService } from '../../api';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalAuthService {
  private token: string | null = null;
  private user: Partial<User> | null = null;

  constructor(private authService: AuthService, private userService: UserService) {}

  public login(opts:ILoginOpts) {
    return this.authService.login(opts)
    .pipe(tap((res) => {
      const {token, user} = res
      if (token && user ) {
        this.setData(token, user)
      }
     })
    )
  }

  public async signUp(opts:CreateUserDto) {
    return this.userService.createUser(opts)
    .pipe(
      tap((res) => {
        const {token, data} = res
        if (token && data ) {
          this.setData(token, data)
        }
      })
    )  
  }

  public validateToken(token: string) {
    const requestBody = { token };
    return this.authService.validateToken(requestBody)
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

  private setData(token: string, user: Partial<User>){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
