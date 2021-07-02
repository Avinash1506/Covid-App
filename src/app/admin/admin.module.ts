import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdddataComponent } from './adddata/adddata.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { RouterModule } from '@angular/router';
import { DataComponent } from './data/data.component';
import { UpdatedataComponent } from './updatedata/updatedata.component';
import { DeletedataComponent } from './deletedata/deletedata.component';
@NgModule({
  declarations: [
    AdminloginComponent,
    AdddataComponent,
    AdmindashboardComponent,
    AdminhomeComponent,
    DataComponent,
    UpdatedataComponent,
    DeletedataComponent,
  ],
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterModule],
  exports: [AdminloginComponent],
})
export class AdminModule {}
