import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ComponentesCommonModule } from 'common-components';

import { AppComponent } from './app.component';
import { RoutingModule } from './modules/routing/routing.module';
import { ComponentesAngularModule } from '../componentes/componentes.module';
import { HomeComponent } from './pages/home/home.component';
import { AddressInputComponent } from './pages/address-input/address-input.component';
import { PhoneInputComponent } from './pages/phone-input/phone-input.component';
import { ErrorDisplayComponent } from './pages/error-display/error-display.component';
import { ForOfComponent } from './pages/for-of/for-of.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddressInputComponent,
    PhoneInputComponent,
    ErrorDisplayComponent,
    ForOfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RoutingModule,
    ComponentesAngularModule,
    ComponentesCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
