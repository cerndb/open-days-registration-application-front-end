// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Injectable } from '@angular/core';
import { IRequestPasscodeMessage } from './iRequestPasscodeMessage';

@Injectable({ providedIn: 'root' })
export class RequestPasscodeMessage implements IRequestPasscodeMessage {
   captchaToken: string;
   mailAddress: string;
   personalDataAgreement: boolean;
   imageTakenAgreement: boolean;
   preferredLanguage: string;
   firstname253589667: string;
   lastname345996689: string;
   phone268459683: string;
   constructor() {
      this.captchaToken = '';
      this.mailAddress = '';
      this.preferredLanguage = '';
      this.firstname253589667 = '';
      this.lastname345996689 = '';
      this.phone268459683 = '';
      this.personalDataAgreement = false;
      this.imageTakenAgreement = false;
   }
}
