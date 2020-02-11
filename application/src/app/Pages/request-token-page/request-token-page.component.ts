// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ResponseStatusCodes } from 'src/app/SharedObjects/enums/responseStatusCodes';
import { ITokenRequestParams } from './../../SharedObjects/models/iTokenRequestParams';
import { Component, OnInit } from '@angular/core';

import { RequestTokenMessage } from './../../SharedObjects/models/requestTokenMessage';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-request-token-page',
   templateUrl: './request-token-page.component.html',
   styleUrls: ['./request-token-page.component.scss']
})
export class RequestTokenPageComponent implements OnInit {

   errorMessage: string;
   errorMessageIsVisible: boolean;

   constructor(
      private route: ActivatedRoute,
      public requestTokenMessage: RequestTokenMessage,
      private authenticationService: AuthenticationService) {
      this.errorMessage = '';
      this.errorMessageIsVisible = false;
   }

   ngOnInit() {
      this.populateFromQueryParams();
   }

   populateFromQueryParams() {
      this.route.queryParams.subscribe(params => {

         const passedParams = params as ITokenRequestParams;

         if (passedParams.contactIdentifier === undefined || passedParams.contactIdentifier === null) {
            this.requestTokenMessage.mailAddress = '';
         } else {
            if (passedParams.contactIdentifier.trim().length > 0) {
               this.requestTokenMessage.mailAddress = atob(passedParams.contactIdentifier.trim());
            } else {
               this.requestTokenMessage.mailAddress = '';
            }
         }

         if (passedParams.passcode === undefined || passedParams.passcode === null) {
            this.requestTokenMessage.passcode = '';
         } else {
            this.requestTokenMessage.passcode = passedParams.passcode.trim();
         }

         if ((this.requestTokenMessage.passcode.length > 0) &&
            (this.requestTokenMessage.mailAddress.length > 0)) {
            this.requestToken();
         }

      });
   }

   requestToken() {

      this.authenticationService.requestToken(this.requestTokenMessage).subscribe(
         response => {

            let showErrorMessage = false;

            if (response.statusCode !== ResponseStatusCodes.OK) {
               showErrorMessage = true;
               this.errorMessage = response.errorMessage;
            } else {
               showErrorMessage = false;
            }

            this.errorMessageIsVisible = showErrorMessage;
         });
   }
}
