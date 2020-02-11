// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
export const EndPoints = {

   // front-end
   defaultFE: 'default-test',
   welcomeFE: 'welcome',
   requestTokenFE: 'login',
   requestPasscodeFE: 'request-passcode',
   summaryPageFE: 'summary',
   arrivalSelectorPageFE: 'arrival-selector',
   visitorsDetailPageFE: 'visitors-detail',
   transportTypeSelectorPageFE: 'transport-type-selector',
   reservationDashboardPageFE: 'reservation-dashboard',
   updateArrivalPointPageFE: 'update-arrival-point',
   updateVisitorsPageFE: 'update-visitors-detail',
   updateTransportTypePageFE: 'update-transport-type',

   // front-end (temporary)
   defaultTestFE: 'default-test',

   // back-end
   requestAccessTokenBE: '/request-access-token',
   requestPasscodeBE: '/request-passcode',
   storeVisitorsBE: '/store-visitors',
   getArrivalPointDatesBE: '/get-arrival-point-dates',
   getAvailableTimeslotsBE: '/request-arrival-point-timeslots',
   arrivalConfirmationBE: '/confirm-arrival-point',
   createNewReservationBE: '/create-new-reservation',
   finalizeReservationBE: '/finalize-reservation',
   modifyReservationBE: '/modify-reservation',
   cancelReservation: '/cancel-reservation',
   getReservation: '/get-reservation',
   getActiveReservations: '/get-active-reservations',
   getTransportTypeSelectionBE: '/get-transport-types-selection',
   storeTransportTypesBE: '/store-transport-types',
   getConfirmedVisitorDetailsBE: '/get-confirmed-visitor-details',
   getPointOfOriginBE: '/get-point-of-origin',
   getUpdateReservationTokenBE: '/get-update-reservation-token',
   getReservationDataBE: '/get-reservation-arrival-data',
   updateArrivalPointBE: '/update-arrival-point',
   updateTransportTypeBE: '/update-transport-types',
   updateVisitorDetailsBE: '/update-visitors',
   getVisitorsForUpdateBE: '/get-visitor-details-for-update',
   reRequestConfirmationMailBE: '/resend-reservation-confirmation',
   getDailyAvailablePlacesBE: '/get-daily-available-places'

};
