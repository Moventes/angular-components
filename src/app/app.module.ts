import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppComponent } from './app.component';
import { RoutingModule } from './modules/routing/routing.module';
import { ComponentesModule } from './componentes/componentes.module';
import { HomeComponent } from './pages/home/home.component';
import { AddressInputComponent } from './pages/address-input/address-input.component';
import { PhoneInputComponent } from './pages/phone-input/phone-input.component';
import { ErrorDisplayComponent } from './pages/error-display/error-display.component';
import { RadioListComponent } from './pages/radio-list/radio-list.component';

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
    RadioListComponent
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
    ComponentesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
