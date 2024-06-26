import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DataReciverService } from '../../services/data-reciver.service';
import { Router } from '@angular/router';
import { CustomAlertService } from '../../services/custom-alert.service';
import { TitleService } from '../../services/title.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  isLoading: boolean = false;
  email: string = "";

  showConfirmEmail: boolean = false;
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private dataReciver: DataReciverService,
              private router: Router,
              private customAlertSevcice: CustomAlertService,
              private titleService: TitleService) {
                this.titleService.setTitle("Login");
               }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

 async loginSubmit(){
    this.isLoading = true;
    try{
      let token = await this.authService.login(this.loginForm.value)
      if(token && token.token && token.token.length > 0){
        if(token.confirmedEmail){
          this.dataReciver.setToken(token.token);
          this.dataReciver.setUserData(token);
          this.router.navigate(['/home']);
          this.dataReciver.setIsLogedIn(true);
        }else{
          this.showConfirmEmail = true;
          this.email = this.loginForm.value.email;
        }
      }else{
        this.customAlertSevcice.errorSnackBar("Email or password is incorrect!");
      }
    }catch(error){
        this.customAlertSevcice.errorSnackBar("Email or password is incorrect!");
    }finally{
      this.isLoading = false;
    }
      
  }

  goToSignUpPage(){
    this.router.navigate(['/auth/sign-up']);
  }

  goToForgotPasswordPage(){
    this.router.navigate(['/auth/forgotten-password']);
  }

  closeModal(){
    this.showConfirmEmail = false;
  }


}
