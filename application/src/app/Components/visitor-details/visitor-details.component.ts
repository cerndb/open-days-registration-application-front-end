// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { environment } from './../../../environments/environment';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';
import { FrontEndException } from './../../SharedObjects/models/frontEndException';
import { Validators } from '../../SharedObjects/constants/validators';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

// custom components
import { IVisitorDetail } from './../../SharedObjects/models/iVisitorDetail';

@Component({
   selector: 'app-visitor-details',
   templateUrl: './visitor-details.component.html',
   styleUrls: ['./visitor-details.component.scss']
})
export class VisitorDetailsComponent implements OnInit, OnChanges {

   @Input() visitorDetail: IVisitorDetail;
   @Input() deviceIsMobile: boolean;
   @Input() visitorIndex: number;
   @Input() fastTrackAllowed: boolean;
   @Output() visitorNeedsToBeRemoved = new EventEmitter<number>();
   @Output() visitorDetailChanged = new EventEmitter<IVisitorDetail>();
   @Output() inputErrorStatusChanged = new EventEmitter<boolean>();

   public visitorAge: string;
   public errorMessageVisible: boolean;
   public errorMessageText: string;
   public fastTrackDisabled: boolean;
   public moreInformationURL: string;

   constructor() {
      this.errorMessageText = '';
      this.errorMessageVisible = false;

      if (environment.language === 'en') {
         this.moreInformationURL = GENERALSETTINGS.detailedInformationAboutOpendaysEN;
      } else {
         this.moreInformationURL = GENERALSETTINGS.detailedInformationAboutOpendaysFR;
      }
   }

   removeVisitor() {
      this.visitorNeedsToBeRemoved.emit(this.visitorIndex);
   }

   visitorDetailHasChanged() {
      this.visitorDetailChanged.emit(this.visitorDetail);
   }

   ngOnInit() {
   }

   ngOnChanges(changes: SimpleChanges) {
      this.visitorDetail.idVisitor = this.visitorIndex;
      this.visitorAge = this.visitorDetail.visitorAge.toString();
      this.visitorAgeIsInvalid(this.visitorDetail.visitorAge);
   }

   visitorAgeIsInvalid(checkAge: number): boolean {
      let ageIsInvalid: boolean;
      if (checkAge > 120 || checkAge < 0) {
         this.errorMessageVisible = true;
         this.errorMessageText = FrontEndException.visitorAgeError.errorMessage;
         ageIsInvalid = true;
         this.inputErrorStatusChanged.emit(true);
      } else {
         ageIsInvalid = false;
         this.inputErrorStatusChanged.emit(false);
      }
      return ageIsInvalid;
   }

   onKey(event: KeyboardEvent) {
      let inputAge: string;
      let inputHasError: boolean;
      let error: FrontEndException;

      if (this.visitorAge.length > 0) {
         inputAge = this.visitorAge;
      } else {
         inputAge = '0';
      }
      if (inputAge.match(Validators.inputIsNumberRegExp) && inputAge.length > 0) {
         const providedAge = parseInt(inputAge, 10);
         this.visitorAge = providedAge.toString();

         if (!this.visitorAgeIsInvalid(providedAge)) {
            this.visitorDetail.visitorAge = providedAge;

            if (this.visitorDetail.visitorAge < Validators.childAgeLimiter) {
               this.visitorDetail.fastTrackSelected = false;
               this.fastTrackDisabled = true;
            } else {
               this.fastTrackDisabled = false;
            }

            this.visitorDetailChanged.emit(this.visitorDetail);
            inputHasError = false;
         } else {
            inputHasError = true;
            error = FrontEndException.visitorAgeError;
         }
      } else {
         inputHasError = true;
         error = FrontEndException.visitorAgeError;
      }

      if (inputHasError) {
         this.errorMessageVisible = inputHasError;
         this.errorMessageText = error.errorMessage;
         this.inputErrorStatusChanged.emit(true);
      } else {
         this.errorMessageVisible = false;
         this.errorMessageText = '';
         this.inputErrorStatusChanged.emit(false);
      }
   }

   fastTrackRequestChange(event: any) {
      this.visitorDetailChanged.emit(this.visitorDetail);
   }
}
