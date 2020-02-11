// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { GENERALSETTINGS } from '../../SharedObjects/constants/generalSettings';
import { Component, OnInit, Input } from '@angular/core';
import { MessageHandlingService } from 'src/app/Services/MessageHandling/message-handling.service';
import { TestMessage } from 'src/app/SharedObjects/testMessage';

@Component({
   selector: 'app-default-test-page',
   templateUrl: './default-test-page.component.html',
   styleUrls: ['./default-test-page.component.scss']
})
export class DefaultTestPageComponent implements OnInit {
   title = 'opendays-registration-app';
   @Input() testInput: string;

   testResponse = 'test';

   constructor(private messageHandler: MessageHandlingService) { }

   sendMessage() {

      console.log(this.testInput);
      const sendMessage: TestMessage = {
         mailAddress: this.testInput,
         name: 'string',
         numberOfTickets: 1
      };

      this.messageHandler.postMessageObservable(GENERALSETTINGS.registrationAPI + '/event-registration', sendMessage, 1).subscribe(
         result => {
            console.log(result);
            this.testResponse = JSON.stringify(result);
         }
      );
   }


   ngOnInit() {
   }

}
