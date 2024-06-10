import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgottenPasswordComponent } from './forgotten-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [ForgottenPasswordComponent]
})
export class ForgottenPasswordModule { }
