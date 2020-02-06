// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

import { ResponseStatusCodes } from 'src/app/SharedObjects/enums/responseStatusCodes';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { IReservationSummary } from './../../SharedObjects/models/iReservationSummary';
import { IReservationIdHolderMessage } from './../../SharedObjects/models/iReservationIdHolderMessage';
import { ArrivalPointSelectorService } from './../../Services/ArrivalPointSelector/arrival-point-selector.service';
import { IArrivalDatesResponse } from './../../SharedObjects/models/iArrivalDatesResponse';
import { CancelReservationDialogComponent } from './../../Dialogs/cancel-reservation-dialog/cancel-reservation-dialog.component';
import { FrontEndException } from './../../SharedObjects/models/frontEndException';

@Component({
   selector: 'app-reservation-dashboard-page',
   templateUrl: './reservation-dashboard-page.component.html',
   styleUrls: ['./reservation-dashboard-page.component.scss']
})
export class ReservationDashboardPageComponent implements OnInit {

   public pageHasError: boolean;
   public pageErrorMessage: string;
   public existingFinalReservations: IReservationSummary[];
   public possibleToReserveTicket: boolean;
   public ticketReservationPeriodIsActive: boolean;

   constructor(
      private reservationService: ReservationService,
      private arrivalPointSelectorService: ArrivalPointSelectorService,
      public dialog: MatDialog,
      private router: Router) {
      this.possibleToReserveTicket = false;
      this.ticketReservationPeriodIsActive = true;
      this.existingFinalReservations = [];
      this.loadReservations();
      this.getArrivalDates();
   }

   openCancelConfirmationDialog(selectedReservation: number): void {

      const dialogRef = this.dialog.open(CancelReservationDialogComponent, {
         width: '250px',
         data: this.existingFinalReservations[selectedReservation]
      });

      dialogRef.afterClosed().subscribe(result => {
         if (result > 0) {
            this.cancelExistingReservation(result);
         }
      });
   }


   ngOnInit() {
      this.pageErrorMessage = '';
      this.pageHasError = false;
   }

   getArrivalDates() {
      this.arrivalPointSelectorService.getAvailableDates().subscribe(result => {
         if (result.statusCode === ResponseStatusCodes.OK) {
            const datesResponse = result.data as IArrivalDatesResponse;
            this.ticketReservationPeriodIsActive = datesResponse.registrationPeriodIsActive;
            this.possibleToReserveTicket = (datesResponse.arrivalDates.length > 0) ? true : false;
         } else {
            this.pageHasError = true;
            this.pageErrorMessage = result.errorMessage;
         }
      });
   }


   loadReservations() {
      this.reservationService.getActiveReservations().subscribe(response => {
         this.existingFinalReservations = [];
         if (response.statusCode === ResponseStatusCodes.OK) {
            this.getArrivalDates();
            this.existingFinalReservations = response.data.existingReservations as IReservationSummary[];
         } else {
            this.pageHasError = true;
            this.pageErrorMessage = response.errorMessage;
         }
      });
   }

   createNewReservation() {
      this.reservationService.createNewReservation().subscribe(
         response => {
            if (response.statusCode !== ResponseStatusCodes.OK) {
               this.pageHasError = true;
               this.pageErrorMessage = response.errorMessage;
            }
         });
   }

   cancelExistingReservation(idReservation: number) {
      const cancelMessage = { idReservation } as IReservationIdHolderMessage;

      this.reservationService.cancelReservation(cancelMessage).subscribe(response => {
         if (response.statusCode === ResponseStatusCodes.OK) {
            this.loadReservations();
         } else {
            this.pageHasError = true;
            this.pageErrorMessage = response.errorMessage;
         }
      });
   }

   updateArrivalPoint(idReservation: number) {
      this.navigateToUpdateScreen(idReservation, EndPoints.updateArrivalPointPageFE);
   }

   updateVisitorDetails(idReservation: number) {
      this.navigateToUpdateScreen(idReservation, EndPoints.updateVisitorsPageFE);
   }

   updateTransportType(idReservation: number) {
      this.navigateToUpdateScreen(idReservation, EndPoints.updateTransportTypePageFE);
   }

   navigateToUpdateScreen(idReservation: number, targetPage: string) {
      const updateMessage = { idReservation } as IReservationIdHolderMessage;

      this.reservationService.getReservationUpdateToken(updateMessage).subscribe(
         response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.router.navigate(['/' + targetPage]);
            } else {
               this.pageHasError = true;
               this.pageErrorMessage = response.errorMessage;
            }
         });
   }

   requestConfirmationResend(reservationIndex) {

      const idReservation = this.existingFinalReservations[reservationIndex].idReservation;
      const reRequestMessage = { idReservation } as IReservationIdHolderMessage;

      this.reservationService.reRequestConfirmationMail(reRequestMessage).subscribe(
         response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.pageErrorMessage = FrontEndException.confirmationMailHasSent.errorMessage;
               this.pageHasError = true;
            } else {
               this.pageHasError = true;
               this.pageErrorMessage = response.errorMessage;
            }
         });
   }
}
