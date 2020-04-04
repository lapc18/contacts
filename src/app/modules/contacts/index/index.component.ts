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

  private isUnathorized: boolean;
  public exitsErrorOnResponse: boolean;
  private user: UserDetails;
  public list: Contact[];


  constructor(
    private ngxLoaderService: NgxUiLoaderService,
    private sessionStorageMng: SessionStorageManager,
    private api: ApiService,
    private router: Router
  ) {

    this.isUnathorized = this.sessionStorageMng.getToken() === null;
    this.exitsErrorOnResponse = false;
    this.user = this.sessionStorageMng.getCurrentUser();

  }

  ngOnInit(): void {
    if (this.user === null || this.isUnathorized) {
      alert('you must to signin');
      this.router.navigate(['auth/signin']);
    } else {
      this.ngxLoaderService.start();
      this.api.fetchContacts(this.user.email, this.user.tkn).subscribe(
        res => {
          console.log(res);
          this.list = res;
          this.ngxLoaderService.stop();
        },
        err => {
          console.log(err);
          switch (err.error.status) {
            case 401: this.isUnathorized = true; break;
            default: this.exitsErrorOnResponse = false;
          }
          this.ngxLoaderService.stop();
        }
      );
    }

  }

  onAdd(): void {
    this.router.navigate(['contacts/add']);
  }

  onEdit(item: Contact): void {
    this.router.navigate(['contacts/add'], { queryParams: { phoneNumber: item.phoneNumber } });
  }

  onDelete(item: Contact): void {
    console.log(item);
  }

}
