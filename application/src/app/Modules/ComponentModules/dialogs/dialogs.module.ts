// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// custom imports
import { MaterialComponentsModule } from './../../MaterialModules/material-components/material-components.module';
import { CancelReservationDialogComponent } from './../../../Dialogs/cancel-reservation-dialog/cancel-reservation-dialog.component';
import { NoFastTrackLhcDialogComponent } from './../../../Dialogs/no-fast-track-lhc-dialog/no-fast-track-lhc-dialog.component';

@NgModule({
   declarations: [
      CancelReservationDialogComponent,
      NoFastTrackLhcDialogComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MaterialComponentsModule
   ],
   exports: [
      CancelReservationDialogComponent,
      NoFastTrackLhcDialogComponent
   ],
   entryComponents: [
      CancelReservationDialogComponent,
      NoFastTrackLhcDialogComponent
   ]
})
export class DialogsModule { }
