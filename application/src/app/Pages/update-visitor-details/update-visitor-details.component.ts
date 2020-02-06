// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MobileRenderDeciderService } from './../../Services/MobileRenderDecider/mobile-render-decider.service';
import { VisitorDetailsService } from './../../Services/VisitorDetails/visitor-details.service';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { ResponseStatusCodes } from './../../SharedObjects/enums/responseStatusCodes';
import { StoreVisitorDetailsMessage } from './../../SharedObjects/models/storeVisitorDetailsMessage';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';
import { WorkflowTypes } from './../../SharedObjects/enums/workflowTypes';

@Component({
   selector: 'app-update-visitor-details',
   templateUrl: './update-visitor-details.component.html',
   styleUrls: ['./update-visitor-details.component.scss']
})
export class UpdateVisitorDetailsComponent implements OnInit {

   public visitorDetailsUpdateMessage: StoreVisitorDetailsMessage;
   public pageErrorMessage: string;
   public pageHasError: boolean;
   public deviceIsMobile: boolean;
   public maxNumberOfVisistors: number;
   public fastTrackAllowed: boolean;
   public numberOfAvailableFastTrackPlaces: number;
   public workflowType: number;
   public inputError: boolean;

   constructor(
      private visitorDetailsService: VisitorDetailsService,
      private router: Router,
      private mobileDecider: MobileRenderDeciderService
   ) {
      this.inputError = false;
      this.workflowType = WorkflowTypes.UPDATE_RESERVATION;
      this.visitorDetailsUpdateMessage = new StoreVisitorDetailsMessage([], false);
      this.pageErrorMessage = '';
      this.pageHasError = false;
      this.deviceIsMobile = this.mobileDecider.deviceIsMobile();
      this.maxNumberOfVisistors = GENERALSETTINGS.maxNumberOfAllowedVisitors;
      this.fastTrackAllowed = false;
      this.numberOfAvailableFastTrackPlaces = 0;
      this.getVisitorDetails();

   }

   getVisitorDetails() {
      this.visitorDetailsService.getVisitorDetailsForUpdate().subscribe(
         response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.visitorDetailsUpdateMessage.visitorDetails = response.data.visitorDetails;
               this.visitorDetailsUpdateMessage.groupHasDisabledPerson = response.data.groupHasDisabledPerson;
               this.maxNumberOfVisistors = response.data.numberOfAvailablePlaces;
               this.numberOfAvailableFastTrackPlaces = response.data.numberOfAvailableFastTrackPlaces;
               const numberOfExistingFastTrackTickets = this.visitorDetailsUpdateMessage.visitorDetails
                  .filter(visitor => visitor.fastTrackSelected).length;

               if (response.data.numberOfAvailableFastTrackPlaces > 0 || numberOfExistingFastTrackTickets > 0) {
                  this.fastTrackAllowed = true;
               }

            } else {
               this.pageErrorMessage = response.errorMessage;
               this.pageHasError = true;
            }
         });
   }


   ngOnInit() {
   }

   cancelUpdateProcess() {
      this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
   }

   updateReservation() {
      if (!this.inputError) {
         this.visitorDetailsService.updateVisitorDetails(this.visitorDetailsUpdateMessage)
            .subscribe(response => {
               if (response.statusCode === ResponseStatusCodes.OK) {
                  this.pageErrorMessage = '';
                  this.pageHasError = false;
                  this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
               } else if (
                  response.statusCode === ResponseStatusCodes.RESERVATION_UPDATE_NOT_ENOUGH_FAST_TRACK_PLACE ||
                  response.statusCode === ResponseStatusCodes.RESERVATION_UPDATE_NOT_ENOUGH_PLACE
               ) {
                  this.getVisitorDetails();
                  this.pageErrorMessage = response.errorMessage;
                  this.pageHasError = true;
               } else {
                  this.pageErrorMessage = response.errorMessage;
                  this.pageHasError = true;
               }
            });
      }
   }

   actualizeStoreMessage(updatedContent: StoreVisitorDetailsMessage) {
      this.visitorDetailsUpdateMessage = updatedContent;
   }

   inputErrorStatusChanges(errorStatus: boolean) {
      this.inputError = errorStatus;
   }

}
