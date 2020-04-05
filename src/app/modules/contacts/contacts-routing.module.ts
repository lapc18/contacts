import { ContactsComponent } from './contacts.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    children: [
      { path: 'index', component: IndexComponent, },
      { path: 'details/:id', component: DetailsComponent, },
      { path: 'edit/:id', component: EditComponent, },
      { path: 'add', component: AddComponent, }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
