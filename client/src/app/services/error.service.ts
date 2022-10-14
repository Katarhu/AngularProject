import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _error: string = '';

  constructor(
    private router: Router
  ) {

    router.events.subscribe(() => {
      if (this._error) this.clearError()
    })
  }

  clearError() {
    this._error = '';
  }

  setError(errorMessage: string) {
    this._error = errorMessage;
  }

  get error() {
    return this._error;
  }
}
