import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { MaterialModule } from './modules/material.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './user/settings/settings.component';
import { CardDetailsComponent } from './user/card-details/card-details.component';
import { AddressDetailsComponent } from './user/address-details/address-details.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CartComponent } from './order/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { AddToCartDialogComponent } from './order/add-to-cart-dialog/add-to-cart-dialog.component';
import { OrderComponent } from './order/order/order.component';
import { CountdownModule } from 'ngx-countdown';
import { AddressFormComponent } from './user/address-form/address-form.component';
import { CardFormComponent } from './user/card-form/card-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    SettingsComponent,
    CardDetailsComponent,
    AddressDetailsComponent,
    ProfileComponent,
    CartComponent,
    AddToCartDialogComponent,
    OrderComponent,
    AddressFormComponent,
    CardFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MaterialModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
