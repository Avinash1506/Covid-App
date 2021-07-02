import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasesComponent } from './cases/cases.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphsComponent } from './graphs/graphs.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
// import { OtpComponent } from './otp/otp.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { SlotbookingComponent } from './slotbooking/slotbooking.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { SuccesspageComponent } from './successpage/successpage.component';
import { MoredetailsComponent } from './moredetails/moredetails.component';
import { WorldcasesComponent } from './worldcases/worldcases.component';
import { IndiacasesComponent } from './indiacases/indiacases.component';
import { IndiamapComponent } from './indiamap/indiamap.component';
import { WorldmapComponent } from './worldmap/worldmap.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdddataComponent } from './admin/adddata/adddata.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { DataComponent } from './admin/data/data.component';
import { UpdatedataComponent } from './admin/updatedata/updatedata.component';
import { DeletedataComponent } from './admin/deletedata/deletedata.component';
import { AddnewuserslotComponent } from './addnewuserslot/addnewuserslot.component';
import { SearchbydistrictComponent } from './searchbydistrict/searchbydistrict.component';
import { SearchbypincodeComponent } from './searchbypincode/searchbypincode.component';
import { Day1Component } from './day1/day1.component';
import { Day2Component } from './day2/day2.component';
import { Day3Component } from './day3/day3.component';
import { Day4Component } from './day4/day4.component';
import { Day5Component } from './day5/day5.component';
import { Day6Component } from './day6/day6.component';
import { Day7Component } from './day7/day7.component';
const routes: Routes = [
  {
    path: 'cases',
    component: CasesComponent,
    children: [
      { path: '', redirectTo: '/cases/indiacases', pathMatch: 'full' },
      { path: 'indiacases', component: IndiacasesComponent },
      { path: 'worldcases', component: WorldcasesComponent },
    ],
  },
  { path: 'stats', component: GraphsComponent },
  {
    path: 'map',
    component: MapComponent,
    children: [
      { path: '', redirectTo: '/map/indiamap', pathMatch: 'full' },
      { path: 'indiamap', component: IndiamapComponent },
      { path: 'worldmap', component: WorldmapComponent },
    ],
  },
  { path: 'vaccine', component: VaccineComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'selectcenter',
    component: SlotbookingComponent,
    children: [
      { path: '', redirectTo: '/selectcenter/bydistrict', pathMatch: 'full' },
      {
        path: 'bydistrict',
        component: SearchbydistrictComponent,
        children: [
          { path: 'day1', component: Day1Component },
          { path: 'day2', component: Day2Component },
          { path: 'day3', component: Day3Component },
          { path: 'day4', component: Day4Component },
          { path: 'day5', component: Day5Component },
          { path: 'day6', component: Day6Component },
          { path: 'day7', component: Day7Component },
        ],
      },
      { path: 'bypincode', component: SearchbypincodeComponent },
    ],
  },
  // { path: 'otpvalidation', component: OtpComponent },
  { path: 'successpage', component: SuccesspageComponent },
  { path: 'moredetailspage', component: MoredetailsComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },
  { path: 'adminhome', component: AdminhomeComponent },
  {
    path: 'data',
    component: DataComponent,
    children: [
      { path: 'adddata', component: AdddataComponent },
      { path: 'updatedata', component: UpdatedataComponent },
      { path: 'deletedata', component: DeletedataComponent },
    ],
  },
  { path: 'slotbooking', component: AddnewuserslotComponent },
  { path: '', redirectTo: '/cases/indiacases', pathMatch: 'full' },
  // { path: '/graphs', component: GraphsComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true,onSameUrlNavigation:'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  stateName;
}
