// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ISelectedTimeslot } from '../../SharedObjects/models/iSelectedTimeslot';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IArrivalPoints } from '../../SharedObjects/models/iArrivalPoints';

@Component({
   selector: 'app-arrival-timeslot-mobile',
   templateUrl: './arrival-timeslot-mobile.component.html',
   styleUrls: ['./arrival-timeslot-mobile.component.scss']
})
export class ArrivalTimeslotMobileComponent implements OnInit {

   @Input() arrivalPoint: IArrivalPoints;
   @Output() chosenTimeslot = new EventEmitter<ISelectedTimeslot>();

   constructor() { }

   ngOnInit() {
   }

   timeslotSelected(selectedTimeslot: ISelectedTimeslot) {
      this.invalidateOtherTimeSlots(selectedTimeslot);
      this.chosenTimeslot.emit(selectedTimeslot);
   }

   invalidateOtherTimeSlots(selectedTimeslot: ISelectedTimeslot) {
      this.arrivalPoint.openTimeslots.forEach(timeslot => {
         if (timeslot.timeslotStart !== selectedTimeslot.timeslotStart) {
            timeslot.isSelected = false;
         }
      });
   }
}
