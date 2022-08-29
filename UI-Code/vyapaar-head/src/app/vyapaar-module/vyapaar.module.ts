import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VyapaarRoutingModule } from './vyapaar-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SidebarModule} from 'primeng/sidebar';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    VyapaarRoutingModule,
    SidebarModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ]
})
export class VyapaarModule { }
