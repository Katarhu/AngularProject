import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { changeFieldType} from "../../shared/utils/changeFieldType";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', ' ../../../../shared/styles/form.scss']
})
export class LoginComponent implements OnInit {

  changeFieldType = changeFieldType;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.authService.loginUser({
      username: this.loginForm.controls.username.value as string,
      password: this.loginForm.controls.password.value as string
    });
  }

}
