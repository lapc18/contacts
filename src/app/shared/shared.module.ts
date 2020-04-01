import { WelcomeComponent } from './../components/welcome/welcome.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { FooterComponent } from './../components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [FooterComponent, NavbarComponent, WelcomeComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgxUiLoaderModule, 
  ],
  exports: [
    CommonModule,
    FooterComponent, 
    NavbarComponent, 
    WelcomeComponent, 
    ReactiveFormsModule, 
    FormsModule,
    NgxUiLoaderModule,
  ],
})
export class SharedModule { }
