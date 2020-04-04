import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SessionStorageManager } from 'src/app/classes/session-storage-manager';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user-details';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public contactForm: any;
  private isUnathorized: boolean;
  public exitsErrorOnResponse: boolean;
  private user: UserDetails;

  constructor(
    private ngxLoaderService: NgxUiLoaderService,
    private sessionStorageMng: SessionStorageManager,
    private api: ApiService,
    private router: Router
  ) {

    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      nickName: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      phoneNumber: new FormControl(''),
      address: new FormControl(''),
      website: new FormControl(''),
      relationship: new FormControl(''),
      notes: new FormControl(''),
    });

    this.isUnathorized = this.sessionStorageMng.getToken() === null;
    this.exitsErrorOnResponse = false;
    this.user = this.sessionStorageMng.getCurrentUser();


  }

  ngOnInit(): void {
    if (this.user === null || this.isUnathorized) {
      alert('you must to signin');
      this.router.navigate(['auth/signin']);
    }
  }

  onAddContact(): void {

  }

}
