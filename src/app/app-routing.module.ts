import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { SettingsComponent } from './user/settings/settings.component';
import { CardDetailsComponent } from './user/card-details/card-details.component';
import { AddressDetailsComponent } from './user/address-details/address-details.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CartComponent } from './order/cart/cart.component';
import { OrderComponent } from './order/order/order.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {path: 'card-details', component: CardDetailsComponent},
      {path: 'address-details', component: AddressDetailsComponent}
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
