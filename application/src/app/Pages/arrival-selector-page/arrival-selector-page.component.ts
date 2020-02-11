// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';

// custom imports
import { ResponseStatusCodes } from './../../SharedObjects/enums/responseStatusCodes';
import { IArrivalPoints } from '../../SharedObjects/models/iArrivalPoints';
import { ISelectedTimeslot } from './../../SharedObjects/models/iSelectedTimeslot';
import { ArrivalSelectionMessage } from './../../SharedObjects/models/arrivalSelectionMessage';
import { ArrivalPointSelectorService } from './../../Services/ArrivalPointSelector/arrival-point-selector.service';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { ISelector } from './../../SharedObjects/models/iSelector';
import { IArrivalDatesResponse } from './../../SharedObjects/models/iArrivalDatesResponse';
import { MobileRenderDeciderService } from './../../Services/MobileRenderDecider/mobile-render-decider.service';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';

@Component({
   selector: 'app-arrival-selector-page',
   templateUrl: './arrival-selector-page.component.html',
   styleUrls: ['./arrival-selector-page.component.scss']
})
export class ArrivalSelectorPageComponent implements OnInit, OnDestroy {
   public arrivalDates: ISelector[] = [];
   public arrivalPoints: IArrivalPoints[] = [];
   public deviceIsMobile: boolean;
   public errorMessage: string;
   public pageHasError: boolean;
   private timeslotRefreshTimer;
   private timeslotRefreshSubscription: Subscription;

   constructor(
      private arrivalSelectionMessage: ArrivalSelectionMessage,
      private arrivalPointSelectorService: ArrivalPointSelectorService,
      private router: Router,
      private mobileDecider: MobileRenderDeciderService,
      public dialog: MatDialog
   ) {
      this.errorMessage = '';
      this.pageHasError = false;
      this.deviceIsMobile = this.mobileDecider.deviceIsMobile();
      this.addOrientationChangeListener();

      this.arrivalPointSelectorService.getAvailableDates().subscribe(result => {
         if (result.statusCode === ResponseStatusCodes.OK) {
            const datesResponse = result.data as IArrivalDatesResponse;

            if (!datesResponse.registrationPeriodIsActive ||
               !(datesResponse.arrivalDates.length > 0)) {
               this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
            } else {
               this.arrivalDates = datesResponse.arrivalDates;
               this.arrivalSelectionMessage.visitDay = this.arrivalDates[0].value;
               this.getArrivalPointTimeslots();
            }
         } else {
            this.pageHasError = true;
            this.errorMessage = result.errorMessage;
         }
      });
      this.timeslotRefreshTimer = timer(1000, GENERALSETTINGS.refreshTime);
      this.timeslotRefreshSubscription = this.timeslotRefreshTimer.subscribe(t => {
         if (this.arrivalSelectionMessage.visitDay.length > 0) {
            this.getArrivalPointTimeslots();
         }
      });
   }

   ngOnDestroy() {
      this.timeslotRefreshSubscription.unsubscribe();
   }

   addOrientationChangeListener() {
      window.addEventListener('orientationchange', result => {
         this.deviceIsMobile = this.mobileDecider.deviceIsMobile();
      }, false);
   }

   getArrivalPointTimeslots() {
      this.arrivalPointSelectorService.requestArrivalPointTimeslots(this.arrivalSelectionMessage.visitDay).subscribe(result => {
         if (result.statusCode === ResponseStatusCodes.OK) {
            let arrivalPointData = result.data as IArrivalPoints[];

            // if we don't have arrival point open timeslot for that day we remove it
            arrivalPointData = arrivalPointData.filter(arrivalPoint => arrivalPoint.openTimeslots.length > 0);

            // keep selected timeslot if available
            if (this.arrivalSelectionMessage.idArrivalPoint > 0) {
               arrivalPointData.forEach(arrivalPoint => {
                  if (arrivalPoint.idArrivalPoint === this.arrivalSelectionMessage.idArrivalPoint) {
                     arrivalPoint.openTimeslots.forEach(openTimeslot => {
                        if (openTimeslot.timeslotStart === this.arrivalSelectionMessage.timeslotStart) {
                           if (openTimeslot.availablePlaces >= 6) {
                              openTimeslot.isSelected = true;
                           } else {
                              openTimeslot.isSelected = false;
                           }
                        }
                     });
                  }
               });
            }

            this.arrivalPoints = arrivalPointData;
         } else {
            this.pageHasError = true;
            this.errorMessage = result.errorMessage;
         }
      });
   }

   selectedDateChanged(selectedDate: string) {
      this.arrivalSelectionMessage.visitDay = selectedDate;
      this.getArrivalPointTimeslots();
   }

   ngOnInit() {
   }

   nextStep() {
      this.pageHasError = false;
      this.errorMessage = '';
      this.arrivalSelectionMessage.updateWithoutFastTrack = false;
      this.storeSelectedArrivalPoint();
   }

   storeSelectedArrivalPoint() {
      this.arrivalPointSelectorService.confirmArrivalPoint(this.arrivalSelectionMessage).subscribe(
         result => {
            if (result.statusCode === ResponseStatusCodes.OK) {
               this.router.navigate(['/' + EndPoints.visitorsDetailPageFE]);
            } else {
               this.pageHasError = true;
               this.errorMessage = result.errorMessage;
            }
         });
   }

   updateArrivalSelectionMessage(selectedTimeslot: ISelectedTimeslot) {
      this.arrivalSelectionMessage.idArrivalPoint = selectedTimeslot.idArrivalPoint;
      this.arrivalSelectionMessage.timeslotStart = selectedTimeslot.timeslotStart;
      // remove error message
      this.pageHasError = false;
      this.errorMessage = '';
   }

   cancelProcess() {
      this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
   }
}
