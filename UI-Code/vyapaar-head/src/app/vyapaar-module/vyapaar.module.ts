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
import { AboutUsComponent } from './about-us/about-us.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RatingModule } from "primeng/rating";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from "primeng/inputnumber";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    ChatComponent,
    ListingComponent,
    AboutUsComponent
  ],
  imports: [
    VyapaarRoutingModule,
    SidebarModule,
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    RatingModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    ConfirmDialogModule,
    InputNumberModule,
    FormsModule
  ]
})
export class VyapaarModule { }
