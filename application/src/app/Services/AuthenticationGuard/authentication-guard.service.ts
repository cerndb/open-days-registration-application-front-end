// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { GENERALSETTINGS } from 'src/app/SharedObjects/constants/generalSettings';
import { EndPoints } from 'src/app/SharedObjects/constants/endPoints';
import { Observable, of } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

   constructor(private router: Router) { }

   canActivate(): Observable<boolean> {

      if (localStorage.getItem(GENERALSETTINGS.tokenStoreNameFE) === null) {
         this.router.navigate(['/' + EndPoints.welcomeFE]);
         return of(false);
      }
      return of(true);
   }
}
