// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ISelectedTimeslot } from './../../SharedObjects/models/iSelectedTimeslot';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { IArrivalPoints } from '../../SharedObjects/models/iArrivalPoints';

@Component({
   selector: 'app-entrance-selector-mobile',
   templateUrl: './entrance-selector-mobile.component.html',
   styleUrls: ['./entrance-selector-mobile.component.scss']
})
export class EntranceSelectorMobileComponent implements OnInit, OnChanges {

   @Input() arrivalPoints: IArrivalPoints[];
   @Output() markedTimeslot = new EventEmitter<ISelectedTimeslot>();

   public arrivalPoint: IArrivalPoints;
   public selectedArrivalPoint: number;
   public showComponent: boolean;
   public nextArrivalPointArrowVisible: boolean;
   public previousArrivalPointArrowVisible: boolean;
   public selectedArrivalPointItem: number;
   private pageHasLoaded: boolean;

   constructor() {
      this.showComponent = false;
      this.pageHasLoaded = false;
      this.selectedArrivalPointItem = this.getSelectedArrivalPointArrayPosition();
   }

   ngOnChanges(changes: SimpleChanges) {
      if (this.arrivalPoints.length > 0) {
         if (!this.pageHasLoaded) {
            this.pageHasLoaded = true;
            this.selectedArrivalPointItem = this.getSelectedArrivalPointArrayPosition();
         }
         this.selectArrivalPoint();
         this.showComponent = true;
      }
   }

   ngOnInit() { }

   setArrivalPointArrowsVisibility() {
      this.previousArrivalPointArrowVisible = (this.selectedArrivalPointItem === 0) ? false : true;
      this.nextArrivalPointArrowVisible = (this.selectedArrivalPointItem === this.arrivalPoints.length - 1) ? false : true;
   }

   selectNextArrivalPoint() {
      this.selectedArrivalPointItem = this.selectedArrivalPointItem + 1;
      this.selectArrivalPoint();
   }
   selectPreviousArrivalPoint() {
      this.selectedArrivalPointItem = this.selectedArrivalPointItem - 1;
      this.selectArrivalPoint();
   }

   selectArrivalPoint() {
      this.setArrivalPointArrowsVisibility();
      this.selectedArrivalPoint = this.arrivalPoints[this.selectedArrivalPointItem].idArrivalPoint;
      this.arrivalPoint = this.getArrivalPointOpeningDetails();
   }

   getSelectedArrivalPointArrayPosition(): number {

      let selectedItem = 0;
      if (this.pageHasLoaded) {

         this.arrivalPoints.forEach(
            (point, pointIndex) => {
               point.openTimeslots.forEach(timeslot => {
                  if (timeslot.isSelected) {
                     selectedItem = pointIndex;
                  }
               });
            });
      }
      return selectedItem;
   }

   emitOnlyArrivalPointSelection() {
      const arrivalPointInfo: ISelectedTimeslot = {
         idArrivalPoint: this.selectedArrivalPoint,
         timeslotStart: ''
      };

      this.markedTimeslot.emit(arrivalPointInfo);
   }

   getArrivalPointOpeningDetails(): IArrivalPoints {
      let arrivalPointDetails: IArrivalPoints = {
         idArrivalPoint: -1,
         arrivalPointName: '',
         numberOfSurfaceActivities: 0,
         numberOfUndergroundActivities: 0,
         siteAccessibilityInfoURL: '',
         siteActivitiesInfoURL: '',
         openTimeslots: []
      };

      for (const arrivalPoint of this.arrivalPoints) {
         if (arrivalPoint.idArrivalPoint === this.selectedArrivalPoint) {
            arrivalPointDetails = arrivalPoint;
            break;
         }
      }
      return arrivalPointDetails;
   }

   entranceSelected(selectedEntrance: string) {

      this.selectedArrivalPointItem = +selectedEntrance;

      // remove all selections if arrival point has changed
      this.arrivalPoints.forEach(arrivalPoint => {
         arrivalPoint.openTimeslots.forEach(
            arrivalPointTimeslot => {
               arrivalPointTimeslot.isSelected = false;
            });
      });

      this.selectArrivalPoint();
      this.emitOnlyArrivalPointSelection();
   }

   updateSelectedTimeslot(selectedTimeslot: ISelectedTimeslot) {
      this.markedTimeslot.emit(selectedTimeslot);
   }
}
