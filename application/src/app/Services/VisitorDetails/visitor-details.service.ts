// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.

import { StoreVisitorDetailsMessage } from './../../SharedObjects/models/storeVisitorDetailsMessage';
import { RequestHeaderUsages } from './../../SharedObjects/enums/requestHeaderUsages';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// custom models and interfaces
import { FrontEndException } from './../../SharedObjects/models/frontEndException';
import { IResponseMessageAPI } from './../../SharedObjects/models/iResponseMessageAPI';
import { Validators } from './../../SharedObjects/constants/validators';
import { IVisitorDetail } from './../../SharedObjects/models/iVisitorDetail';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';

// custom services
import { MessageHandlingService } from '../MessageHandling/message-handling.service';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class VisitorDetailsService {

   constructor(private messageHandler: MessageHandlingService, private router: Router) { }

   storeVisitorDetails(storeMessage: StoreVisitorDetailsMessage): Observable<IResponseMessageAPI> {
      if (this.validateVisitorDetails(storeMessage.visitorDetails)) {
         return of(FrontEndException.incorrectVisitorData as any);
      } else {
         return this.messageHandler.postMessageObservable(
            GENERALSETTINGS.registrationAPI + EndPoints.storeVisitorsBE,
            storeMessage,
            RequestHeaderUsages.withToken);
      }
   }

   updateVisitorDetails(updateMessage: StoreVisitorDetailsMessage): Observable<IResponseMessageAPI> {
      if (this.validateVisitorDetails(updateMessage.visitorDetails)) {
         return of(FrontEndException.incorrectVisitorData as any);
      } else {
         return this.messageHandler.postMessageObservable(
            GENERALSETTINGS.registrationAPI + EndPoints.updateVisitorDetailsBE,
            updateMessage,
            RequestHeaderUsages.withToken);
      }
   }

   validateVisitorDetails(visitors: IVisitorDetail[]): boolean {
      let dataHasError = false;
      if (visitors.length === 0) {
         dataHasError = true;
      } else {
         for (const visitor of visitors) {
            if (visitor.visitorAge < Validators.minAge || visitor.visitorAge > Validators.maxAge) {
               dataHasError = true;
            }
         }
      }
      return dataHasError;
   }

   getconfirmedVisitorDetails(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getConfirmedVisitorDetailsBE,
         RequestHeaderUsages.withToken
      );
   }

   getVisitorDetailsForUpdate(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getVisitorsForUpdateBE,
         RequestHeaderUsages.withToken
      );
   }
}
