import { Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from './auth/auth.guard';


export const appRoutes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },

  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },

  {
    path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
  },

  {                                                           //
    path: '', redirectTo: '/login', pathMatch: 'full'        // Add default route
  }                                                           //
];
