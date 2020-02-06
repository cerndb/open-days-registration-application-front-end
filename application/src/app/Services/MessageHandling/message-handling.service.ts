// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

// custom classes and interfaces
import { GENERALSETTINGS } from 'src/app/SharedObjects/constants/generalSettings';
import { environment } from './../../../environments/environment';
import { FrontEndException } from './../../SharedObjects/models/frontEndException';
import { IResponseMessageAPI } from './../../SharedObjects/models/iResponseMessageAPI';
import { RequestHeaderUsages } from './../../SharedObjects/enums/requestHeaderUsages';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { ResponseStatusCodes } from 'src/app/SharedObjects/enums/responseStatusCodes';

@Injectable({
   providedIn: 'root'
})
export class MessageHandlingService {
   private messageHeaders: HttpHeaders;

   constructor(private http: HttpClient, private router: Router) {
   }

   getHttpHeadersWithoutToken(): HttpHeaders {
      let requestHeader = new HttpHeaders();
      requestHeader = requestHeader.append('Content-Type', 'application/json; charset=UTF-8');
      requestHeader = requestHeader.append('Accept', 'application/json');
      requestHeader = requestHeader.append('Accept-Language', environment.language);
      return requestHeader;
   }

   getHttpHeadersWithToken(): HttpHeaders {
      let requestHeader = this.getHttpHeadersWithoutToken();
      const messageToken = localStorage.getItem(GENERALSETTINGS.tokenStoreNameFE);
      if (messageToken) {
         requestHeader = requestHeader.append('Authorization', 'Bearer ' + messageToken);
      } else {
         this.removeToken(FrontEndException.tokenExpiredError.errorCode);
      }

      return requestHeader;
   }

   postMessageObservable(requestURL: string, requestMessage: any, headerUsage: number): Observable<IResponseMessageAPI> {

      if (headerUsage === RequestHeaderUsages.withoutToken) {
         this.messageHeaders = this.getHttpHeadersWithoutToken();
      } else {
         this.messageHeaders = this.getHttpHeadersWithToken();
      }

      return this.http.post(requestURL, JSON.stringify(requestMessage), { headers: this.messageHeaders })
         .pipe(
            map(response => {
               this.customResponseActions(response as IResponseMessageAPI);
               return response;
            }),
            catchError(err => {

               const frontEndMessageHandlingError: IResponseMessageAPI = {
                  statusCode: FrontEndException.networkError.errorCode,
                  errorMessage: FrontEndException.networkError.errorMessage
               };

               return of(frontEndMessageHandlingError as any);
            })
         );
   }

   getMessageObservable(requestURL: string, headerUsage: number): Observable<IResponseMessageAPI> {

      if (headerUsage === RequestHeaderUsages.withoutToken) {
         this.messageHeaders = this.getHttpHeadersWithoutToken();
      } else {
         this.messageHeaders = this.getHttpHeadersWithToken();
      }

      return this.http.get(requestURL, { headers: this.messageHeaders })
         .pipe(
            map(response => {
               this.customResponseActions(response as IResponseMessageAPI);
               return response;
            }),
            catchError(err => {

               const frontEndMessageHandlingError: IResponseMessageAPI = {
                  statusCode: FrontEndException.networkError.errorCode,
                  errorMessage: FrontEndException.networkError.errorMessage
               };

               return of(frontEndMessageHandlingError as any);
            })
         );
   }

   private customResponseActions(responseMessage: IResponseMessageAPI) {
      if (responseMessage.statusCode === ResponseStatusCodes.TOKEN_ERROR) {
         this.removeToken(FrontEndException.tokenExpiredError.errorCode);
      }
   }

   private removeToken(errorCode: number) {
      localStorage.removeItem(GENERALSETTINGS.tokenStoreNameFE);
      this.router.navigate(['/' + EndPoints.requestPasscodeFE + '/' + errorCode.toString()]);
   }

}
