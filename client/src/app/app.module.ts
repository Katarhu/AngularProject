import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from "./layout/layout.module";
import {LoginModule} from "./features/login/login.module";
import {RegisterModule} from "./features/register/register.module";
import {HomeModule} from "./features/home/home.module";
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptorService} from "./services/http.interceptor.service";
import {CookieService} from "ngx-cookie-service";
import {DashboardModule} from "./features/dashboard/dashboard.module";
import {TextEditableDirective} from './shared/directives/text-editable.directive';
import {DirectivesModule} from "./shared/directives/directives.module";
import {BoardPageModule} from "./features/board-page/board-page.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        HomeModule,
        LoginModule,
        DashboardModule,
        RegisterModule,
        HttpClientModule,
        DirectivesModule,
        BoardPageModule
    ],
    providers: [
        {provide: "BASE_API_URL", useValue: environment.BASE_API_URL},
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
        CookieService
    ],
    exports: [
        TextEditableDirective
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
