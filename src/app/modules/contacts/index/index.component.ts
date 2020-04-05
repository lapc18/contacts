import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { UserDetails } from 'src/app/models/user-details';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SessionStorageManager } from 'src/app/classes/session-storage-manager';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public isUnathorized: boolean;
  public exitsErrorOnResponse: boolean;
  private user: UserDetails;
  public list: Contact[];


  constructor(
    private ngxLoaderService: NgxUiLoaderService,
    private sessionStorageMng: SessionStorageManager,
    private api: ApiService,
    private router: Router
  ) {
    this.exitsErrorOnResponse = false;
    this.isUnathorized = false;
    this.user = this.sessionStorageMng.getCurrentUser();
    this.ngxLoaderService.start();
    this.api.fetchContacts(this.user.email, this.user.tkn).subscribe(
      res => {
        this.list = res;
        this.ngxLoaderService.stop();
      },
      err => {
        this.exitsErrorOnResponse = true;
        console.log(err);
        switch (err.error.status) {
          case 401: this.isUnathorized = true; break;
          default: this.exitsErrorOnResponse = true;
        }
        this.ngxLoaderService.stop();
        this.validateLogin();
      }
    );
  }

  ngOnInit(): void {
    this.validateLogin();
  }

  onAdd(): void {
    this.router.navigate(['contacts/add']);
  }

  onEdit(item: Contact): void {
    this.router.navigate(['contacts/add'], { queryParams: { phoneNumber: item.phoneNumber } });
  }

  onDelete(item: Contact): void {
    console.log(`Deleting item: ${item}`);
    const index: number = this.list.indexOf(item);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    this.api.deleteContact(this.user.email, this.user.tkn, item.id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
    console.log(`Deleted item: ${item} successfully`);
  }

  validateLogin(): void {
    if (this.user === null || this.isUnathorized === true) {
      this.router.navigate(['auth/signin']);
      alert('you must to signin');
    }
  }

}
