// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// custom imports
import { FrontEndException } from './../../SharedObjects/models/frontEndException';
import { ArrivalSelectionMessage } from './../../SharedObjects/models/arrivalSelectionMessage';
import { GetAvailableTimeslotsMessage } from '../../SharedObjects/models/getAvailableTimeslotsMessage';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';
import { EndPoints } from 'src/app/SharedObjects/constants/endPoints';
import { RequestHeaderUsages } from './../../SharedObjects/enums/requestHeaderUsages';
import { IResponseMessageAPI } from './../../SharedObjects/models/iResponseMessageAPI';
import { MessageHandlingService } from '../MessageHandling/message-handling.service';

@Injectable({
   providedIn: 'root'
})
export class ArrivalPointSelectorService {

   constructor(private messageHandler: MessageHandlingService) { }

   getReservationDate(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getReservationDataBE,
         RequestHeaderUsages.withToken);
   }

   getAvailableDates(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getArrivalPointDatesBE,
         RequestHeaderUsages.withToken);
   }

   requestArrivalPointTimeslots(visitDay: string): Observable<IResponseMessageAPI> {
      return this.messageHandler.postMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getAvailableTimeslotsBE,
         new GetAvailableTimeslotsMessage(visitDay),
         RequestHeaderUsages.withToken
      );
   }

   confirmArrivalPoint(arrivalConfirmationMessage: ArrivalSelectionMessage): Observable<IResponseMessageAPI> {

      if (this.validateArrivalSelectionMessage(arrivalConfirmationMessage)) {
         const sendMessage = new ArrivalSelectionMessage();
         sendMessage.updateFromArrivalSelectionMessage(arrivalConfirmationMessage);

         return this.messageHandler.postMessageObservable(
            GENERALSETTINGS.registrationAPI + EndPoints.arrivalConfirmationBE,
            sendMessage,
            RequestHeaderUsages.withToken
         );
      } else {

         const arrivalPointNotSelectedError: IResponseMessageAPI = {
            statusCode: FrontEndException.arrivalPointTimeslotError.errorCode,
            errorMessage: FrontEndException.arrivalPointTimeslotError.errorMessage
         };

         return of(arrivalPointNotSelectedError as any);
      }
   }

   updateArrivalPoint(updateArrivalConfirmationMessage: ArrivalSelectionMessage): Observable<IResponseMessageAPI> {

      if (this.validateArrivalSelectionMessage(updateArrivalConfirmationMessage)) {
         const sendMessage = new ArrivalSelectionMessage();
         sendMessage.updateFromArrivalSelectionMessage(updateArrivalConfirmationMessage);

         return this.messageHandler.postMessageObservable(
            GENERALSETTINGS.registrationAPI + EndPoints.updateArrivalPointBE,
            sendMessage,
            RequestHeaderUsages.withToken
         );
      } else {
         const arrivalPointNotSelectedError: IResponseMessageAPI = {
            statusCode: FrontEndException.arrivalPointTimeslotError.errorCode,
            errorMessage: FrontEndException.arrivalPointTimeslotError.errorMessage
         };

         return of(arrivalPointNotSelectedError as any);
      }
   }


   validateArrivalSelectionMessage(requestModel: ArrivalSelectionMessage): boolean {
      return requestModel.timeslotStart &&
         requestModel.visitDay &&
         requestModel.timeslotStart &&
         requestModel.visitDay.length > 0 &&
         requestModel.timeslotStart.length > 0 &&
         requestModel.idArrivalPoint > 0;
   }

   getDailyAvailablePlaces(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getDailyAvailablePlacesBE,
         RequestHeaderUsages.withoutToken);
   }
}
