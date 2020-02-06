// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageHandlingService } from '../../../Services/MessageHandling/message-handling.service';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { RequestPasscodeService } from 'src/app/Services/RequestPasscode/request-passcode.service';
import { AuthenticationGuardService } from './../../../Services/AuthenticationGuard/authentication-guard.service';
import { ArrivalPointSelectorService } from './../../../Services/ArrivalPointSelector/arrival-point-selector.service';
import { ReservationService } from './../../../Services/Reservation/reservation.service';
import { TransportTypeService } from './../../../Services/TransportType/transport-type.service';
import { VisitorDetailsService } from './../../../Services/VisitorDetails/visitor-details.service';
import { MobileRenderDeciderService } from './../../../Services/MobileRenderDecider/mobile-render-decider.service';
import { PointOfOriginService } from './../../../Services/PointOfOrigin/point-of-origin.service';

@NgModule({
   declarations: [],
   imports: [
      CommonModule
   ],
   providers: [
      MessageHandlingService,
      AuthenticationService,
      RequestPasscodeService,
      AuthenticationGuardService,
      ArrivalPointSelectorService,
      ReservationService,
      TransportTypeService,
      VisitorDetailsService,
      MobileRenderDeciderService,
      PointOfOriginService
   ]
})
export class ServiceProvidersModule { }
