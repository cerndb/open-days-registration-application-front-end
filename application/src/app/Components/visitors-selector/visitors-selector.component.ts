// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { GENERALSETTINGS } from './../../SharedObjects/constants/generalSettings';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { StoreVisitorDetailsMessage } from './../../SharedObjects/models/storeVisitorDetailsMessage';
import { IVisitorDetail } from './../../SharedObjects/models/iVisitorDetail';
import { VisitorDetail } from './../../SharedObjects/models/visitorDetail';
import { WorkflowTypes } from 'src/app/SharedObjects/enums/workflowTypes';

@Component({
   selector: 'app-visitors-selector',
   templateUrl: './visitors-selector.component.html',
   styleUrls: ['./visitors-selector.component.scss']
})
export class VisitorsSelectorComponent implements OnInit, OnChanges {
   @Input() deviceIsMobile: boolean;
   @Input() visitContainer: StoreVisitorDetailsMessage;
   @Input() maxNumberOfVisistors: number;
   @Input() fastTrackAllowed: boolean;
   @Input() numberOfAvailableFastTrackPlaces: number;
   @Input() workflowType: number;
   @Output() visitContainerChanged = new EventEmitter<StoreVisitorDetailsMessage>();
   @Output() inputErrorStatusChanged = new EventEmitter<boolean>();
   public workflowUpdate: boolean;
   public availableTextVisible: boolean;

   constructor() {
   }

   ngOnInit() {
   }

   ngOnChanges(changes: SimpleChanges) {
      this.workflowUpdate = (this.workflowType === WorkflowTypes.UPDATE_RESERVATION) ? true : false;
      this.availableTextVisible = (this.maxNumberOfVisistors < GENERALSETTINGS.maxNumberOfAllowedVisitors) ? true : false;
   }

   addNewVisitor() {
      if (this.visitContainer.visitorDetails.length < this.maxNumberOfVisistors) {
         this.visitContainer.visitorDetails.push(new VisitorDetail());
      }
      this.emitVisitContainerChanges();
   }

   removeVisitorDetail(removeIndex: number) {
      this.visitContainer.visitorDetails.splice(removeIndex, 1);
      this.emitVisitContainerChanges();
   }

   updateVisitorDetail(visitorDetail: IVisitorDetail) {
      this.visitContainer.visitorDetails[visitorDetail.idVisitor] = visitorDetail;
      this.emitVisitContainerChanges();
   }

   groupHasdisabledPersonChanged() {
      this.emitVisitContainerChanges();
   }

   emitVisitContainerChanges() {
      this.visitContainerChanged.emit(this.visitContainer);
   }

   inputErrorStatusChanges(errorStatus: boolean) {
      this.inputErrorStatusChanged.emit(errorStatus);
   }
}
