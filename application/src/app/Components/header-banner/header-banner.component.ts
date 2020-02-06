// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { environment } from './../../../../../application-welcome/src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-header-banner',
   templateUrl: './header-banner.component.html',
   styleUrls: ['./header-banner.component.scss']
})
export class HeaderBannerComponent implements OnInit {

   public pageIsDemo: boolean;
   constructor() {
      this.pageIsDemo = !environment.production;
   }

   ngOnInit() {
   }

}
