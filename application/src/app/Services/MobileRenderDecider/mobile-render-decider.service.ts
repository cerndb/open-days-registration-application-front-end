// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class MobileRenderDeciderService {

   constructor() { }

   deviceIsMobile(): boolean {
      return (window.screen.width < 400) ? true : false;
   }
}
