import { UserDetails } from './../../models/user-details';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SessionStorageManager } from './../../classes/session-storage-manager';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  private user: UserDetails;
  public list: Contact[];


  constructor(
    private ngxLoaderService: NgxUiLoaderService,
    private sessionStorageMng: SessionStorageManager,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    this.ngxLoaderService.start();
    this.user = this.sessionStorageMng.getCurrentUser();
    if (this.user === null || this.sessionStorageMng.getToken() === null) {
      alert('you must to signin');
      this.router.navigate(['auth/signin']);
    }
    this.ngxLoaderService.stop();
  }

  gotoIndex(): void {
    this.router.navigate(['contacts/index']);
  }

  signOut(): void {
    this.sessionStorageMng.clear();
    this.router.navigate(['welcome']);
  }

}
