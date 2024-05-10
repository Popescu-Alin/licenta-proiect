import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/compoments.module';
import { MailConfirmationPageComponent } from './mail-confirmation-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [MailConfirmationPageComponent]
})
export class MailConfirmationPageModule { }
