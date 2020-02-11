// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { MobileRenderDeciderService } from './../../Services/MobileRenderDecider/mobile-render-decider.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// custom classes and interfaces and constants
import { GENERALSETTINGS } from 'src/app/SharedObjects/constants/generalSettings';
import { VisitorDetail } from './../../SharedObjects/models/visitorDetail';
import { ResponseStatusCodes } from 'src/app/SharedObjects/enums/responseStatusCodes';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { StoreVisitorDetailsMessage } from './../../SharedObjects/models/storeVisitorDetailsMessage';
import { WorkflowTypes } from './../../SharedObjects/enums/workflowTypes';

// services
import { VisitorDetailsService } from './../../Services/VisitorDetails/visitor-details.service';

@Component({
   selector: 'app-visitors-detail-page',
   templateUrl: './visitors-detail-page.component.html',
   styleUrls: ['./visitors-detail-page.component.scss']
})
export class VisitorsDetailPageComponent implements OnInit {

   public visitorDetailsStoreMessage: StoreVisitorDetailsMessage;
   public maxNumberOfVisistors: number;
   public fastTrackAllowed: boolean;
   public pageHasError: boolean;
   public pageErrorMessage: string;
   public deviceIsMobile: boolean;
   public groupHasDisabledPerson: boolean;
   public workflowType: number;
   public numberOfAvailableFastTrackPlaces: number;
   public inputError: boolean;

   constructor(
      private visitorDetailsService: VisitorDetailsService,
      private router: Router,
      private mobileDecider: MobileRenderDeciderService
   ) {
      this.inputError = false;
      this.numberOfAvailableFastTrackPlaces = -1;
      this.workflowType = WorkflowTypes.NEW_RESERVATION;
      this.visitorDetailsStoreMessage = new StoreVisitorDetailsMessage([], false);
      this.maxNumberOfVisistors = GENERALSETTINGS.maxNumberOfAllowedVisitors;
      this.deviceIsMobile = this.mobileDecider.deviceIsMobile();
      this.pageHasError = false;
      this.pageErrorMessage = '';
      this.fastTrackAllowed = false;
      this.visitorDetailsService.getconfirmedVisitorDetails().subscribe(response => {
         if (response.statusCode === ResponseStatusCodes.OK) {
            if (response.data.groupHasDisabledPerson) {
               this.visitorDetailsStoreMessage.groupHasDisabledPerson = response.data.groupHasDisabledPerson;
            }
            this.fastTrackAllowed = response.data.fastTrackAllowed;

            this.visitorDetailsStoreMessage.visitorDetails = response.data.visitorDetails;
            if (this.visitorDetailsStoreMessage.visitorDetails.length < 1) {
               this.visitorDetailsStoreMessage.visitorDetails.push(new VisitorDetail());
            }

         } else {
            this.pageHasError = true;
            this.pageErrorMessage = response.errorMessage;
         }
      });
   }

   ngOnInit() {
   }


   nextStep() {
      this.storeVisitorDetails(EndPoints.transportTypeSelectorPageFE, false);
   }

   backStep() {
      if (this.visitorDetailsStoreMessage.visitorDetails.length > 0) {
         this.storeVisitorDetails(EndPoints.arrivalSelectorPageFE, true);
      } else {
         this.router.navigate(['/' + EndPoints.arrivalSelectorPageFE]);
      }
   }

   storeVisitorDetails(nextPage: string, ignoreError: boolean) {
      if (!this.inputError) {
         this.visitorDetailsService.storeVisitorDetails(this.visitorDetailsStoreMessage).subscribe(response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.pageHasError = false;
               this.pageErrorMessage = '';
               this.router.navigate(['/' + nextPage]);
            } else {
               if (ignoreError) {
                  this.router.navigate(['/' + nextPage]);
               } else {
                  this.pageHasError = true;
                  this.pageErrorMessage = response.errorMessage;
               }
            }
         });
      }
   }

   actualizeStoreMessage(updatedContent: StoreVisitorDetailsMessage) {
      this.visitorDetailsStoreMessage = updatedContent;
   }

   cancelProcess() {
      this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
   }

   inputErrorStatusChanges(errorStatus: boolean) {
      this.inputError = errorStatus;
   }

}
