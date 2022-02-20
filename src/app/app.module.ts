import { NgModule } from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from '@aut/pages/home/home.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpDelayInterceptor} from '@aut/interceptors/http-delay-interceptor';
import {GetDataModule} from '@aut/pages/get-data/get-data.module';
import {UseParameterModule} from '@aut/pages/use-parameter/use-parameter.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    GetDataModule,
    UseParameterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpDelayInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
