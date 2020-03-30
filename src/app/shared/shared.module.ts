import { WelcomeComponent } from './../components/welcome/welcome.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { FooterComponent } from './../components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FooterComponent, NavbarComponent, WelcomeComponent],
  imports: [
    CommonModule
  ],
  exports: [FooterComponent, NavbarComponent, WelcomeComponent],
})
export class SharedModule { }
