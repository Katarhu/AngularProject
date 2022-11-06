import {IAuthResponse, IUser, IUserAuth} from "../shared/types/auth.types";
import {clearBoardState, getBoards} from "../store/boards/board.actions";
import {clearListsState, getLists} from "../store/lists/lists.actions";
import {clearTaskState, getTasks} from "../store/tasks/tasks.actions";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {IAppStore} from "../store/app.store";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

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
    private store: Store<IAppStore>
  ) {
  }

  get isLogged() {
    return this.getToken();
  }

  getToken() {
    return this.cookieService.get('token');
  }

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  deleteToken() {
    this.cookieService.delete('token');
  }

  registerUser(userCredentials: IUserAuth) {
    this.http.post<IAuthResponse>('auth/register', userCredentials)
      .subscribe((response) => {
        this.setToken(response.token);
        this.user = response.user;
        this.initStore();
        this.router.navigate(['/dashboard']);
      });
  }

  loginUser(userCredentials: IUserAuth) {
    this.http.post<IAuthResponse>('auth/login', userCredentials)
      .subscribe((response) => {
        this.setToken(response.token);
        this.user = response.user;
        this.initStore();
        this.router.navigate(['/dashboard']);
      })
  }

  authUser() {
    this.http.get<IAuthResponse>('auth')
      .subscribe((response) => {
        this.user = response.user;
        this.initStore();
      })
  }

  logOut() {
    this.deleteToken();
    this.user = initialUserState;

    this.clearStore();

    this.router.navigate(['/'])
  }

  initStore() {
    this.store.dispatch(getBoards());
    this.store.dispatch(getLists({}));
    this.store.dispatch(getTasks());
  }

  clearStore() {
    this.store.dispatch(clearBoardState());
    this.store.dispatch(clearListsState());
    this.store.dispatch(clearTaskState());
  }
}
