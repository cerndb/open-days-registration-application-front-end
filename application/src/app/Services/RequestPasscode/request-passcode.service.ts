// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FrontEndException } from './../../SharedObjects/models/frontEndException';

// custom interfaces
import { IResponseMessageAPI } from './../../SharedObjects/models/iResponseMessageAPI';
import { IRequestPasscodeMessage } from '../../SharedObjects/models/iRequestPasscodeMessage';

// custom settings
import { RequestHeaderUsages } from './../../SharedObjects/enums/requestHeaderUsages';
import { EndPoints } from '../../SharedObjects/constants/endPoints';
import { GENERALSETTINGS } from 'src/app/SharedObjects/constants/generalSettings';

// custom services
import { MessageHandlingService } from '../MessageHandling/message-handling.service';

@Injectable({
   providedIn: 'root'
})
export class RequestPasscodeService {

   constructor(private messageHandler: MessageHandlingService) { }

   requestPasscode(sendObject: IRequestPasscodeMessage): Observable<IResponseMessageAPI> {

      if (!sendObject.imageTakenAgreement || !sendObject.personalDataAgreement) {
         return of(FrontEndException.termsAndConditionAcceptError as any);
      }

      return this.messageHandler.postMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.requestPasscodeBE,
         sendObject,
         RequestHeaderUsages.withoutToken)
         .pipe(map(response => response));
   }

}
