// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { IResponseTokenData } from './../../SharedObjects/models/iResponseTokenData';
import { ResponseStatusCodes } from './../../SharedObjects/enums/responseStatusCodes';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// custom interfaces
import { IResponseMessageAPI } from './../../SharedObjects/models/iResponseMessageAPI';
import { IRequestTokenMessage } from '../../SharedObjects/models/iRequestTokenMessage';

// custom settings
import { RequestHeaderUsages } from './../../SharedObjects/enums/requestHeaderUsages';
import { EndPoints } from '../../SharedObjects/constants/endPoints';
import { GENERALSETTINGS } from 'src/app/SharedObjects/constants/generalSettings';

// custom services
import { MessageHandlingService } from '../MessageHandling/message-handling.service';
import { Router } from '@angular/router';


@Injectable({
   providedIn: 'root'
})
export class AuthenticationService {

   constructor(private messageHandler: MessageHandlingService, private router: Router) { }

   requestToken(sendObject: IRequestTokenMessage): Observable<IResponseMessageAPI> {

      return this.messageHandler.postMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.requestAccessTokenBE,
         sendObject,
         RequestHeaderUsages.withoutToken)
         .pipe(map(response => {

            // if successful store token and navigate to summary
            if (response.statusCode === ResponseStatusCodes.OK) {
               const requestData = response.data as IResponseTokenData;
               localStorage.setItem(GENERALSETTINGS.tokenStoreNameFE, requestData.token);
               this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
            }

            return response;
         }
         ));
   }

   updateToken(newToken: string) {
      localStorage.setItem(GENERALSETTINGS.tokenStoreNameFE, newToken);
   }

}
