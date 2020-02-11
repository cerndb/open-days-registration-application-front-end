// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// custom components module
import { ComponentsModule } from './../components/components.module';
import { MaterialComponentsModule } from '../../MaterialModules/material-components/material-components.module';
import { DialogsModule } from './../dialogs/dialogs.module';

// custom page module
import { WelcomePageComponent } from './../../../Pages/welcome-page/welcome-page.component';
import { RequestTokenPageComponent } from './../../../Pages/request-token-page/request-token-page.component';
import { DefaultTestPageComponent } from './../../../Pages/default-test-page/default-test-page.component';
import { RequestPasscodePageComponent } from './../../../Pages/request-passcode-page/request-passcode-page.component';
import { SummaryPageComponent } from './../../../Pages/summary-page/summary-page.component';
import { VisitorsDetailPageComponent } from './../../../Pages/visitors-detail-page/visitors-detail-page.component';
import { ReservationDashboardPageComponent } from './../../../Pages/reservation-dashboard-page/reservation-dashboard-page.component';
import { TransportTypeSelectorPageComponent } from './../../../Pages/transport-type-selector-page/transport-type-selector-page.component';
import { ArrivalSelectorPageComponent } from './../../../Pages/arrival-selector-page/arrival-selector-page.component';
import { UpdateArrivalPointComponent } from './../../../Pages/update-arrival-point/update-arrival-point.component';
import { UpdateTransportTypeComponent } from './../../../Pages/update-transport-type/update-transport-type.component';
import { UpdateVisitorDetailsComponent } from './../../../Pages/update-visitor-details/update-visitor-details.component';

@NgModule({
   declarations: [
      WelcomePageComponent,
      RequestTokenPageComponent,
      DefaultTestPageComponent,
      RequestPasscodePageComponent,
      SummaryPageComponent,
      ArrivalSelectorPageComponent,
      VisitorsDetailPageComponent,
      ReservationDashboardPageComponent,
      TransportTypeSelectorPageComponent,
      UpdateArrivalPointComponent,
      UpdateTransportTypeComponent,
      UpdateVisitorDetailsComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MaterialComponentsModule,
      ComponentsModule,
      DialogsModule
   ]
})
export class PagesModule { }
