// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
export enum ResponseStatusCodes {
   OK = 0,
   TOKEN_ERROR = -12,
   NO_FAST_TRACK_TICKETS = 2,
   RESERVATION_UPDATE_NOT_ENOUGH_PLACE = -44,
   RESERVATION_UPDATE_NOT_ENOUGH_FAST_TRACK_PLACE = -45
}
