// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { IResponseMessageAPI } from './../../SharedObjects/models/iResponseMessageAPI';
import { ResponseStatusCodes } from 'src/app/SharedObjects/enums/responseStatusCodes';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RequestHeaderUsages } from './../../SharedObjects/enums/requestHeaderUsages';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';
import { AuthenticationService } from './../Authentication/authentication.service';
import { MessageHandlingService } from '../MessageHandling/message-handling.service';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { IReservationIdHolderMessage } from './../../SharedObjects/models/iReservationIdHolderMessage';

@Injectable({
   providedIn: 'root'
})
export class ReservationService {

   constructor(
      private messageHandler: MessageHandlingService,
      private router: Router,
      private authenticaionService: AuthenticationService) { }

   createNewReservation(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.createNewReservationBE,
         RequestHeaderUsages.withToken).pipe(
            map(response => {
               if (response.statusCode === ResponseStatusCodes.OK) {
                  this.authenticaionService.updateToken(response.data.token);
                  this.router.navigate(['/' + EndPoints.arrivalSelectorPageFE]);
               }
               return response;
            })
         );
   }

   finalizeReservation(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.finalizeReservationBE,
         RequestHeaderUsages.withToken).pipe(map(response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
            }
            return response;
         }));
   }

   getReservation(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getReservation,
         RequestHeaderUsages.withToken);
   }

   getActiveReservations(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getActiveReservations,
         RequestHeaderUsages.withToken);
   }

   cancelReservation(message: IReservationIdHolderMessage): Observable<IResponseMessageAPI> {
      return this.messageHandler.postMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.cancelReservation,
         message,
         RequestHeaderUsages.withToken);
   }

   getReservationUpdateToken(message: IReservationIdHolderMessage): Observable<IResponseMessageAPI> {
      return this.messageHandler.postMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getUpdateReservationTokenBE,
         message,
         RequestHeaderUsages.withToken).pipe(
            map(response => {
               if (response.statusCode === ResponseStatusCodes.OK) {
                  this.authenticaionService.updateToken(response.data.token);
               }
               return response;
            })
         );
   }

   reRequestConfirmationMail(message: IReservationIdHolderMessage) {
      return this.messageHandler.postMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.reRequestConfirmationMailBE,
         message,
         RequestHeaderUsages.withToken);
   }
}
