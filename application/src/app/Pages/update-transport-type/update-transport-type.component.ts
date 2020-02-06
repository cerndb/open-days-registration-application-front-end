// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { StoreVisitorTransportTypesMessage } from './../../SharedObjects/models/storeVisitorTransportTypesMessage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ISelector } from './../../SharedObjects/models/iSelector';
import { ITransportTypeCheckBox } from './../../SharedObjects/models/iTransportTypeCheckBox';
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { PointOfOriginService } from './../../Services/PointOfOrigin/point-of-origin.service';
import { MobileRenderDeciderService } from './../../Services/MobileRenderDecider/mobile-render-decider.service';
import { TransportTypeService } from './../../Services/TransportType/transport-type.service';
import { ResponseStatusCodes } from './../../SharedObjects/enums/responseStatusCodes';

@Component({
   selector: 'app-update-transport-type',
   templateUrl: './update-transport-type.component.html',
   styleUrls: ['./update-transport-type.component.scss']
})
export class UpdateTransportTypeComponent implements OnInit {

   public pageErrorMessage: string;
   public pageHasError: boolean;
   public transportTypes: ITransportTypeCheckBox[];
   public deviceIsMobile: boolean;
   public pointOfOrigins: ISelector[];
   public selectedPointOfOrigin: number;
   public selectedTransportType: number;

   constructor(
      private router: Router,
      private transportTypeService: TransportTypeService,
      private mobileDecider: MobileRenderDeciderService,
      private pointOfOriginService: PointOfOriginService) {
      this.deviceIsMobile = this.mobileDecider.deviceIsMobile();
   }

   ngOnInit() {
      this.pageErrorMessage = '';
      this.pageHasError = false;
      this.transportTypes = [];

      this.transportTypeService.getTransportTypeSelectionList().subscribe(
         response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.transportTypes = response.data.transportTypes as ITransportTypeCheckBox[];
               const firstSelectedTransportType = this.transportTypes.find(transportType => transportType.value);
               if (firstSelectedTransportType) {
                  this.selectedTransportType = firstSelectedTransportType.idTransportType;
               }
            } else {
               this.pageErrorMessage = response.errorMessage;
               this.pageHasError = true;
            }
         }
      );

      this.pointOfOriginService.getPointOfOrigin().subscribe(
         response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.selectedPointOfOrigin = response.data.selectedPointOfOrigin;
               this.pointOfOrigins = response.data.pointOfOriginSelectionList as ISelector[];
            } else {
               this.pageErrorMessage = response.errorMessage;
               this.pageHasError = true;
            }
         }
      );
   }

   cancelUpdateProcess() {
      this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
   }

   updateReservation() {
      this.transportTypeService.updateTransportTypes(
         new StoreVisitorTransportTypesMessage(this.selectedTransportType, this.selectedPointOfOrigin))
         .subscribe(response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.pageErrorMessage = '';
               this.pageHasError = false;
               this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
            } else {
               this.pageErrorMessage = response.errorMessage;
               this.pageHasError = true;
            }
         });
   }

   updateSelectedTransportType(idSelectedTransportType: number) {
      this.selectedTransportType = idSelectedTransportType;
   }

   updateSelectedPointOfOrigin(idSelectedPointOfOrigin: number) {
      this.selectedPointOfOrigin = idSelectedPointOfOrigin;
   }
}
