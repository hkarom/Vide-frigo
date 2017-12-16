import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';

const login = 'http://localhost:3000/auth/login';
const logout = 'http://localhost:3000/auth/logout';
const register = 'http://localhost:3000/auth/register';

@Injectable()
export class AuthService {
  public token: string;


  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) {
  }

  login(data): Observable<boolean> {
    return this.auth(login, data);
  }

  register(data): Observable<boolean> {
    return this.auth(register, data);
  }

  private auth(url, data): Observable<boolean> {
    return this.http.post(url, data)
      .map((response: any) => {
        if (response.token) {
          localStorage.setItem('user.token', response.token);
          localStorage.setItem('user.id', response.user.id);
          localStorage.setItem('user.email', response.user.email);
          localStorage.setItem('user.username', response.user.username);
          localStorage.setItem('user.description', response.user.description);
          return true;
        }
        return false;
      });
  }

  logout(): Observable<boolean> {
    return this.http.get(logout)
      .map((response: any) => {
        if (response) {
          this.cleanStorage();
          return true;
        }
        return false;
      });
  }

	private cleanStorage() {
		localStorage.removeItem('user.token');
		localStorage.removeItem('user.id');
		localStorage.removeItem('user.email');
		localStorage.removeItem('user.username');
		localStorage.removeItem('user.description');
	}


  isLoggedIn(): boolean {
    let token = localStorage.getItem('user.token');
    if (token == undefined || token == null) {
      return false;
    }
    else {
      if (this.jwtHelper.isTokenExpired(token)) {
				this.cleanStorage();
        return false;
      }
			else return true;
    }
  }

}
