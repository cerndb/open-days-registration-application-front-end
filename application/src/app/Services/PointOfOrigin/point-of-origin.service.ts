// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { IResponseMessageAPI } from './../../SharedObjects/models/iResponseMessageAPI';
import { RequestHeaderUsages } from './../../SharedObjects/enums/requestHeaderUsages';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';
import { Injectable } from '@angular/core';
import { MessageHandlingService } from './../MessageHandling/message-handling.service';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class PointOfOriginService {

   constructor(private messageHandler: MessageHandlingService) { }

   getPointOfOrigin(): Observable<IResponseMessageAPI> {
      return this.messageHandler.getMessageObservable(
         GENERALSETTINGS.registrationAPI + EndPoints.getPointOfOriginBE,
         RequestHeaderUsages.withToken);
   }
}
