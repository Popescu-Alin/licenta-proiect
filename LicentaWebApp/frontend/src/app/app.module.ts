import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomAlertService } from './services/custom-alert.service';
import { PageModule } from './pages/page.module';
import { ComponentsModule } from './components/compoments.module';
import { API_BASE_URL, Client } from './client/client';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_URL } from './constants/constants';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    provideClientHydration(),
    CustomAlertService,
    PageModule,
    ComponentsModule,
    {provide: API_BASE_URL, useValue: API_URL},
    Client,
    {provide: HttpClient}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
