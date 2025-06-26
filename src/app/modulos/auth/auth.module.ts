import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';


@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CompartilhadoModule
  ]
})
export class AuthModule { }
