import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TermAndCondComponent } from './term-and-cond/term-and-cond.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomePageComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'about',component:AboutUsComponent},
  {path:'term',component:TermAndCondComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VyapaarRoutingModule { }
