// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { IArrivalPoints } from './../../SharedObjects/models/iArrivalPoints';
import { ISelectedTimeslot } from './../../SharedObjects/models/iSelectedTimeslot';

@Component({
   selector: 'app-entrance-selector',
   templateUrl: './entrance-selector.component.html',
   styleUrls: ['./entrance-selector.component.scss']
})
export class EntranceSelectorComponent implements OnInit, OnChanges {
   @Input() arrivalPoints: IArrivalPoints[];
   @Input() deviceIsMobile: boolean;
   @Output() markedTimeslotChanged = new EventEmitter<ISelectedTimeslot>();

   constructor() { }

   ngOnInit() {
   }

   ngOnChanges(changes: SimpleChanges) {
      this.arrivalPoints = this.arrivalPoints.sort((point1, point2) => {
         if (point1.arrivalPointName > point2.arrivalPointName) {
            return 1;
         }

         if (point1.arrivalPointName < point2.arrivalPointName) {
            return -1;
         }
         return 0;
      });
   }


   updateArrivalSelectionMessage(selectedTimeslot: ISelectedTimeslot) {
      this.markedTimeslotChanged.emit(selectedTimeslot);
   }
}
