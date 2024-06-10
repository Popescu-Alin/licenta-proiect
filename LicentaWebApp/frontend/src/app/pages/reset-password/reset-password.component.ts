import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordReset } from '../../client/client';
import { Subscription } from 'rxjs';
import { matchValues } from '../../utils/matching-controls.validator';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;

  isLoading: boolean = false;
  pathSubscription!: Subscription;
  email!: string | null;
  token!: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private customAlertSevcice: CustomAlertService,
    private titleService: TitleService) {
      this.titleService.setTitle("Reset Password");
     }

  ngOnInit() {
    this.initForm();
    this.pathSubscription = this.route.paramMap.subscribe((params) => {
      this.email = this.route.snapshot.paramMap.get('email');
      this.token = this.route.snapshot.paramMap.get('token');
    });
  }

  initForm() {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      { validator: matchValues('password', 'passwordConfirm') }
    );
  }

  async submit() {
    this.isLoading = true;
    let body = new PasswordReset({
      email: this.email!,
      token: this.token!,
      password: this.form.value.password,
      confirmedPassword: this.form.value.passwordConfirm,
    });
    try {
      await this.authService.resetPassword(body);
      this.customAlertSevcice.successSnackBar('Password reset successfully!');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      this.customAlertSevcice.errorSnackBar('Something went wrong!');
    } finally {
      this.isLoading = false;
    }
  }
}
