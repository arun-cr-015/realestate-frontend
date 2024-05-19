import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PropertyFormComponent } from './property-form/property-form.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './auth.guard';
import { SellerComponent } from './seller/seller.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'properties', component: PropertyListComponent },
  { path: 'add-property', component: PropertyFormComponent, canActivate: [AuthGuard] },
  { path: 'seller', component: SellerComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/properties', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
