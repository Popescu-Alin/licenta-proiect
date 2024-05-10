import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/compoments.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule { }
