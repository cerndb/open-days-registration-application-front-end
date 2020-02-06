// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-no-fast-track-lhc-dialog',
   templateUrl: './no-fast-track-lhc-dialog.component.html',
   styleUrls: ['./no-fast-track-lhc-dialog.component.scss']
})
export class NoFastTrackLhcDialogComponent implements OnInit {

   constructor(public dialogRef: MatDialogRef<NoFastTrackLhcDialogComponent>) { }

   ngOnInit() {
   }

}
