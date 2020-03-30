import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  signinForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private ngxLoaderService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

}
