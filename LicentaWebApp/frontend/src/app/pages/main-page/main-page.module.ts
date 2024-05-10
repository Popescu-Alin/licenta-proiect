import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { ComponentsModule } from '../../components/compoments.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [MainPageComponent]
})
export class MainPageModule { }
