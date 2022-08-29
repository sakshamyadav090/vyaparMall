import { NgModule } from '@angular/core';

import { VyapaarRoutingModule } from './vyapaar-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SidebarModule} from 'primeng/sidebar';
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
    VyapaarRoutingModule,
    SidebarModule
  ]
})
export class VyapaarModule { }
