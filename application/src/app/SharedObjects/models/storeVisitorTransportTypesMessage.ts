// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ITransportTypeCheckBox } from './iTransportTypeCheckBox';
import { IStoreTransportType } from './iStoreTransportType';

export class StoreVisitorTransportTypesMessage {
   visitorTransportTypes: IStoreTransportType[];
   selectedPointOfOrigin: number;
   constructor(selecteTransportType: number, selectedPointOfOrigin: number) {
      this.selectedPointOfOrigin = selectedPointOfOrigin;
      this.visitorTransportTypes = [];
      const transportType: IStoreTransportType = {
         idTransportType: selecteTransportType
      };
      this.visitorTransportTypes.push(transportType);
   }
}


