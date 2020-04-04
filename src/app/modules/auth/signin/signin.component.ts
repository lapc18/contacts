import { ApiService } from './../../../services/api.service';
import { SessionStorageManager } from './../../../classes/session-storage-manager';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  public signinForm: any;
  public isCredentialsInvalid: boolean;
  public exitsErrorOnResponse: boolean;


  constructor(
    private ngxLoaderService: NgxUiLoaderService,
    private sessionStorageMng: SessionStorageManager,
    private api: ApiService,
    private router: Router
  ) {


    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.isCredentialsInvalid = false;
    this.exitsErrorOnResponse = false;

  }

  ngOnInit(): void { }

  onSignIn(): void {
    this.ngxLoaderService.start();
    console.log(this.signinForm.value);
    this.api.signin({ email: this.signinForm.value.email, pwd: this.signinForm.value.password }).subscribe(
      res => {
        this.sessionStorageMng.saveUserDetails(res);
        this.router.navigate(['/contacts/index']);
        this.ngxLoaderService.stop();
      },
      err => {
        console.log(err);
        switch (err.error.status) {
          case 401: this.isCredentialsInvalid = true; break;
          default: this.exitsErrorOnResponse = false;
        }
        this.ngxLoaderService.stop();
      }
    );
  }

}
