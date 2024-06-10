import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/compoments.module';
import { RepoPageComponent } from './repo-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RepoPageComponent]
})
export class RepoPageModule { }
