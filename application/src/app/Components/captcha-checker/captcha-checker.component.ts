// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { GENERALSETTINGS } from '../../SharedObjects/constants/generalSettings';
import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { IReCAPTCHA } from 'src/app/SharedObjects/models/iReCAPTCHA';
import { environment } from 'src/environments/environment';

declare var grecaptcha: IReCAPTCHA;
declare var window: any;

@Component({
   selector: 'app-captcha-checker',
   templateUrl: './captcha-checker.component.html',
   styleUrls: ['./captcha-checker.component.scss']
})
export class CaptchaCheckerComponent implements OnInit {

   @Output() nonRobotStatusProoved = new EventEmitter<string>();

   constructor(private element: ElementRef) { }

   ngOnInit() {
      this.registerReCaptchaCallback();
      this.addCaptchaScript();
   }

   public reCAPTCHACallback(token: string) {

      // checks for undefined or null
      if (token == null || token.length === 0) {
         grecaptcha.reset();
         // At the end we did not use captcha
         // In case you want to use here you can add the code which reports that captcha was invalid
      } else {
         this.nonRobotStatusProoved.emit(token);
      }
   }

   public addCaptchaScript() {
      const script = document.createElement('script');

      // setting the captcha script language
      const lang = '&hl=' + environment.language;

      script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
      script.async = true;
      script.defer = true;
      script.id = 'recaptchaScript';
      const oldscript = window.document.getElementById('recaptchaScript');
      if (oldscript) {
         window.document.body.removeChild(oldscript);
      }
      window.document.body.appendChild(script);
   }

   registerReCaptchaCallback() {
      window.reCaptchaLoad = () => {

         // Export reCAPTCHACallback to global scope.
         const reCAPTCHACallback = 'reCAPTCHACallback';
         window[reCAPTCHACallback] = this.reCAPTCHACallback.bind(this);

         const config = {
            sitekey: GENERALSETTINGS.reCaptchaSitekey,
            callback: reCAPTCHACallback
         };

         // render the captcha into the target div
         grecaptcha.render('captcha-checker', config);
      };
   }
}
