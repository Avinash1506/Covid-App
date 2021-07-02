import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CasesComponent } from './cases/cases.component';
import { GraphsComponent } from './graphs/graphs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { MapComponent } from './map/map.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlotbookingComponent } from './slotbooking/slotbooking.component';
import { AuthorizationService } from './authorization.service';
// import { OtpComponent } from './otp/otp.component';
import { SuccesspageComponent } from './successpage/successpage.component';
import { MoredetailsComponent } from './moredetails/moredetails.component';
import { DecimalPipe } from '@angular/common';
import { WorldcasesComponent } from './worldcases/worldcases.component';
import { IndiacasesComponent } from './indiacases/indiacases.component';
import { IndiamapComponent } from './indiamap/indiamap.component';
import { WorldmapComponent } from './worldmap/worldmap.component';
import { AdminModule } from './admin/admin.module';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from './data.service';
import { VaccineserviceService } from './vaccineservice.service';
import { HomeComponent } from './home/home.component';
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
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
export const routes: Routes = [
  { path: './selectcenter/bydistrict/day1', component: Day1Component },
];
@NgModule({
  declarations: [
    AppComponent,
    CasesComponent,
    GraphsComponent,
    MapComponent,
    VaccineComponent,
    PagenotfoundComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SlotbookingComponent,
    // OtpComponent,
    SuccesspageComponent,
    MoredetailsComponent,
    WorldcasesComponent,
    IndiacasesComponent,
    IndiamapComponent,
    WorldmapComponent,
    HomeComponent,
    AddnewuserslotComponent,
    SearchbydistrictComponent,
    SearchbypincodeComponent,
    Day1Component,
    Day2Component,
    Day3Component,
    Day4Component,
    Day5Component,
    Day6Component,
    Day7Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ChartsModule,
    AdminModule,

    // NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationService, multi: true },
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
