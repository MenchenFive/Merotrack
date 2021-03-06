import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'pages',
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
  /*{ path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },*/
      /*{
        path: 'register',
        component: NbRegisterComponent,
      },*/
      /*{
        path: 'logout',
        component: NbLogoutComponent,
      },*/
      /*{
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },*/
      /*{
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },*/
    /*],
  },*/
  // { path: '', redirectTo: 'pages', pathMatch: 'full' }, // !!!!! QUIZÁ HAYA QUE QUITAR ESTO
  // { path: '**', redirectTo: 'pages' },                  // !!!!!
  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth' },
  { path: '', canActivate: [AuthGuard], redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', canActivate: [AuthGuard], redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
