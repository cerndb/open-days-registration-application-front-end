// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.

import { TransportTypeSelectorPageComponent } from './Pages/transport-type-selector-page/transport-type-selector-page.component';
import { ReservationDashboardPageComponent } from './Pages/reservation-dashboard-page/reservation-dashboard-page.component';
import { ArrivalSelectorPageComponent } from './Pages/arrival-selector-page/arrival-selector-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestTokenPageComponent } from './Pages/request-token-page/request-token-page.component';
import { WelcomePageComponent } from './Pages/welcome-page/welcome-page.component';
import { EndPoints } from './SharedObjects/constants/endPoints';
import { RequestPasscodePageComponent } from './Pages/request-passcode-page/request-passcode-page.component';
import { SummaryPageComponent } from './Pages/summary-page/summary-page.component';
import { AuthenticationGuardService as AuthGuard } from './Services/AuthenticationGuard/authentication-guard.service';
import { VisitorsDetailPageComponent } from './Pages/visitors-detail-page/visitors-detail-page.component';
import { UpdateArrivalPointComponent } from './Pages/update-arrival-point/update-arrival-point.component';
import { UpdateVisitorDetailsComponent } from './Pages/update-visitor-details/update-visitor-details.component';
import { UpdateTransportTypeComponent } from './Pages/update-transport-type/update-transport-type.component';

const routes: Routes = [
   { path: '', redirectTo: EndPoints.welcomeFE, pathMatch: 'full' },
   { path: EndPoints.welcomeFE, component: WelcomePageComponent },
   { path: EndPoints.requestPasscodeFE, component: RequestPasscodePageComponent },
   { path: EndPoints.requestPasscodeFE + '/:errorCode', component: RequestPasscodePageComponent },
   { path: EndPoints.requestTokenFE, component: RequestTokenPageComponent },
   { path: EndPoints.summaryPageFE, component: SummaryPageComponent, canActivate: [AuthGuard] },
   { path: EndPoints.arrivalSelectorPageFE, component: ArrivalSelectorPageComponent, canActivate: [AuthGuard] },
   { path: EndPoints.visitorsDetailPageFE, component: VisitorsDetailPageComponent, canActivate: [AuthGuard] },
   { path: EndPoints.transportTypeSelectorPageFE, component: TransportTypeSelectorPageComponent, canActivate: [AuthGuard] },
   { path: EndPoints.reservationDashboardPageFE, component: ReservationDashboardPageComponent, canActivate: [AuthGuard] },
   { path: EndPoints.updateArrivalPointPageFE, component: UpdateArrivalPointComponent, canActivate: [AuthGuard] },
   { path: EndPoints.updateVisitorsPageFE, component: UpdateVisitorDetailsComponent, canActivate: [AuthGuard] },
   { path: EndPoints.updateTransportTypePageFE, component: UpdateTransportTypeComponent, canActivate: [AuthGuard] },

   // temporary
   // { path: EndPoints.defaultTestFE, component: DefaultTestPageComponent },

   // if there is nopath match link back to welcome scren
   { path: '**', redirectTo: EndPoints.welcomeFE },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   providers: [AuthGuard],
   exports: [RouterModule]
})
export class AppRoutingModule { }
