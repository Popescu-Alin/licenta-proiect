import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ComponentsModule } from '../../components/compoments.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [ProfilePageComponent]
})
export class ProfilePageModule { }
