// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
   MatButtonModule,
   MatInputModule,
   MatCardModule,
   MatDividerModule,
   MatGridListModule,
   MatIconModule,
   MatRadioModule,
   MatSelectModule,
   MatCheckboxModule,
   MatProgressBarModule,
   MatDialogModule
} from '@angular/material';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      MatButtonModule,
      MatInputModule,
      MatCardModule,
      MatDividerModule,
      MatGridListModule,
      MatIconModule,
      MatRadioModule,
      MatSelectModule,
      MatCheckboxModule,
      MatProgressBarModule,
      MatDialogModule
   ],
   exports: [
      MatButtonModule,
      MatInputModule,
      MatCardModule,
      MatDividerModule,
      MatGridListModule,
      MatIconModule,
      MatRadioModule,
      MatSelectModule,
      MatCheckboxModule,
      MatProgressBarModule,
      MatDialogModule
   ]
})
export class MaterialComponentsModule { }
