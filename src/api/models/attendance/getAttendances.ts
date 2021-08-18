import { Response } from 'express';
import mongoose from 'mongoose';
import { IAttendanceDoc, IAttendance } from '../../../mongodb/attendance.db';
import { addDays } from '../../../helpers/addDays';

const Doc = mongoose.model<IAttendanceDoc>('Attendance Sheets');

/**
 * Get all attendance documents in the attendance sheets collection.
 *
 * @param search instance of URLSearchParams
 * @returns an array of patrols
 */
async function getAttendances(search: URLSearchParams, res: Response = null): Promise<IAttendance[]> {
  try {
    // get relevant search params
    const patrol: string | null = search.get('patrol');
    const date: string | null = search.get('date');

    // create filters
    const filters = {
      // if patrol search param is defined, search for attendance documents for that patrol
      // othwerwise, set the patrolFilter to undefined
      patrolFilter: patrol ? { patrol: patrol } : undefined,
      // if date search param is defined, search for attendance documents for around that date (+/- one day)
      // othwerwise, set the dateFilter to undefined
      dateFilter: date
        ? {
            // find attendance documents where `timestamps.meeting_date` is in the provided range
            'timestamps.meeting_date': {
              $gt: addDays(date, -1), // greater than the input date subtracted by one day
              $lt: addDays(date, 1), // and less that the inpout date added by one day
            },
          }
        : undefined,
    };

    // get attendance documents that match the provided filter
    const documents = await Doc.find({ ...filters.patrolFilter, ...filters.dateFilter });

    // end the request by sending a response with the found documents
    if (res) res.json(documents);

    // return an array of attendance objects
    // by looping through the array of attendance documents and converting each one to an object
    return documents.map((document: IAttendanceDoc) => document.toObject());
  } catch (error) {
    // log errors to the server console
    console.error(error);
    // tell the client that there was an error, and then end the request
    if (res) res.status(400).end();
  }
}

export { getAttendances };
