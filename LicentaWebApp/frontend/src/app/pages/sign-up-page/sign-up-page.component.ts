import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchValues } from '../../utils/matching-controls.validator';
import { AuthService } from '../../services/auth.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RegistrationDTO } from '../../client/client';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  subcriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authServive: AuthService,
    private customAlertService: CustomAlertService,
    private router: Router,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('Sign Up');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        userName: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      },
      { validator: matchValues('password', 'passwordConfirm') }
    );
  }

  submintRegister() {
    this.isLoading = true;
    let newUser: RegistrationDTO = new RegistrationDTO({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.passwordConfirm,
      userName: this.registerForm.value.userName,
      firstName: this.registerForm.value.userName,
      lastName: this.registerForm.value.userName,
    });

    this.subcriptions.push(
      this.authServive.register(newUser).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.customAlertService.successSnackBarNotAutoClose(
            'A confiremation email has been sent to your email address. Please confirm your email to login.'
          );
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.customAlertService.errorSnackBar('Something went wrong!');
        },
      })
    );
  }

  ngOnDestroy() {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }
}
