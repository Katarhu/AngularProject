import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthResponse, IUser, IUserAuth} from "../shared/types/auth.types";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {BoardService} from "../features/dashboard/services/board.service";

const initialUserState: IUser = {
  _id: '',
  username: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = initialUserState;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private boardService: BoardService
  ) { }

  getToken() {
    return this.cookieService.get('token');
  }

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  deleteToken() {
    this.cookieService.delete('token');
  }

  registerUser( userCredentials: IUserAuth ) {
    this.http.post<IAuthResponse>('auth/register', userCredentials)
      .subscribe((response ) => {
        this.setToken( response.token );
        this.user = response.user;
        this.router.navigate(['/dashboard']);
      });
  }

  loginUser( userCredentials: IUserAuth ) {
    this.http.post<IAuthResponse>('auth/login', userCredentials)
      .subscribe((response) => {
        this.setToken(response.token);
        this.user = response.user;
        this.router.navigate(['/dashboard']);
      })
  }

  authUser() {
    this.http.get<IAuthResponse>('auth')
      .subscribe((response) => {
        this.user = response.user;
      })
  }

  logOut() {
    this.deleteToken();
    this.user = initialUserState;

    this.boardService.clear();

    this.router.navigate(['/'])
  }

  get isLogged() {
    return this.getToken();
  }
}
