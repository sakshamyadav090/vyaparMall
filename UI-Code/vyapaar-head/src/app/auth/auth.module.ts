import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './auth-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import {ToastModule} from 'primeng/toast';
import { LoginComponent } from './login/login.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';




@NgModule({
  declarations: [
    RegisterComponent,
    ResetPasswordComponent,
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ProgressSpinnerModule,
    CommonModule
  ]
})
export class AuthModule { }
