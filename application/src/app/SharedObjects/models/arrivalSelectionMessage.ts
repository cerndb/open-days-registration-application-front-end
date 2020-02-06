// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { Injectable } from '@angular/core';
import { IArrivalSelectionMessage } from './iArrivalSelectionMessage';
import { IArrivalData } from './iArrivalData';

@Injectable({ providedIn: 'root' })
export class ArrivalSelectionMessage implements IArrivalSelectionMessage {
   idArrivalPoint: number;
   visitDay: string;
   timeslotStart: string;
   updateWithoutFastTrack: boolean;

   constructor() {
      this.idArrivalPoint = -666;
      this.visitDay = '';
      this.timeslotStart = '';
      this.updateWithoutFastTrack = false;
   }

   updateFromArrivalData(dataObject: IArrivalData) {
      this.idArrivalPoint = dataObject.idArrivalPoint;
      this.timeslotStart = dataObject.timeslotStart;
      this.visitDay = dataObject.visitdayDetails.value;
   }

   updateFromArrivalSelectionMessage(dataObject: ArrivalSelectionMessage) {
      this.visitDay = dataObject.visitDay;
      this.timeslotStart = dataObject.visitDay + ' ' + dataObject.timeslotStart;
      this.idArrivalPoint = dataObject.idArrivalPoint;
      this.updateWithoutFastTrack = dataObject.updateWithoutFastTrack;
   }
}
