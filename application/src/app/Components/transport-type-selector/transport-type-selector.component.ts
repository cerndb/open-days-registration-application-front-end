// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITransportTypeCheckBox } from './../../SharedObjects/models/iTransportTypeCheckBox';
import { MatRadioChange } from '@angular/material';

@Component({
   selector: 'app-transport-type-selector',
   templateUrl: './transport-type-selector.component.html',
   styleUrls: ['./transport-type-selector.component.scss']
})
export class TransportTypeSelectorComponent implements OnInit {

   @Input() deviceIsMobile: boolean;
   @Input() selectedTransportType: number;
   @Input() transportTypes: ITransportTypeCheckBox[];
   @Output() selectedTransportTypeChanged = new EventEmitter<number>();

   constructor() { }

   ngOnInit() {
   }

   transportTypeChange(event: MatRadioChange) {
      this.selectedTransportTypeChanged.emit(event.value);
   }

}
