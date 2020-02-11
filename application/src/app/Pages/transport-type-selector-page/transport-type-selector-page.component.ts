// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ISelector } from './../../SharedObjects/models/iSelector';
import { PointOfOriginService } from './../../Services/PointOfOrigin/point-of-origin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// custom imports
import { EndPoints } from './../../SharedObjects/constants/endPoints';
import { TransportTypeService } from 'src/app/Services/TransportType/transport-type.service';
import { ResponseStatusCodes } from './../../SharedObjects/enums/responseStatusCodes';
import { ITransportTypeCheckBox } from '../../SharedObjects/models/iTransportTypeCheckBox';
import { StoreVisitorTransportTypesMessage } from './../../SharedObjects/models/storeVisitorTransportTypesMessage';
import { MobileRenderDeciderService } from './../../Services/MobileRenderDecider/mobile-render-decider.service';

@Component({
   selector: 'app-transport-type-selector-page',
   templateUrl: './transport-type-selector-page.component.html',
   styleUrls: ['./transport-type-selector-page.component.scss']
})
export class TransportTypeSelectorPageComponent implements OnInit {

   public pageHasError: boolean;
   public pageErrorMessage: string;
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

   nextStep() {
      this.storeSelectedTransportTypes(EndPoints.summaryPageFE, false);
   }

   backStep() {
      this.storeSelectedTransportTypes(EndPoints.visitorsDetailPageFE, true);
   }

   storeSelectedTransportTypes(nextPage: string, ignoreError: boolean) {
      this.transportTypeService.storeTransportTypes(
         new StoreVisitorTransportTypesMessage(this.selectedTransportType, this.selectedPointOfOrigin))
         .subscribe(response => {
            if (response.statusCode === ResponseStatusCodes.OK) {
               this.pageErrorMessage = '';
               this.pageHasError = false;
               this.router.navigate(['/' + nextPage]);
            } else {
               if (ignoreError) {
                  this.router.navigate(['/' + nextPage]);
               } else {
                  this.pageErrorMessage = response.errorMessage;
                  this.pageHasError = true;
               }
            }
         });
   }

   updateSelectedTransportType(idSelectedTransportType: number) {
      this.selectedTransportType = idSelectedTransportType;
   }

   updateSelectedPointOfOrigin(idSelectedPointOfOrigin: number) {
      this.selectedPointOfOrigin = idSelectedPointOfOrigin;
   }

   cancelProcess() {
      this.router.navigate(['/' + EndPoints.reservationDashboardPageFE]);
   }

}
