// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { MatRadioChange } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ISelector } from './../../SharedObjects/models/iSelector';

@Component({
   selector: 'app-point-of-origin-selector',
   templateUrl: './point-of-origin-selector.component.html',
   styleUrls: ['./point-of-origin-selector.component.scss']
})
export class PointOfOriginSelectorComponent implements OnInit {

   @Input() deviceIsMobile: boolean;
   @Input() pointOfOrigins: ISelector[];
   @Input() selectedPointOfOrigin: number;
   @Output() selectedPointOfOriginChanged = new EventEmitter<number>();

   constructor() { }

   ngOnInit() {
   }

   pointOfOriginChange(event: MatRadioChange) {
      this.selectedPointOfOriginChanged.emit(event.value);
   }


}
