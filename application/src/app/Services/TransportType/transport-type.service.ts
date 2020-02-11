// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// custom
import { IResponseMessageAPI } from './../../SharedObjects/models/iResponseMessageAPI';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';
import { RequestHeaderUsages } from './../../SharedObjects/enums/requestHeaderUsages';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { MessageHandlingService } from '../MessageHandling/message-handling.service';
import { StoreVisitorTransportTypesMessage } from './../../SharedObjects/models/storeVisitorTransportTypesMessage';
import { FrontEndException } from './../../SharedObjects/models/frontEndException';

@Injectable({
   providedIn: 'root'
})
export class TransportTypeService {

   constructor(private messageHandler: MessageHandlingService, private router: Router) { }

   getTransportTypeSelectionList(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getTransportTypeSelectionBE,
         RequestHeaderUsages.withToken);
   }

   storeTransportTypes(storeMessage: StoreVisitorTransportTypesMessage): Observable<IResponseMessageAPI> {

      if (!this.validatePointOfOrigin(storeMessage)) {
         return of(FrontEndException.pointOfOriginMissingError as any);
      }

      if (!this.validateTransportTypes(storeMessage)) {
         return of(FrontEndException.incorrectTransportTypeData as any);
      }

      return this.messageHandler.postMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.storeTransportTypesBE,
         storeMessage,
         RequestHeaderUsages.withToken
      );
   }

   updateTransportTypes(storeMessage: StoreVisitorTransportTypesMessage): Observable<IResponseMessageAPI> {

      if (!this.validatePointOfOrigin(storeMessage)) {
         return of(FrontEndException.pointOfOriginMissingError as any);
      }

      if (!this.validateTransportTypes(storeMessage)) {
         return of(FrontEndException.incorrectTransportTypeData as any);
      }

      return this.messageHandler.postMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.updateTransportTypeBE,
         storeMessage,
         RequestHeaderUsages.withToken
      );
   }

   validatePointOfOrigin(storeMessage: StoreVisitorTransportTypesMessage): boolean {
      return storeMessage.selectedPointOfOrigin > 0;
   }

   validateTransportTypes(storeMessage: StoreVisitorTransportTypesMessage): boolean {
      return storeMessage.visitorTransportTypes.length > 0;
   }
}
