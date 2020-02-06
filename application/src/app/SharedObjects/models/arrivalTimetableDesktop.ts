// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { IOpenTimeslot } from './iOpenTimeslot';
import { IArrivalPoints } from './iArrivalPoints';
import { TimetableTimeslotDesktop } from './arrivalTimetableTimeslotDesktop';
import { ITimetableArrivalPointHeader } from './iTimetableArrivalPointHeader';

export class ArrivalTimetableDesktop {
   timeslots: TimetableTimeslotDesktop[];
   arrivalPoints: IArrivalPoints[];
   arrivalPointTableHeaders: ITimetableArrivalPointHeader[];

   constructor(arrivalPoints: IArrivalPoints[]) {
      this.timeslots = this.populateTimeslots(arrivalPoints);
      this.arrivalPoints = this.populateArrivalPoints(arrivalPoints);
      this.arrivalPointTableHeaders = this.populateArrivalPointTableHeaders(arrivalPoints);
   }

   populateArrivalPointTableHeaders(arrivalPoints: IArrivalPoints[]): ITimetableArrivalPointHeader[] {
      const arrivalNames: ITimetableArrivalPointHeader[] = [];

      arrivalPoints.forEach(arrivalPoint => {
         arrivalNames.push({
            arrivalPointName: arrivalPoint.arrivalPointName,
            arrivalPointAccessibilityURL: arrivalPoint.siteAccessibilityInfoURL
         });
      });

      return arrivalNames;
   }

   populateArrivalPoints(arrivalPoints: IArrivalPoints[]): IArrivalPoints[] {
      const arrivalPointsMatrix: IArrivalPoints[] = [];

      arrivalPoints.forEach(arrivalPointDetail => {

         // final timetable for timeslots
         const emptyTimeslotExtendedArrivalOpentimes: IArrivalPoints = {
            idArrivalPoint: arrivalPointDetail.idArrivalPoint,
            arrivalPointName: arrivalPointDetail.arrivalPointName,
            numberOfSurfaceActivities: arrivalPointDetail.numberOfSurfaceActivities,
            numberOfUndergroundActivities: arrivalPointDetail.numberOfUndergroundActivities,
            siteAccessibilityInfoURL: arrivalPointDetail.siteAccessibilityInfoURL,
            siteActivitiesInfoURL: arrivalPointDetail.siteActivitiesInfoURL,
            openTimeslots: []
         };

         this.timeslots.forEach(baseTimeslot => {

            // check if this timeslot is defined for this timeslot
            const arrivalPointHasOpenTimeslot = arrivalPointDetail.openTimeslots.some(checkTimeSlot => {
               return checkTimeSlot.timeslotStart === baseTimeslot.startDate && checkTimeSlot.timeslotEnd === baseTimeslot.endDate;
            });

            if (arrivalPointHasOpenTimeslot) {
               // put the arrival timeslot details for the arrival point if we have one
               const existingTimeslotData = arrivalPointDetail.openTimeslots.find(
                  compareElement => {
                     return compareElement.timeslotStart === baseTimeslot.startDate &&
                        compareElement.timeslotEnd === baseTimeslot.endDate;
                  });
               emptyTimeslotExtendedArrivalOpentimes.openTimeslots.push(existingTimeslotData);
            } else {
               // create empty timeslot in case there is no timeslot for this arrival point
               const emptyTimeSlot: IOpenTimeslot = {
                  idArrivalPoint: arrivalPointDetail.idArrivalPoint,
                  timeslotStart: baseTimeslot.startDate,
                  timeslotEnd: baseTimeslot.endDate,
                  availablePlaces: -1,
                  isSelected: false
               };
               emptyTimeslotExtendedArrivalOpentimes.openTimeslots.push(emptyTimeSlot);
            }
         });

         arrivalPointsMatrix.push(emptyTimeslotExtendedArrivalOpentimes);
      });

      return arrivalPointsMatrix;
   }

   populateTimeslots(arrivalPoints: IArrivalPoints[]): TimetableTimeslotDesktop[] {
      const arrivalRawTimeslots: TimetableTimeslotDesktop[] = [];

      // collect all possible timeslots
      arrivalPoints.forEach(arrivalPoint => {
         arrivalPoint.openTimeslots.forEach(timeSlot => {
            arrivalRawTimeslots.push(new TimetableTimeslotDesktop(timeSlot.timeslotStart, timeSlot.timeslotEnd));
         });
      });

      const filteredArrivalTimeslots: TimetableTimeslotDesktop[] = [];

      // create unique list timeslot list
      arrivalRawTimeslots.forEach(searchTimeslot => {

         const appendRequired = filteredArrivalTimeslots.some(
            timeslot => (timeslot.startDate === searchTimeslot.startDate) && (timeslot.endDate === searchTimeslot.endDate)
         );

         if (!appendRequired) {
            filteredArrivalTimeslots.push(new TimetableTimeslotDesktop(searchTimeslot.startDate, searchTimeslot.endDate));
         }
      });

      return filteredArrivalTimeslots;
   }
}
