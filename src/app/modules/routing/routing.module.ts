import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { AddressInputComponent } from '../../pages/address-input/address-input.component';
import { PhoneInputComponent } from '../../pages/phone-input/phone-input.component';
import { ErrorDisplayComponent } from '../../pages/error-display/error-display.component';
import { MvIteratorComponent } from '../../pages/mv-iterator/mv-iterator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'address', component: AddressInputComponent },
  { path: 'phone', component: PhoneInputComponent },
  { path: 'iterator', component: MvIteratorComponent },
  { path: 'error', component: ErrorDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
