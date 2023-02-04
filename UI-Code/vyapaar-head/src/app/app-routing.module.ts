import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
//import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule) },
  { path: '', loadChildren: () => import('./vyapaar-module/vyapaar.module').then(x => x.VyapaarModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload', 
    scrollPositionRestoration: 'top' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
