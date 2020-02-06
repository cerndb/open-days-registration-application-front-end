// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { MaterialComponentsModule } from './../../MaterialModules/material-components/material-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// custom components
import { CaptchaCheckerComponent } from './../../../Components/captcha-checker/captcha-checker.component';
import { ArrivalTimeslotButtonComponent } from '../../../Components/arrival-timeslot-button/arrival-timeslot-button.component';
import { ArrivalDateSelectorComponent } from './../../../Components/arrival-date-selector/arrival-date-selector.component';
import { ArrivalTimeslotMobileComponent } from '../../../Components/arrival-timeslot-mobile/arrival-timeslot-mobile.component';
import { EntranceSelectorMobileComponent } from './../../../Components/entrance-selector-mobile/entrance-selector-mobile.component';
import { VisitorDetailsComponent } from './../../../Components/visitor-details/visitor-details.component';
import { EntranceSelectorDesktopComponent } from './../../../Components/entrance-selector-desktop/entrance-selector-desktop.component';
import { PointOfOriginSelectorComponent } from './../../../Components/point-of-origin-selector/point-of-origin-selector.component';
import { TransportTypeSelectorComponent } from './../../../Components/transport-type-selector/transport-type-selector.component';
import { VisitorsSelectorComponent } from './../../../Components/visitors-selector/visitors-selector.component';
import { ArrivalPointInstructionsComponent } from './../../../Components/arrival-point-instructions/arrival-point-instructions.component';
import { EntranceSelectorComponent } from './../../../Components/entrance-selector/entrance-selector.component';

@NgModule({
   declarations: [
      CaptchaCheckerComponent,
      ArrivalTimeslotButtonComponent,
      ArrivalTimeslotMobileComponent,
      ArrivalDateSelectorComponent,
      EntranceSelectorMobileComponent,
      VisitorDetailsComponent,
      EntranceSelectorDesktopComponent,
      TransportTypeSelectorComponent,
      PointOfOriginSelectorComponent,
      VisitorsSelectorComponent,
      ArrivalPointInstructionsComponent,
      EntranceSelectorComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MaterialComponentsModule
   ],
   exports: [
      CaptchaCheckerComponent,
      ArrivalTimeslotButtonComponent,
      ArrivalTimeslotMobileComponent,
      ArrivalDateSelectorComponent,
      EntranceSelectorMobileComponent,
      VisitorDetailsComponent,
      EntranceSelectorDesktopComponent,
      TransportTypeSelectorComponent,
      PointOfOriginSelectorComponent,
      VisitorsSelectorComponent,
      ArrivalPointInstructionsComponent,
      EntranceSelectorComponent
   ]
})
export class ComponentsModule { }
