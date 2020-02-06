// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-arrival-point-instructions',
   templateUrl: './arrival-point-instructions.component.html',
   styleUrls: ['./arrival-point-instructions.component.scss']
})
export class ArrivalPointInstructionsComponent implements OnInit {

   @Input() deviceIsMobile: boolean;

   constructor() { }

   ngOnInit() {
   }

}
