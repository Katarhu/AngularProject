import {HttpInterceptorService} from "./services/http.interceptor.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BoardPageModule} from "./features/board-page/board-page.module";
import {DashboardModule} from "./features/dashboard/dashboard.module";
import {RegisterModule} from "./features/register/register.module";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {LoginModule} from "./features/login/login.module";
import {BrowserModule} from '@angular/platform-browser';
import {appEffects, appReducers} from "./store/app.store";
import {AppRoutingModule} from './app-routing.module';
import {environment} from "../environments/environment";
import {HomeModule} from "./features/home/home.module";
import {LayoutModule} from "./layout/layout.module";
import {AppComponent} from './app.component';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';


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
    BoardPageModule,
    StoreModule.forRoot(appReducers, {}),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production, autoPause: true}),
  ],
  providers: [
    {provide: "BASE_API_URL", useValue: environment.BASE_API_URL},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
