// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { IArrivalPoints } from '../../SharedObjects/models/iArrivalPoints';
import { ArrivalTimetableDesktop } from './../../SharedObjects/models/arrivalTimetableDesktop';
import { ISelectedTimeslot } from './../../SharedObjects/models/iSelectedTimeslot';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
   selector: 'app-entrance-selector-desktop',
   templateUrl: './entrance-selector-desktop.component.html',
   styleUrls: ['./entrance-selector-desktop.component.scss']
})
export class EntranceSelectorDesktopComponent implements OnInit, OnChanges {

   @Input() arrivalPoints: IArrivalPoints[];
   @Output() markedTimeslot = new EventEmitter<ISelectedTimeslot>();
   public timetable: ArrivalTimetableDesktop;

   constructor() { }

   ngOnChanges(changes: SimpleChanges) {
      this.populateTimeTableMatrix();
   }

   ngOnInit() { }

   populateTimeTableMatrix() {
      this.timetable = new ArrivalTimetableDesktop(this.arrivalPoints);
   }

   timeslotSelected(selectedTimeslot: ISelectedTimeslot) {
      this.timetable.arrivalPoints.forEach(arrivalPoint => {
         arrivalPoint.openTimeslots.forEach(arrivalPointTimeslot => {
            if (
               arrivalPointTimeslot.idArrivalPoint !== selectedTimeslot.idArrivalPoint ||
               arrivalPointTimeslot.timeslotStart !== selectedTimeslot.timeslotStart) {
               arrivalPointTimeslot.isSelected = false;
            }
         });
      });
      this.markedTimeslot.emit(selectedTimeslot);
   }
}
