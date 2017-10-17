import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';

import {CalendarModule,DataTableModule,SharedModule,DialogModule,ConfirmDialogModule,OverlayPanelModule,MultiSelectModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { ApplyCarComponent } from './apply-car/apply-car.component';
import { VehicleReviewComponent } from './vehicle-review/vehicle-review.component';
import { VehicleManageComponent } from './vehicle-manage/vehicle-manage.component';
import { VehicleanAlysisComponent } from './vehiclean-alysis/vehiclean-alysis.component';
import { FormalPlanComponent } from './formal-plan/formal-plan.component';
import { TemporaryPlanComponent } from './temporary-plan/temporary-plan.component';
import { UrgentPlanComponent } from './urgent-plan/urgent-plan.component';
import { ProductionReviewComponent } from './production-review/production-review.component';
import { VehicleEnterComponent } from './vehicle-enter/vehicle-enter.component';
import { CarsManageComponent } from './cars-manage/cars-manage.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';

const appRoutes:Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'page',component:PageComponent,children:[
    // {path: '',redirectTo:"applyCar",pathMatch:"full"},
    {path:'applyCar',component:ApplyCarComponent,children:[
      {path:'',redirectTo:'formalPlan',pathMatch:'full'},
      {path:'formalPlan',component:FormalPlanComponent},
      {path:'temporaryPlan',component:TemporaryPlanComponent},
      {path:'urgentPlan',component:UrgentPlanComponent},
    ]},
    {path:'vehicleReview',component:VehicleReviewComponent,children:[
      {path:'',redirectTo:'productionReview',pathMatch:'full'},
      {path:'productionReview',component:ProductionReviewComponent}
    ]},
    {path:'vehicleManage',component:VehicleManageComponent,children:[
      {path:'',redirectTo:'carsManage',pathMatch:'full'},
      {path:'carsManage',component:CarsManageComponent},
      {path:'vehicleEnter',component:VehicleEnterComponent}
    ]},
    {path:'vehicleanAlysis',component:VehicleanAlysisComponent},
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageComponent,
    ApplyCarComponent,
    VehicleReviewComponent,
    VehicleManageComponent,
    VehicleanAlysisComponent,
    FormalPlanComponent,
    TemporaryPlanComponent,
    UrgentPlanComponent,
    ProductionReviewComponent,
    VehicleEnterComponent,
    CarsManageComponent,
    ApplicationDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CalendarModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    MultiSelectModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: LocationStrategy,useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
