import { Signup } from './../../../models/signup';
import { SessionStorageManager } from './../../../classes/session-storage-manager';
import { ApiService } from './../../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: any;
  public existEmail: boolean;
  public exitsErrorOnResponse: boolean;

  constructor(
    private ngxLoaderService: NgxUiLoaderService,
    private sessionStorageMng: SessionStorageManager,
    private api: ApiService,
    private router: Router
  ) { 
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.existEmail = false;
    this.exitsErrorOnResponse = false;
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.ngxLoaderService.start();
    let model:Signup = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.firstName,
      email: this.signupForm.value.firstName,
      pwd: this.signupForm.value.firstName,
      profile: this.signupForm.value.firstName,
    };
    this.api.signup(model).subscribe(
      res => {
        this.sessionStorageMng.saveUserDetails(res);
        this.ngxLoaderService.stop();
        this.router.navigate(['/contacts/index']);
      },
      err => {
        console.log(err);
        this.exitsErrorOnResponse = true;
        this.ngxLoaderService.stop();
      }
    );
  }

}
