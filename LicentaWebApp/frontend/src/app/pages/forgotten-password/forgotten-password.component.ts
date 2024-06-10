import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataReciverService } from '../../services/data-reciver.service';
import { Router } from '@angular/router';
import { CustomAlertService } from '../../services/custom-alert.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  form!: FormGroup;

  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router,
              private customAlertSevcice: CustomAlertService,
              private titleService: TitleService) {
                this.titleService.setTitle("Forgotten Password");
               }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

 async submit(){
    this.isLoading = true;
    try{
      await this.authService.sendResetPasswordMail(this.form.value.email)
      this.customAlertSevcice.successSnackBar("Please check your email for the password reset link.");
      this.router.navigate(['/auth/login']);
    }catch(error){
        this.customAlertSevcice.errorSnackBar("Something went wrong!");
    }finally{
      this.isLoading = false;
    }
  }
}
