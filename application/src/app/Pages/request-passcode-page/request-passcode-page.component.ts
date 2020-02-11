// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GENERALSETTINGS } from '../../SharedObjects/constants/generalSettings';
import { RequestPasscodeMessage } from '../../SharedObjects/models/requestPasscodeMessage';
import { RequestPasscodeService } from 'src/app/Services/RequestPasscode/request-passcode.service';
import { ResponseStatusCodes } from 'src/app/SharedObjects/enums/responseStatusCodes';
import { MobileRenderDeciderService } from './../../Services/MobileRenderDecider/mobile-render-decider.service';

@Component({
   selector: 'app-request-passcode-page',
   templateUrl: './request-passcode-page.component.html',
   styleUrls: ['./request-passcode-page.component.scss']
})
export class RequestPasscodePageComponent implements OnInit {

   public pageHasError: boolean;
   public pageErrorMessage: string;
   public reCaptchaIsEnabled: boolean;
   public passcodesuccessfulRequested: boolean;
   public errorMessageIsVisible: boolean;
   public errorMessage: string;
   public deviceIsMobile: boolean;
   public visitorRegistartionPrivacyNoticeLink: string;
   public siteSecurityPrivacyNotice: string;

   constructor(
      private requestPasscodeService: RequestPasscodeService,
      public requestPasscodeMessage: RequestPasscodeMessage,
      private activatedRoute: ActivatedRoute,
      private mobileDecider: MobileRenderDeciderService,
      private router: Router
   ) {

      if (environment.language === 'en') {
         this.visitorRegistartionPrivacyNoticeLink = GENERALSETTINGS.visitorRegistartionPrivacyNoticeLinkEN;
         this.siteSecurityPrivacyNotice = GENERALSETTINGS.siteSecurityPrivacyNoticeEN;
      } else {
         this.visitorRegistartionPrivacyNoticeLink = GENERALSETTINGS.visitorRegistartionPrivacyNoticeLinkFR;
         this.siteSecurityPrivacyNotice = GENERALSETTINGS.siteSecurityPrivacyNoticeFR;
      }

      this.deviceIsMobile = this.mobileDecider.deviceIsMobile();
      this.reCaptchaIsEnabled = GENERALSETTINGS.reCaptchaIsEnabled;
      this.passcodesuccessfulRequested = false;
      this.errorMessageIsVisible = false;
      this.errorMessage = '';
      this.requestPasscodeMessage.imageTakenAgreement = false;
      this.requestPasscodeMessage.personalDataAgreement = false;
   }

   ngOnInit() {
      this.pageHasError = false;
      this.pageErrorMessage = '';

      const activatedRouteParams = this.activatedRoute.snapshot.params;

      const errorCode = activatedRouteParams.errorCode;
      if (errorCode) {
         this.pageHasError = true;
         // In case you want to show error message here you can define
         this.pageErrorMessage = '';
      }
   }

   // bind reCaptcha token with reqest token message
   captchaValidationMade(validatedToken: string) {
      this.requestPasscodeMessage.captchaToken = validatedToken;
   }

   requestPasscode() {
      this.requestPasscodeService.requestPasscode(this.requestPasscodeMessage).subscribe(
         response => {

            let errorIsVisible = false;

            if (response.statusCode !== ResponseStatusCodes.OK) {
               errorIsVisible = true;
               this.errorMessage = response.errorMessage;
            } else {
               this.passcodesuccessfulRequested = true;
               errorIsVisible = false;
            }

            this.errorMessageIsVisible = errorIsVisible;
         });
   }

   navigateToLogin() {
      this.router.navigate(['/' + EndPoints.requestTokenFE]);
   }
}
