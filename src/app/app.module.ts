import { SharedModule } from './shared/shared.module';

import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
