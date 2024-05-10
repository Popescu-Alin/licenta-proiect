import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomAlertService } from '../../services/custom-alert.service';

@Component({
  selector: 'app-email-not-confirmed-modal',
  templateUrl: './email-not-confirmed-modal.component.html',
  styleUrls: ['./email-not-confirmed-modal.component.scss']
})
export class EmailNotConfirmedModalComponent {
  
  @Input() email!: string;
  @Input() isModalOpen!: boolean ;
  @Output() closeModalEmitter = new EventEmitter<void>();

  isLoading = false; 
  
  constructor(private authService: AuthService,
              private alertService: CustomAlertService) {
  }

  sendEmailConfirmation(){
    this.isLoading = true;
    try{
      this.authService.sendConfirmationEmail(this.email).then(() => {
        this.isLoading = false;
        this.alertService.successSnackBar('Email confirmation sent successfully.');
        this.closeModalEmitter.emit();
      });
    }
    catch(err){
      this.alertService.errorSnackBar('Error while sending email confirmation.');
      this.isLoading = false;
      this.closeModalEmitter.emit();
    }
  }


}
