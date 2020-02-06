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

import { ArrivalPointSelectorService } from './../../Services/ArrivalPointSelector/arrival-point-selector.service';
import { ResponseStatusCodes } from './../../SharedObjects/enums/responseStatusCodes';
import { IArrivalData } from './../../SharedObjects/models/iArrivalData';
import { EndPoints } from 'src/app/SharedObjects/constants/endPoints';
import { MobileRenderDeciderService } from 'src/app/Services/MobileRenderDecider/mobile-render-decider.service';
import { ArrivalSelectionMessage } from './../../SharedObjects/models/arrivalSelectionMessage';
import { IArrivalPoints } from './../../SharedObjects/models/iArrivalPoints';
import { ISelectedTimeslot } from './../../SharedObjects/models/iSelectedTimeslot';
import { NoFastTrackLhcDialogComponent } from './../../Dialogs/no-fast-track-lhc-dialog/no-fast-track-lhc-dialog.component';
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';

@Component({
   selector: 'app-update-arrival-point',
   templateUrl: './update-arrival-point.component.html',
   styleUrls: ['./update-arrival-point.component.scss']
})
export class UpdateArrivalPointComponent implements OnInit, OnDestroy {

   public errorMessage: string;
   public pageHasError: boolean;
   public visitDay: string;
   public arrivalPoints: IArrivalPoints[] = [];
   private timeslotRefreshTimer;
   private timeslotRefreshSubscription: Subscription;
   public deviceIsMobile: boolean;

   constructor(
      public updateArrivalPointMessage: ArrivalSelectionMessage,
      private arrivalPointSelectorService: ArrivalPointSelectorService,
      private router: Router,
      private mobileDecider: MobileRenderDeciderService,
      public dialog: MatDialog
   ) {
      this.deviceIsMobile = this.mobileDecider.deviceIsMobile();
      this.addOrientationChangeListener();
      this.arrivalPointSelectorService.getReservationDate().subscribe(
         result => {
            if (result.statusCode === ResponseStatusCodes.OK) {
               const arrivalData = result.data as IArrivalData;
               this.visitDay = arrivalData.visitdayDetails.displayName;
               this.updateArrivalPointMessage.updateFromArrivalData(arrivalData);
               this.getArrivalPointTimeslots();
            } else {
               this.pageHasError = true;
               this.errorMessage = result.errorMessage;
            }
         });
      this.timeslotRefreshTimer = timer(1000, GENERALSETTINGS.refreshTime);
      this.timeslotRefreshSubscription = this.timeslotRefreshTimer.subscribe(t => {
         if (this.updateArrivalPointMessage.visitDay.length > 0) {
            this.getArrivalPointTimeslots();
         }
      });
   }

   ngOnInit() {
   }

   cancelUpdateProcess() {
      this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
   }

   updateReservation() {
      this.arrivalPointSelectorService.updateArrivalPoint(this.updateArrivalPointMessage).subscribe(
         result => {
            if (result.statusCode === ResponseStatusCodes.OK) {
               this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
            } else if (result.statusCode === ResponseStatusCodes.NO_FAST_TRACK_TICKETS) {
               this.openUpdateWithoutFastTrackDialog();
            } else {
               this.pageHasError = true;
               this.errorMessage = result.errorMessage;
            }
         });
   }

   openUpdateWithoutFastTrackDialog(): void {
      const dialogRef = this.dialog.open(NoFastTrackLhcDialogComponent, {
         width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
         if (result === 1) {
            this.updateArrivalPointMessage.updateWithoutFastTrack = true;
            this.updateReservation();
         }
      });
   }

   updateArrivalSelectionMessage(selectedTimeslot: ISelectedTimeslot) {
      this.updateArrivalPointMessage.idArrivalPoint = selectedTimeslot.idArrivalPoint;
      this.updateArrivalPointMessage.timeslotStart = selectedTimeslot.timeslotStart;
      // remove error message
      this.pageHasError = false;
      this.errorMessage = '';
   }

   getArrivalPointTimeslots() {
      this.arrivalPointSelectorService.requestArrivalPointTimeslots(this.updateArrivalPointMessage.visitDay).subscribe(result => {
         if (result.statusCode === ResponseStatusCodes.OK) {
            let arrivalPointData = result.data as IArrivalPoints[];

            // if we don't have arrival point open timeslot for that day we remove it
            arrivalPointData = arrivalPointData.filter(arrivalPoint => arrivalPoint.openTimeslots.length > 0);

            // keep selected timeslot if available
            if (this.updateArrivalPointMessage.idArrivalPoint > 0) {
               arrivalPointData.forEach(arrivalPoint => {
                  if (arrivalPoint.idArrivalPoint === this.updateArrivalPointMessage.idArrivalPoint) {
                     arrivalPoint.openTimeslots.forEach(openTimeslot => {
                        if (openTimeslot.timeslotStart === this.updateArrivalPointMessage.timeslotStart) {
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

   ngOnDestroy() {
      this.timeslotRefreshSubscription.unsubscribe();
   }

   addOrientationChangeListener() {
      window.addEventListener('orientationchange', result => {
         this.deviceIsMobile = this.mobileDecider.deviceIsMobile();
      }, false);
   }
}
