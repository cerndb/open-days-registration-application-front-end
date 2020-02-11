// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
export class FrontEndException {
   static readonly networkError = new FrontEndException(-1001, 'Erreur de connexion réserau. Veuillez répéter votre dernière action.');
   static readonly visitorAgeError = new FrontEndException(-1002, 'L\'âge du visiteur est invalide. Il doit être entre 0 et 120');
   static readonly formFieldError = new FrontEndException(-1003, 'Veuillez corriger les erreurs du formulaire.');
   static readonly arrivalPointTimeslotError = new FrontEndException(-1004, 'Veuillez sélectionner un site d\'arrivée');
   static readonly tokenExpiredError = new FrontEndException(-1005, 'Votre code d\'accès est invalide ou a expiré. Veuillez en demander un nouveau.');
   static readonly incorrectVisitorData = new FrontEndException(-1006, 'Information visiteur incorrecte.');
   static readonly incorrectTransportTypeData = new FrontEndException(-1007, 'Information transport incorrecte.');
   static readonly termsAndConditionAcceptError = new FrontEndException(-1008, 'Vous devez accepter les conditions d\'utilisation.');
   static readonly pointOfOriginMissingError = new FrontEndException(-1009, 'Veuillez sélectionner un point d\'origine.');
   static readonly confirmationMailHasSent = new FrontEndException(600, 'Votre courriel de confrimation a été envoyé');

   // private to disallow creating other instances of this type
   private constructor(public errorCode: number, public readonly errorMessage: string) {
   }

   toString() {
      return this.errorMessage;
   }

}
