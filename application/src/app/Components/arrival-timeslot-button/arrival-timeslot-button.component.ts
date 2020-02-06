// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ISelectedTimeslot } from '../../SharedObjects/models/iSelectedTimeslot';
import { IOpenTimeslot } from '../../SharedObjects/models/iOpenTimeslot';
import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
   selector: 'app-arrival-timeslot-button',
   templateUrl: './arrival-timeslot-button.component.html',
   styleUrls: ['./arrival-timeslot-button.component.scss']
})
export class ArrivalTimeslotButtonComponent implements OnInit, OnChanges {
   @Input() timeslot: IOpenTimeslot;
   @Output() selectedTimeslot = new EventEmitter<ISelectedTimeslot>();
   public timeslotNotSelectable: boolean;

   constructor() { }

   ngOnChanges(changes: SimpleChanges) {
      this.timeslotNotSelectable = this.timeslot.availablePlaces < 6 ? true : false;
   }

   ngOnInit() { }

   selectTimeslot() {
      this.timeslot.isSelected = true;
      const selectedTimeslot: ISelectedTimeslot = {
         idArrivalPoint: this.timeslot.idArrivalPoint,
         timeslotStart: this.timeslot.timeslotStart
      };

      this.selectedTimeslot.emit(selectedTimeslot);
   }

}
