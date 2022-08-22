import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
//import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(x => x.LoginModule) },
  { path: 'home', loadChildren: () => import('./vyapaar-module/vyapaar.module').then(x => x.VyapaarModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
