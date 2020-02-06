// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { MobileRenderDeciderService } from './../../Services/MobileRenderDecider/mobile-render-decider.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// custom imports
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { ReservationService } from './../../Services/Reservation/reservation.service';
import { ResponseStatusCodes } from './../../SharedObjects/enums/responseStatusCodes';
import { IReservationSummary } from './../../SharedObjects/models/iReservationSummary';

@Component({
   selector: 'app-summary-page',
   templateUrl: './summary-page.component.html',
   styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {

   public pageHasError: boolean;
   public pageErrorMessage: string;
   public reservationIsLoaded: boolean;
   public reservation: IReservationSummary;
   public deviceIsMobile: boolean;

   constructor(
      private router: Router,
      private reservationService: ReservationService,
      private mobileDecider: MobileRenderDeciderService) {
      this.pageHasError = false;
      this.pageErrorMessage = '';
      this.reservationIsLoaded = false;
      this.deviceIsMobile = this.mobileDecider.deviceIsMobile();

      this.reservationService.getReservation().subscribe(response => {
         if (response.statusCode === ResponseStatusCodes.OK) {
            this.reservation = response.data as IReservationSummary;
            this.reservationIsLoaded = true;
         } else {
            this.pageErrorMessage = response.errorMessage;
            this.pageHasError = true;
         }
      });
   }

   ngOnInit() {
   }

   finishReservation() {
      this.reservationService.finalizeReservation().subscribe(response => {
         if (response.statusCode !== ResponseStatusCodes.OK) {
            this.pageErrorMessage = response.errorMessage;
            this.pageHasError = true;
         } else {
            this.pageErrorMessage = response.errorMessage;
            this.pageHasError = true;
         }
      });
   }

   backStep() {
      this.router.navigate(['/' + EndPoints.transportTypeSelectorPageFE]);
   }

   cancelProcess() {
      this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
   }

}
