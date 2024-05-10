import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageModule } from './main-page/main-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { SignUpPageModule } from './sign-up-page/sign-up-page.module';
import { ProfilePageModule } from './profile-page/profile-page.module';
import { MailConfirmationPageModule } from './mail-confirmation-page/mail-confirmation-page.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    MainPageModule,
    LoginPageModule,
    SignUpPageModule,
    ProfilePageModule,
    MailConfirmationPageModule,
  ]
})
export class PageModule { }
