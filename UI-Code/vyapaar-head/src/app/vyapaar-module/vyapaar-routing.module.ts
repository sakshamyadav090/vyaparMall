import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CareerComponent } from './career/career.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDescriptionComponent } from './home-page/product-description/product-description.component';
import { SearchComponent } from './home-page/search/search.component';
import { TermAndCondComponent } from './term-and-cond/term-and-cond.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomePageComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'aboutUs',component:AboutUsComponent},
  {path:'src',component:SearchComponent},
  {path:'product',component:ProductDescriptionComponent},
  {path:'term',component:TermAndCondComponent},
  {path:'careers',component:CareerComponent},
  {path:'search',component:SearchComponent},
  {path:'discription',component:ProductDescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VyapaarRoutingModule { }
