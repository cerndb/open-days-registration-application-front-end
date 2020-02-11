// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ISelector } from './../../SharedObjects/models/iSelector';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
   selector: 'app-arrival-date-selector',
   templateUrl: './arrival-date-selector.component.html',
   styleUrls: ['./arrival-date-selector.component.scss']
})
export class ArrivalDateSelectorComponent implements OnInit, OnChanges {

   @Input() arrivalDates: ISelector[];
   @Output() selectedDateChanged = new EventEmitter<string>();
   @Input() deviceIsMobile: boolean;
   public selectedDate: string;

   constructor() { }

   ngOnChanges(changes: SimpleChanges) {
      if (this.arrivalDates.length > 0) {
         this.selectedDate = this.arrivalDates[0].value;
      }
   }

   ngOnInit() { }

   emitDateChange() {
      this.selectedDateChanged.emit(this.selectedDate);
   }

}
