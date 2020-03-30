import { WelcomeComponent } from './../components/welcome/welcome.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { FooterComponent } from './../components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [FooterComponent, NavbarComponent, WelcomeComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [FooterComponent, NavbarComponent, WelcomeComponent],
})
export class SharedModule { }
