// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Injectable } from '@angular/core';
import { IVisitorDetail } from './iVisitorDetail';

@Injectable({ providedIn: 'root' })
export class VisitorDetail implements IVisitorDetail {
   idVisitor: number;
   visitorAge: number;
   fastTrackSelected: boolean;
   constructor() {
      this.visitorAge = 0;
      this.fastTrackSelected = false;
   }
}
