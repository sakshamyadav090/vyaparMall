import { NgModule } from '@angular/core';

import { VyapaarRoutingModule } from './vyapaar-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SidebarModule} from 'primeng/sidebar';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './dashboard/chat/chat.component';
import { ListingComponent } from './dashboard/listing/listing.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    ChatComponent,
    ListingComponent
  ],
  imports: [
    VyapaarRoutingModule,
    SidebarModule,
    CommonModule
  ]
})
export class VyapaarModule { }
