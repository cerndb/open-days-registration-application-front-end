// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { IReservationSummary } from './../../SharedObjects/models/iReservationSummary';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
   selector: 'app-cancel-reservation-dialog',
   templateUrl: './cancel-reservation-dialog.component.html',
   styleUrls: ['./cancel-reservation-dialog.component.scss']
})
export class CancelReservationDialogComponent implements OnInit {

   constructor(
      public dialogRef: MatDialogRef<CancelReservationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IReservationSummary,
   ) { }

   ngOnInit() {
   }

}
