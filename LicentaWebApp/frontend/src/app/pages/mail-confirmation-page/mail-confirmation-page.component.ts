import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-mail-confirmation-page',
  templateUrl: './mail-confirmation-page.component.html',
  styleUrls: ['./mail-confirmation-page.component.scss'],
})
export class MailConfirmationPageComponent implements OnInit {
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: CustomAlertService,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('Email Confirmation');
  }
  async ngOnInit() {
    this.isLoading = true;
    let email: string | null = this.route.snapshot.paramMap.get('email');
    let token: string | null = this.route.snapshot.paramMap.get('token');
    try {
      await this.authService.confirmEmail(
        email ? email : '',
        token ? token : ''
      );
      this.router.navigate(['/auth/login']);
    } catch (e) {
      this.alertService.errorSnackBar(
        'Email confirmation failed! Please check the link!'
      );
    } finally {
      this.isLoading = false;
    }
  }
}
