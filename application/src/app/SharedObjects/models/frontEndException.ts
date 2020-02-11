// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
export class FrontEndException {
   static readonly networkError = new FrontEndException(-1001, 'Network connection failure, please try the last action again.');
   static readonly visitorAgeError = new FrontEndException(-1002, 'Visitor age is invalid, should be between 0 and 120.');
   static readonly formFieldError = new FrontEndException(-1003, 'Please correct all form input errors');
   static readonly arrivalPointTimeslotError = new FrontEndException(-1004, 'Please select an arrival point timeslot');
   static readonly tokenExpiredError = new FrontEndException(-1005, 'Your passcode has expired or is invalid, please request a new one.');
   static readonly incorrectVisitorData = new FrontEndException(-1006, 'Incorrect visitor data.');
   static readonly incorrectTransportTypeData = new FrontEndException(-1007, 'Incorrect transport type data.');
   static readonly termsAndConditionAcceptError = new FrontEndException(-1008, 'You need to accept the terms and conditions.');
   static readonly pointOfOriginMissingError = new FrontEndException(-1009, 'Please select a point of origin');
   static readonly confirmationMailHasSent = new FrontEndException(600, 'Your confirmation mail has been sent');

   // private to disallow creating other instances of this type
   private constructor(public errorCode: number, public readonly errorMessage: string) {
   }

   toString() {
      return this.errorMessage;
   }

}
