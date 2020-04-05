import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/user-details';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SessionStorageManager } from 'src/app/classes/session-storage-manager';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public contactForm: any;
  private isUnathorized: boolean;
  public exitsErrorOnResponse: boolean;
  private user: UserDetails;
  private id: string;
  private contact: Contact;

  constructor(
    private ngxLoaderService: NgxUiLoaderService,
    private sessionStorageMng: SessionStorageManager,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.sessionStorageMng.getCurrentUser();
    this.id = this.activatedRoute.snapshot.params.id;
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      nickName: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      phoneNumber: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.user === null || this.isUnathorized) {
      alert('you must to signin');
      this.router.navigate(['auth/signin']);
    } else {
      this.api.fetchContacts(this.user.email, this.user.tkn).subscribe(
        res => {
          this.contact = res.find(x => x.id == this.id);

          this.contactForm.patchValue({
            firstName: this.contact.firstName,
            lastName: this.contact.lastName,
            nickName: this.contact.nickName,
            email: this.contact.email,
            phoneNumber: this.contact.phoneNumber
          });
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
      3

    }
  }

  onAddContact(): void {
    this.ngxLoaderService.start();
    let model: Contact = {
      id: null,
      profile: null,
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      nickName: this.contactForm.value.nickName,
      email: this.contactForm.value.email,
      phoneNumber: this.contactForm.value.phoneNumber,
      address: null,
      website: null,
      relationship: null,
      notes: null,
    };
    this.api.updateContact(this.user.email, this.user.tkn, model).subscribe(
      res => {
        console.log(res, 'edited/updated');
        this.ngxLoaderService.stop();
        this.router.navigate(['contacts/index']);
      },
      err => {
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

  validateLogin(): void {
    if (this.user === null || this.isUnathorized === true) {
      this.router.navigate(['auth/signin']);
      alert('you must to signin');
    }
  }

}
