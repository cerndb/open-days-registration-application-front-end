// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ResponseStatusCodes } from './../../SharedObjects/enums/responseStatusCodes';
import { Component, OnInit } from '@angular/core';
import { EndPoints } from 'src/app/SharedObjects/constants/endPoints';

import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';
import { MobileRenderDeciderService } from './../../Services/MobileRenderDecider/mobile-render-decider.service';
import { environment } from 'src/environments/environment';
import { ArrivalPointSelectorService } from './../../Services/ArrivalPointSelector/arrival-point-selector.service';
import { DailySpaceAvailablity } from './../../SharedObjects/models/dailySpaceAvailablity';

@Component({
   selector: 'app-welcome-page',
   templateUrl: './welcome-page.component.html',
   styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

   public requestPassCodePage = EndPoints.requestPasscodeFE;
   public requestTokenPage = EndPoints.requestTokenFE;
   public deviceIsMobile: boolean;
   public moreInformationURL: string;
   public pageIsFrench: boolean;
   public pageHasError: boolean;
   public pageErrorMessage: string;
   public displayDailyAvailablityTable: boolean;
   public dailyAvailabiltyTable: DailySpaceAvailablity[];

   constructor(
      private mobileDecider: MobileRenderDeciderService,
      private arrivalPointSelectorService: ArrivalPointSelectorService
   ) {
      this.deviceIsMobile = mobileDecider.deviceIsMobile();
      this.pageHasError = false;
      this.pageErrorMessage = '';
      this.displayDailyAvailablityTable = false;

      // remove existing token
      localStorage.removeItem(GENERALSETTINGS.tokenStoreNameFE);

      if (environment.language === 'en') {
         this.moreInformationURL = GENERALSETTINGS.detailedInformationAboutOpendaysEN;
         this.pageIsFrench = false;
      } else {
         this.moreInformationURL = GENERALSETTINGS.detailedInformationAboutOpendaysFR;
         this.pageIsFrench = true;
      }

      this.arrivalPointSelectorService.getDailyAvailablePlaces().subscribe(response => {
         if (response.statusCode === ResponseStatusCodes.OK) {
            this.displayDailyAvailablityTable = true;
            this.dailyAvailabiltyTable = response.data.dailyAvailablePlaces as DailySpaceAvailablity[];
         } else {
            this.pageHasError = true;
            this.pageErrorMessage = response.errorMessage;
         }
      });
   }

   ngOnInit() {
   }

}
